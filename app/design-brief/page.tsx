import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";

import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";

export const metadata: Metadata = {
  title: "Luna Voyages Design Brief",
  description: "Current design brief for the Luna Voyages website.",
};

export const dynamic = "force-static";

type Block =
  | { type: "h1" | "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" };

type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "h1", text: line.slice(2).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("#### ")) {
      blocks.push({ type: "h4", text: line.slice(5).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2).trim());
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, "").trim());
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [line];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        !next ||
        next === "---" ||
        next.startsWith("#") ||
        next.startsWith("- ") ||
        /^\d+\.\s+/.test(next)
      ) {
        break;
      }
      paragraph.push(next);
      i += 1;
    }

    blocks.push({ type: "p", text: paragraph.join(" ") });
  }

  return blocks;
}

function splitSections(blocks: Block[]) {
  const intro: Block[] = [];
  const sections: Section[] = [];
  let current: Section | null = null;
  let seenFirstSection = false;

  for (const block of blocks) {
    if (block.type === "h2") {
      seenFirstSection = true;
      current = {
        id: slugify(block.text),
        title: block.text,
        blocks: [],
      };
      sections.push(current);
      continue;
    }

    if (!seenFirstSection) {
      intro.push(block);
      continue;
    }

    if (current) {
      current.blocks.push(block);
    }
  }

  return { intro, sections };
}

function renderInline(text: string) {
  const chunks = text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+(?:\)[^\s]*)?)/g).filter(Boolean);

  return chunks.map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={`strong-${index}`} className="font-medium text-[var(--color-text)]">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    if (chunk.startsWith("`") && chunk.endsWith("`")) {
      return (
        <code
          key={`code-${index}`}
          className="rounded-[6px] bg-[color-mix(in_srgb,var(--color-bg-alt)_74%,var(--color-surface))] px-1.5 py-0.5 text-[0.95em] text-[var(--color-text)]"
        >
          {chunk.slice(1, -1)}
        </code>
      );
    }

    if (/^https?:\/\//.test(chunk)) {
      return (
        <a
          key={`link-${index}`}
          href={chunk}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
        >
          {chunk}
        </a>
      );
    }

    return <span key={`text-${index}`}>{chunk}</span>;
  });
}

async function getBriefSections() {
  const briefPath = path.join(process.cwd(), "docs", "design-brief.md");
  const markdown = await fs.readFile(briefPath, "utf8");
  const blocks = parseMarkdown(markdown);
  return splitSections(blocks);
}

function IntroCard({ intro }: { intro: Block[] }) {
  const heading = intro.find((block) => block.type === "h1");
  const lead = intro.find((block) => block.type === "p");
  const remainder = intro.filter((block) => block !== heading && block !== lead && block.type !== "hr");

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-surface)_96%,var(--color-bg))_0%,color-mix(in_srgb,var(--color-bg-alt)_34%,var(--color-surface))_100%)] p-6 shadow-[var(--shadow-soft)] md:p-10">
      <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full border border-[color-mix(in_srgb,var(--color-brand)_12%,transparent)]" />
      <div className="pointer-events-none absolute -left-12 bottom-8 h-24 w-24 rounded-full border border-[color-mix(in_srgb,var(--color-border-strong)_45%,transparent)]" />

      <p className="type-eyebrow mb-4 text-[var(--color-text-muted)]">Designer handoff</p>
      {heading?.type === "h1" ? (
        <h1 className="type-hero max-w-[14ch] font-serif text-[var(--color-text)]">{renderInline(heading.text)}</h1>
      ) : null}
      {lead?.type === "p" ? (
        <p className="type-body mt-5 max-w-[68ch] text-[var(--color-text-secondary)]">{renderInline(lead.text)}</p>
      ) : null}

      <div className="mt-8 space-y-4">
        {remainder.map((block, idx) => {
          if (block.type === "p") {
            return (
              <p key={`intro-p-${idx}`} className="type-body max-w-[72ch] text-[var(--color-text-secondary)]">
                {renderInline(block.text)}
              </p>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={`intro-ul-${idx}`} className="ml-5 list-disc space-y-2 text-[var(--color-text-secondary)]">
                {block.items.map((item) => (
                  <li key={item} className="type-body">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-24 rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_95%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)] md:p-8">
      <h2 className="type-section mb-5 font-serif text-[var(--color-text)]">{renderInline(section.title)}</h2>

      <div className="space-y-4">
        {section.blocks.map((block, idx) => {
          if (block.type === "h3") {
            return (
              <h3 key={`${section.id}-h3-${idx}`} className="type-subheading mt-7 font-serif text-[var(--color-text)]">
                {renderInline(block.text)}
              </h3>
            );
          }

          if (block.type === "h4") {
            return (
              <h4 key={`${section.id}-h4-${idx}`} className="type-ui-sm mt-6 uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                {renderInline(block.text)}
              </h4>
            );
          }

          if (block.type === "p") {
            return (
              <p key={`${section.id}-p-${idx}`} className="type-body text-[var(--color-text-secondary)]">
                {renderInline(block.text)}
              </p>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={`${section.id}-ul-${idx}`} className="ml-5 list-disc space-y-2 text-[var(--color-text-secondary)] marker:text-[var(--color-brand)]">
                {block.items.map((item) => (
                  <li key={`${section.id}-${item}`} className="type-body">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "ol") {
            return (
              <ol key={`${section.id}-ol-${idx}`} className="ml-5 list-decimal space-y-2 text-[var(--color-text-secondary)] marker:text-[var(--color-brand)]">
                {block.items.map((item) => (
                  <li key={`${section.id}-${item}`} className="type-body">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );
          }

          return <hr key={`${section.id}-hr-${idx}`} className="my-8 border-[color-mix(in_srgb,var(--color-border)_78%,transparent)]" />;
        })}
      </div>
    </section>
  );
}

export default async function DesignBriefPage() {
  const { intro, sections } = await getBriefSections();

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-10">
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-bg))] p-5 shadow-[var(--shadow-soft)]">
              <p className="type-eyebrow mb-4 text-[var(--color-text-muted)]">Contents</p>
              <nav aria-label="Design brief sections" className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="type-ui-sm block text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-6 md:space-y-8">
            <IntroCard intro={intro} />
            {sections.map((section) => (
              <SectionBlock key={section.id} section={section} />
            ))}
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
