import type { Metadata } from "next";
import styles from "./style-guide.module.css";

export const metadata: Metadata = {
  title: "Luna Voyages Style Guide",
  description: "Design system reference for the Luna Voyages brand.",
};

type Principle = {
  title: string;
  description: string;
};

type ColorSwatch = {
  name: string;
  value: string;
  usage: string;
  variable: string;
};

type TokenSnippet = {
  label: string;
  code: string;
};

const principles: Principle[] = [
  {
    title: "Romance without cliche",
    description:
      "Intimacy comes through thoughtful detail, not ornament. Speak to connection, place, and rhythm.",
  },
  {
    title: "Luxury without stiffness",
    description:
      "Everything should feel precise and premium, while still warm, easy, and deeply human.",
  },
  {
    title: "Editorial over corporate",
    description:
      "Lead with narrative and atmosphere. Layout and copy should feel authored, not templated.",
  },
  {
    title: "Quiet confidence",
    description:
      "Understate, never underwhelm. Let typography, spacing, and restraint do the work.",
  },
  {
    title: "Photography-led",
    description:
      "Imagery carries emotion. UI should frame visuals with elegance, never compete for attention.",
  },
  {
    title: "Human, not transactional",
    description:
      "Conversations over conversion pressure. Every interaction should feel concierge-led and personal.",
  },
];

const primaryColors: ColorSwatch[] = [
  {
    name: "Brand Burgundy",
    value: "#6E2C3A",
    usage: "Primary actions, links, focused highlights",
    variable: "--color-brand",
  },
  {
    name: "Brand Hover",
    value: "#5A2230",
    usage: "Primary hover and interactive states",
    variable: "--color-brand-hover",
  },
  {
    name: "Brand Active",
    value: "#471A25",
    usage: "Pressed state and compact dark accents",
    variable: "--color-brand-active",
  },
];

const neutrals: ColorSwatch[] = [
  {
    name: "Warm Background",
    value: "#F8F3EE",
    usage: "Default page background",
    variable: "--color-bg",
  },
  {
    name: "Background Alt",
    value: "#F1E7DE",
    usage: "Section separation and soft bands",
    variable: "--color-bg-alt",
  },
  {
    name: "Surface",
    value: "#FCFAF8",
    usage: "Cards, form surfaces, elevated content",
    variable: "--color-surface",
  },
  {
    name: "Border",
    value: "#E6D8CB",
    usage: "Subtle dividers and field borders",
    variable: "--color-border",
  },
  {
    name: "Border Strong",
    value: "#D9C7B8",
    usage: "Selected states, stronger dividers",
    variable: "--color-border-strong",
  },
];

const textColors: ColorSwatch[] = [
  {
    name: "Primary Text",
    value: "#1C1715",
    usage: "Main body copy and headings",
    variable: "--color-text",
  },
  {
    name: "Secondary Text",
    value: "#4A403A",
    usage: "Supportive copy and metadata",
    variable: "--color-text-secondary",
  },
  {
    name: "Muted Text",
    value: "#6B5D54",
    usage: "Captions and tertiary information",
    variable: "--color-text-muted",
  },
  {
    name: "Champagne Accent",
    value: "#C8AF8A",
    usage: "Fine dividers and restrained highlights",
    variable: "--color-accent",
  },
];

const semanticColors: ColorSwatch[] = [
  {
    name: "Success",
    value: "#2F6A4F / #EAF4EE",
    usage: "Positive confirmations",
    variable: "--color-success-text / --color-success-bg",
  },
  {
    name: "Warning",
    value: "#8A6430 / #FAF2E5",
    usage: "Gentle cautions and guidance",
    variable: "--color-warning-text / --color-warning-bg",
  },
  {
    name: "Error",
    value: "#8B3A3A / #F8EAEA",
    usage: "Validation issues and blockers",
    variable: "--color-error-text / --color-error-bg",
  },
];

