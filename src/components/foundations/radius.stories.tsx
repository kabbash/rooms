import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Radius = {
  name: string; // اسم Figma
  cssVar: string; // من tokens.css
  utility: string; // من globals.css
};

const radii: Radius[] = [
  { name: "radius/sm", cssVar: "--token-radius-sm", utility: "rounded-sm" },
  { name: "radius/md", cssVar: "--token-radius-md", utility: "rounded-md" },
  { name: "radius/lg", cssVar: "--token-radius-lg", utility: "rounded-lg" },
  {
    name: "radius/full",
    cssVar: "--token-radius-full",
    utility: "rounded-full",
  },
];

function RadiusBox({ name, cssVar, utility }: Radius) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  // نقرا قيمة الـ variable نفسها، مش رقم منسوخ
  useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
    }
  }, [cssVar]);

  return (
    <div style={{ width: 160 }}>
      {/* الحجم بـ style، والاستدارة بالـ utility الحقيقي */}
      <div
        ref={ref}
        className={`border border-line-brand bg-brand-subtle ${utility}`}
        style={{ width: 96, height: 96 }}
      />
      <p className="mt-2 text-label-md text-fg">
        {name} · {value}
      </p>
      <p className="text-label-sm text-fg-secondary">{utility}</p>
      <p className="text-label-sm text-fg-tertiary">{cssVar}</p>
    </div>
  );
}

const meta = {
  title: "Foundations/Radius",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radius: Story = {
  render: () => (
    <section>
      <h2 className="mb-4 text-h2 text-fg">Radius</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        {radii.map((radius) => (
          <RadiusBox key={radius.name} {...radius} />
        ))}
      </div>
    </section>
  ),
};
