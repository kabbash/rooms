import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Space = {
  name: string;
  cssVar: string;
  utility: string;
};

const spaces: Space[] = [
  { name: "2xs", cssVar: "--spacing-2xs", utility: "p-1" },
  { name: "xs", cssVar: "--spacing-xs", utility: "p-2" },
  { name: "sm", cssVar: "--spacing-sm", utility: "p-3" },
  { name: "md", cssVar: "--spacing-md", utility: "p-4" },
  { name: "lg", cssVar: "--spacing-lg", utility: "p-5" },
  { name: "xl", cssVar: "--spacing-xl", utility: "p-6" },
  { name: "2xl", cssVar: "--spacing-2xl", utility: "p-8" },
  { name: "3xl", cssVar: "--spacing-3xl", utility: "p-12" },
];

function SpaceRow({ name, cssVar, utility }: Space) {
  const ref = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState("");

  useEffect(() => {
    if (ref.current)
      setPx(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
  }, [cssVar]);

  return (
    <div className="flex items-center gap-6 border-b border-line py-3">
      <div className="w-56 shrink-0">
        <p className="text-label-md text-fg">
          {name} · {px}
        </p>
        <p className="text-label-sm text-fg-secondary">{utility}</p>
        <p className="text-label-sm text-fg-tertiary">{cssVar}</p>
      </div>
      <div
        ref={ref}
        className="bg-brand"
        style={{ width: `var(${cssVar})`, height: `var(${cssVar})` }}
      />
    </div>
  );
}

const meta = {
  title: "Foundations/Spacing",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: () => (
    <section>
      <h2 className="mb-2 text-h2 text-fg">Spacing</h2>
      <div>
        {spaces.map((space) => (
          <SpaceRow key={space.name} {...space} />
        ))}
      </div>
    </section>
  ),
};