const tokenSnippets: TokenSnippet[] = [
  {
    label: "Colors",
    code: `:root {
  --color-bg: #F8F3EE;
  --color-bg-alt: #F1E7DE;
  --color-surface: #FCFAF8;
  --color-brand: #6E2C3A;
  --color-brand-hover: #5A2230;
  --color-brand-active: #471A25;
  --color-text: #1C1715;
  --color-text-secondary: #4A403A;
  --color-text-muted: #6B5D54;
  --color-border: #E6D8CB;
  --color-border-strong: #D9C7B8;
  --color-accent: #C8AF8A;
}`,
  },
  {
    label: "Typography",
    code: `:root {
  --font-display: "Cormorant Garamond", serif;
  --font-body: "Inter", sans-serif;
  --font-wordmark: "Cinzel", serif;

  --type-hero-size: clamp(56px, 6.4vw, 64px);
  --type-section-size: clamp(36px, 4.2vw, 40px);
  --type-subheading-size: clamp(22px, 2.6vw, 24px);
  --type-body-size: 17px;
  --type-body-lg-size: 18px;
  --type-ui-sm-size: 14px;
  --type-eyebrow-size: 12px;
  --type-eyebrow-spacing: 0.08em;
}`,
  },
  {
    label: "Spacing / Radius / Shadow",
    code: `:root {
  --space-1: 4px;
  --space-11: 120px;
  --section-space-mobile: 100px;
  --section-space-desktop: 120px;
  --heading-body-gap: 20px;
  --card-padding: 28px;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-button: var(--radius-md);
  --radius-card: var(--radius-lg);
  --radius-form: var(--radius-lg);
  --radius-input: var(--radius-sm);

  --shadow-soft: 0 8px 20px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.06);
}`,
  },
];

const sectionLinks = [
  { id: "cover", label: "Intro" },
  { id: "principles", label: "Principles" },
  { id: "palette", label: "Color Palette" },
  { id: "type", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Forms" },
  { id: "cards", label: "Cards" },
  { id: "headings", label: "Headings" },
  { id: "examples", label: "Examples" },
  { id: "dark", label: "Dark Surface" },
  { id: "tokens", label: "Tokens" },
];

function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  centered?: boolean;
}) {
  return (
    <header className={centered ? styles.centeredHeading : styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.h2}>{title}</h2>
      <p className={styles.bodyL}>{body}</p>
    </header>
  );
}

