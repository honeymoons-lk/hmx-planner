import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";

export const metadata: Metadata = {
  title: "Luna Voyages Design Brief",
  description: "Current design brief for the Luna Voyages website.",
};

export const dynamic = "force-static";

type Block =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" };

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
      if (!next || next === "---" || next.startsWith("#") || next.startsWith("- ") || /^\d+\.\s+/.test(next)) {
        break;
      }
      paragraph.push(next);
      i += 1;
    }
    blocks.push({ type: "p", text: paragraph.join(" ") });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const chunks = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return chunks.map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={`strong-${index}`} className="font-semibold text-[var(--color-text)]">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    if (chunk.startsWith("`") && chunk.endsWith("`")) {
      return (
        <code
          key={`code-${index}`}
          className="rounded-[6px] bg-[color-mix(in_srgb,var(--color-bg-alt)_66%,var(--color-surface))] px-1.5 py-0.5 text-[0.95em]"
        >
          {chunk.slice(1, -1)}
        </code>
      );
    }

    return <span key={`text-${index}`}>{chunk}</span>;
  });
}

async function getBriefBlocks() {
  const briefPath = path.join(process.cwd(), "docs", "design-brief.md");
  const markdown = await fs.readFile(briefPath, "utf8");
  return parseMarkdown(markdown);
}

export default async function DesignBriefPage() {
  const blocks = await getBriefBlocks();

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-4xl">
          <article className="rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)] md:p-9">
            {blocks.map((block, idx) => {
              if (block.type === "h1") {
                return (
                  <h1 key={`h1-${idx}`} className="type-hero mb-6 font-serif text-[var(--color-text)]">
                    {renderInline(block.text)}
                  </h1>
                );
              }

              if (block.type === "h2") {
                return (
                  <h2 key={`h2-${idx}`} className="type-section mb-4 mt-10 font-serif text-[var(--color-text)] first:mt-0">
                    {renderInline(block.text)}
                  </h2>
                );
              }

              if (block.type === "h3") {
                return (
                  <h3 key={`h3-${idx}`} className="type-subheading mb-3 mt-8 font-serif text-[var(--color-text)]">
                    {renderInline(block.text)}
                  </h3>
                );
              }

              if (block.type === "p") {
                return (
                  <p key={`p-${idx}`} className="type-body mb-4 text-[var(--color-text-secondary)]">
                    {renderInline(block.text)}
                  </p>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={`ul-${idx}`} className="mb-5 ml-5 list-disc space-y-1.5 text-[var(--color-text-secondary)]">
                    {block.items.map((item) => (
                      <li key={`${idx}-${item}`} className="type-body">
                        {renderInline(item)}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "ol") {
                return (
                  <ol key={`ol-${idx}`} className="mb-5 ml-5 list-decimal space-y-1.5 text-[var(--color-text-secondary)]">
                    {block.items.map((item) => (
                      <li key={`${idx}-${item}`} className="type-body">
                        {renderInline(item)}
                      </li>
                    ))}
                  </ol>
                );
              }

              return <hr key={`hr-${idx}`} className="my-8 border-[color-mix(in_srgb,var(--color-border)_80%,transparent)]" />;
            })}
          </article>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
