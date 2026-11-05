import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Token = {
  name: string;
  cssVar: string;
  utility: string;
};

const backgrounds: Token[] = [
  { name: "bg/canvas", cssVar: "--color-bg-canvas", utility: "bg-canvas" },
  { name: "bg/surface", cssVar: "--color-bg-surface", utility: "bg-surface" },
  { name: "bg/subtle", cssVar: "--color-bg-subtle", utility: "bg-subtle" },
  { name: "bg/muted", cssVar: "--color-bg-muted", utility: "bg-muted" },
  { name: "bg/brand", cssVar: "--color-bg-brand", utility: "bg-brand" },
  {
    name: "bg/brand-hover",
    cssVar: "--color-bg-brand-hover",
    utility: "bg-brand-hover",
  },
  {
    name: "bg/brand-subtle",
    cssVar: "--color-bg-brand-subtle",
    utility: "bg-brand-subtle",
  },
  {
    name: "bg/warning-subtle",
    cssVar: "--color-bg-warning-subtle",
    utility: "bg-warning-subtle",
  },
  {
    name: "bg/danger-subtle",
    cssVar: "--color-bg-danger-subtle",
    utility: "bg-danger-subtle",
  },
  {
    name: "bg/info-subtle",
    cssVar: "--color-bg-info-subtle",
    utility: "bg-info-subtle",
  },
  {
    name: "bg/disabled",
    cssVar: "--color-bg-disabled",
    utility: "bg-disabled",
  },
  { name: "bg/inverse", cssVar: "--color-bg-inverse", utility: "bg-inverse" },
  { name: "bg/overlay", cssVar: "--color-bg-overlay", utility: "bg-overlay" },
];

const textAndIcons: Token[] = [
  { name: "text/primary", cssVar: "--color-text-primary", utility: "text-fg" },
  {
    name: "text/secondary",
    cssVar: "--color-text-secondary",
    utility: "text-fg-secondary",
  },
  {
    name: "text/tertiary",
    cssVar: "--color-text-tertiary",
    utility: "text-fg-tertiary",
  },
  {
    name: "text/on-brand",
    cssVar: "--color-text-on-brand",
    utility: "text-fg-on-brand",
  },
  {
    name: "text/brand",
    cssVar: "--color-text-brand",
    utility: "text-fg-brand",
  },
  {
    name: "text/warning",
    cssVar: "--color-text-warning",
    utility: "text-fg-warning",
  },
  {
    name: "text/danger",
    cssVar: "--color-text-danger",
    utility: "text-fg-danger",
  },
  { name: "text/info", cssVar: "--color-text-info", utility: "text-fg-info" },
  {
    name: "icon/brand",
    cssVar: "--semantic-icon-brand",
    utility: "text-icon-brand",
  },
  {
    name: "text/on-inverse",
    cssVar: "--color-text-on-inverse",
    utility: "text-fg-on-inverse",
  },
  {
    name: "text/on-inverse-muted",
    cssVar: "--color-text-on-inverse-muted",
    utility: "text-fg-on-inverse-muted",
  },
];

const borders: Token[] = [
  {
    name: "border/default",
    cssVar: "--color-border-default",
    utility: "border-line",
  },
  {
    name: "border/strong",
    cssVar: "--color-border-strong",
    utility: "border-line-strong",
  },
  {
    name: "border/brand",
    cssVar: "--color-border-brand",
    utility: "border-line-brand",
  },
  {
    name: "border/brand-subtle",
    cssVar: "--color-border-brand-subtle",
    utility: "border-line-brand-subtle",
  },
  {
    name: "border/warning",
    cssVar: "--color-border-warning",
    utility: "border-line-warning",
  },
  {
    name: "border/danger",
    cssVar: "--color-border-danger",
    utility: "border-line-danger",
  },
];

const checkerboard = {
  backgroundImage:
    "repeating-conic-gradient(var(--color-bg-muted) 0% 25%, var(--color-bg-surface) 0% 50%)",
  backgroundSize: "16px 16px",
};

function Swatch({ name, cssVar, utility }: Token) {
  return (
    <div className="w-44">
      <div
        className="overflow-hidden rounded-md border border-line"
        style={checkerboard}
      >
        <div className="h-16" style={{ backgroundColor: `var(${cssVar})` }} />
      </div>
      <p className="mt-2 text-label-md text-fg">{name}</p>
      <p className="text-label-sm text-fg-secondary">{utility}</p>
      <p className="text-label-sm text-fg-tertiary">{cssVar}</p>
    </div>
  );
}

function Group({ title, tokens }: { title: string; tokens: Token[] }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-h2 text-fg">{title}</h2>
      <div className="flex flex-wrap gap-6">
        {tokens.map((token) => (
          <Swatch key={token.name} {...token} />
        ))}
      </div>
    </section>
  );
}

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div>
      <Group title="Backgrounds" tokens={backgrounds} />
      <Group title="Text & icons" tokens={textAndIcons} />
      <Group title="Borders" tokens={borders} />
    </div>
  ),
};