function ColorGroup({
  title,
  colors,
}: {
  title: string;
  colors: ColorSwatch[];
}) {
  return (
    <div className={styles.colorGroup}>
      <h3 className={styles.h4}>{title}</h3>
      <div className={styles.swatchGrid}>
        {colors.map((color) => (
          <article key={color.name} className={styles.swatchCard}>
            <div className={styles.swatchBlock} style={{ backgroundColor: color.value.split(" /")[0] }} />
            <div className={styles.swatchMeta}>
              <p className={styles.label}>{color.name}</p>
              <p className={styles.caption}>{color.value}</p>
              <p className={styles.caption}>{color.usage}</p>
              <p className={styles.tokenName}>{color.variable}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className={styles.guidePage}>
      <div className={styles.pageGrid}>
        <aside className={styles.sideNav}>
          <p className={`${styles.eyebrow} font-wordmark`}>LUNA VOYAGES</p>
          <p className={styles.navTitle}>Design System</p>
          <nav aria-label="Style guide sections">
            <ul className={styles.navList}>
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <a className={styles.navLink} href={`#${link.id}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className={styles.contentWrap}>
          <section id="cover" className={styles.coverSection}>
            <p className={styles.eyebrow}>Style Guide / Internal Reference</p>
            <h1 className={styles.displayL}>Luna Voyages Website Style Guide</h1>
            <p className={styles.subtitle}>
              A refined, concierge-led visual system for romantic journeys shaped around intimacy,
              atmosphere, and architectural calm.
            </p>
            <p className={styles.bodyL}>
              This guide defines the essential language for Luna Voyages: warm neutrals, restrained
              burgundy accents, expressive editorial typography, and spacious layouts that let
              photography and story lead. Every touchpoint should feel thoughtfully designed,
              seamlessly handled.
            </p>
          </section>

          <section id="principles" className={styles.section}>
            <SectionHeading
              eyebrow="01 / Brand Principles"
              title="How The Brand Should Feel"
              body="Each principle is a lens for design decisions, from layouts and typography to form tone and interaction details."
            />
            <div className={styles.principlesGrid}>
              {principles.map((principle) => (
                <article key={principle.title} className={styles.principleCard}>
                  <h3 className={styles.h4}>{principle.title}</h3>
                  <p className={styles.bodyM}>{principle.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="palette" className={styles.section}>
            <SectionHeading
              eyebrow="02 / Color Palette"
              title="Warm Neutrals, Restrained Burgundy, Rare Champagne"
              body="Use champagne as a fine accent, never as a core text or utility color. The palette should stay calm, tactile, and premium."
            />
            <div className={styles.colorStack}>
              <ColorGroup title="Primary Brand Colors" colors={primaryColors} />
              <ColorGroup title="Neutral Background & Surface Colors" colors={neutrals} />
              <ColorGroup title="Text & Accent Colors" colors={textColors} />
              <ColorGroup title="Semantic Colors" colors={semanticColors} />
            </div>
            <article className={styles.usageRatio}>
              <h3 className={styles.h5}>Usage Ratio</h3>
              <p className={styles.bodyM}>70% warm neutrals, 20% ink/text tones, 8% burgundy, 2% champagne.</p>
            </article>
          </section>

          <section id="type" className={styles.section}>
            <SectionHeading
              eyebrow="03 / Typography"
              title="Cormorant Garamond + Inter"
              body="Display and headings carry editorial elegance; body and UI text remain quiet, legible, and modern."
            />
            <div className={styles.typeShowcase}>
              <p className={styles.displayXL}>Journeys shaped around the two of you</p>
              <p className={styles.displayL}>Crafted with quiet luxury</p>
              <p className={styles.displayM}>Thoughtfully designed, seamlessly handled</p>
              <p className={styles.h1}>Quiet villas, candlelit dinners, and journeys that feel entirely your own</p>
              <p className={styles.h2}>A concierge-led approach to romantic travel in Sri Lanka</p>
              <p className={styles.h3}>Editorial warmth with architectural precision</p>
              <p className={styles.h4}>Premium hospitality, personally arranged</p>
              <p className={styles.h5}>Every detail considered in advance</p>
              <p className={styles.bodyL}>Body L: ideal for introductory paragraphs and richer narrative moments.</p>
              <p className={styles.bodyM}>Body M: the default for product copy, section support text, and card content.</p>
              <p className={styles.bodyS}>Body S: use for compact support content without losing readability.</p>
              <p className={styles.label}>Label: form labels and compact interface descriptors.</p>
              <p className={styles.caption}>Caption: small metadata, timing, and supplementary context.</p>
              <p className={styles.eyebrow}>Eyebrow: small uppercase pre-heading</p>
            </div>
          </section>

          <section id="spacing" className={styles.section}>
            <SectionHeading
              eyebrow="04 / Spacing + Layout"
              title="Breathing Room Is A Core Brand Element"
              body="Composition should feel calm and deliberate. Keep lines readable and section rhythm generous."
            />
            <div className={styles.layoutGrid}>
              <article className={styles.scaleCard}>
                <h3 className={styles.h5}>Spacing Scale</h3>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((step) => (
                  <div key={step} className={styles.spaceRow}>
                    <span className={styles.caption}>--space-{step}</span>
                    <div style={{ width: `var(--space-${step})` }} className={styles.spaceBar} />
                  </div>
                ))}
              </article>
              <article className={styles.scaleCard}>
                <h3 className={styles.h5}>Layout Rules</h3>
                <p className={styles.bodyM}>Container max width: 1240px</p>
                <p className={styles.bodyM}>Readable copy width: 720px</p>
                <p className={styles.bodyM}>Standard section spacing: 96px to 120px</p>
                <p className={styles.bodyM}>Most content: left-aligned</p>
                <p className={styles.bodyM}>Center alignment: hero, quote moments, closing CTA only</p>
              </article>
            </div>
          </section>

          <section id="buttons" className={styles.section}>
            <SectionHeading
              eyebrow="05 / Buttons"
              title="Premium, Calm Interaction"
              body="Buttons should feel tangible but understated, with soft transitions and clear hierarchy."
            />
            <div className={styles.buttonRow}>
              <button className={styles.primaryButton}>Start Your Honeymoon Plan</button>
              <button className={styles.secondaryButton}>Explore Real Honeymoons</button>
              <button className={styles.textLink}>Begin Planning</button>
              <button className={styles.primaryButton} disabled>
                Planning Opens Soon
              </button>
            </div>
          </section>

          <section id="forms" className={styles.section}>
            <SectionHeading
              eyebrow="06 / Forms"
              title="Concierge-Led Inquiry Patterns"
              body="Forms should sound conversational and personal. Labels stay visible, fields feel soft, and focus is clear."
            />
            <form className={styles.formCard}>
              <div className={styles.formGrid}>
                <label className={styles.fieldWrap}>
                  <span className={styles.label}>Your name</span>
                  <input className={styles.field} type="text" placeholder="Ava and Daniel" />
                </label>
                <label className={styles.fieldWrap}>
                  <span className={styles.label}>Your email</span>
                  <input className={styles.field} type="email" placeholder="you@example.com" />
                </label>
                <label className={styles.fieldWrap}>
                  <span className={styles.label}>When are you planning to travel?</span>
                  <input className={styles.field} type="date" />
                </label>
                <label className={styles.fieldWrap}>
                  <span className={styles.label}>Preferred pace of your journey</span>
                  <select className={styles.field} defaultValue="">
                    <option value="" disabled>
                      Select an approach
                    </option>
                    <option>Slow and restorative</option>
                    <option>Balanced exploration</option>
                    <option>Immersive and active</option>
                  </select>
                </label>
                <label className={styles.fieldWrapFull}>
                  <span className={styles.label}>What kind of honeymoon are you dreaming of?</span>
                  <textarea
                    className={styles.textarea}
                    rows={4}
                    placeholder="Quiet villas, candlelit dinners, and private experiences that feel entirely your own."
                  />
                </label>
              </div>
              <button className={styles.primaryButton} type="submit">
                Share Your Vision
              </button>
            </form>
          </section>

          <section id="cards" className={styles.section}>
            <SectionHeading
              eyebrow="07 / Cards & Content Blocks"
              title="Elegant, Spacious Information Patterns"
              body="Cards should frame content without making the interface feel boxed in. Use subtle borders, minimal shadows."
            />
            <div className={styles.cardsGrid}>
              <article className={styles.standardCard}>
                <p className={styles.eyebrow}>Standard Content Card</p>
                <h3 className={styles.h4}>Signature Coastal Retreats</h3>
                <p className={styles.bodyM}>
                  Private villas with dedicated butlers, sea-facing terraces, and itineraries paced around
                  your own rituals.
                </p>
              </article>
              <article className={styles.standardCard}>
                <p className={styles.eyebrow}>Testimonial Card</p>
                <blockquote className={styles.h4}>
                  “Every day felt effortless. We never once felt processed, only cared for.”
                </blockquote>
                <p className={styles.caption}>Maya & Arjun, 9-night journey across Sri Lanka</p>
              </article>
              <article className={styles.standardCard}>
                <p className={styles.eyebrow}>Process Card</p>
                <h3 className={styles.h4}>From inquiry to arrival in three curated steps</h3>
                <p className={styles.bodyM}>Discover, co-design, and depart with every detail quietly handled.</p>
              </article>
              <article className={styles.imagePlaceholderCard}>
                <p className={styles.caption}>Image Direction</p>
                <p className={styles.h5}>Natural light, architectural stillness, intimate candid moments.</p>
              </article>
            </div>
          </section>

          <section id="headings" className={styles.section}>
            <SectionHeading
              eyebrow="08 / Section Heading Patterns"
              title="Reusable Compositions"
              body="Use these heading structures to maintain consistency while allowing editorial flexibility across pages."
            />
            <div className={styles.headingPatterns}>
              <article className={styles.patternCard}>
                <p className={styles.eyebrow}>Eyebrow + Heading + Paragraph</p>
                <h3 className={styles.h3}>Thoughtfully designed, seamlessly handled</h3>
                <p className={styles.bodyM}>Use for most content sections with left-aligned narrative support.</p>
              </article>
              <article className={styles.patternCardCentered}>
                <p className={styles.eyebrow}>Centered Editorial Intro</p>
                <h3 className={styles.h2}>Journeys shaped around the two of you</h3>
                <p className={styles.bodyL}>Best for hero and high-emotion narrative pivots.</p>
              </article>
              <article className={styles.patternCard}>
                <p className={styles.eyebrow}>Left-Aligned Content Intro</p>
                <h3 className={styles.h3}>A concierge-led approach to romantic travel in Sri Lanka</h3>
                <p className={styles.bodyM}>Default for editorial sections, process storytelling, and service clarity.</p>
              </article>
              <article className={styles.patternCardDark}>
                <p className={styles.eyebrow}>Dark Variation</p>
                <h3 className={styles.h3}>Muted warmth on ink surfaces</h3>
                <p className={styles.bodyM}>Reserve for footer and select transition bands only.</p>
              </article>
            </div>
          </section>

          <section id="examples" className={styles.section}>
            <SectionHeading
              eyebrow="09 / Example Website Sections"
              title="The System In Context"
              body="These examples show how typography, spacing, and components come together in a believable Luna Voyages interface."
            />

            <article className={styles.exampleHero}>
              <p className={styles.eyebrow}>Hero Section</p>
              <h3 className={styles.displayM}>Quiet villas, candlelit dinners, and journeys that feel entirely your own</h3>
              <p className={styles.bodyL}>
                Bespoke honeymoons in Sri Lanka, curated with a concierge-led approach and designed around
                your rhythm as a couple.
              </p>
              <div className={styles.buttonRow}>
                <button className={styles.primaryButton}>Start Your Honeymoon Plan</button>
                <button className={styles.secondaryButton}>Explore Real Honeymoons</button>
              </div>
            </article>

            <article className={styles.exampleSection}>
              <div>
                <p className={styles.eyebrow}>Signature Experiences</p>
                <h3 className={styles.h2}>Curated moments, never crowded itineraries</h3>
              </div>
              <div className={styles.featureGrid}>
                <div className={styles.standardCard}>
                  <h4 className={styles.h5}>Private Tea Estate Evenings</h4>
                  <p className={styles.bodyM}>Golden-hour tastings followed by candlelit dinner in restored planter bungalows.</p>
                </div>
                <div className={styles.standardCard}>
                  <h4 className={styles.h5}>South Coast Villa Retreats</h4>
                  <p className={styles.bodyM}>Oceanfront villas with discreet service and sunrise breakfasts for two.</p>
                </div>
                <div className={styles.standardCard}>
                  <h4 className={styles.h5}>Sacred City Dawn Rituals</h4>
                  <p className={styles.bodyM}>Early temple visits guided in silence before the day begins.</p>
                </div>
              </div>
            </article>

            <article className={styles.exampleQuote}>
              <p className={styles.eyebrow}>Real Honeymoon Story</p>
              <blockquote className={styles.h2}>
                “The journey felt like it had been written for us, from the first call to the final evening.”
              </blockquote>
              <p className={styles.bodyM}>Elena & Marcus, 12 nights in Colombo, Hatton, and Tangalle</p>
            </article>

            <article className={styles.exampleCta}>
              <div>
                <p className={styles.eyebrow}>Planning CTA</p>
                <h3 className={styles.h2}>Begin with a conversation, not a booking form</h3>
                <p className={styles.bodyL}>
                  Tell us what you value most, and we will shape a journey that feels unmistakably yours.
                </p>
              </div>
              <button className={styles.primaryButton}>Begin Planning</button>
            </article>
          </section>

          <section id="dark" className={styles.section}>
            <SectionHeading
              eyebrow="10 / Dark Surface Example"
              title="Ink Background Application"
              body="Use dark surfaces sparingly for closings and moments of contrast. Maintain warmth and readability."
            />
            <article className={styles.darkPanel}>
              <p className={styles.eyebrow}>Footer Pattern</p>
              <h3 className={`${styles.h2} font-wordmark`}>LUNA VOYAGES</h3>
              <p className={styles.darkLead}>
                A concierge-led approach to romantic travel in Sri Lanka.
              </p>
              <div className={styles.champagneDivider} />
              <p className={styles.darkMeta}>Crafted with quiet luxury. Thoughtfully designed, seamlessly handled.</p>
            </article>
          </section>

          <section id="tokens" className={styles.section}>
            <SectionHeading
              eyebrow="11 / Design Tokens"
              title="Developer Handoff"
              body="Token references below are designed for direct implementation and easy extension."
            />
            <div className={styles.tokenGrid}>
              {tokenSnippets.map((snippet) => (
                <article key={snippet.label} className={styles.tokenCard}>
                  <p className={styles.label}>{snippet.label}</p>
                  <pre className={styles.tokenCode}>
                    <code>{snippet.code}</code>
                  </pre>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
