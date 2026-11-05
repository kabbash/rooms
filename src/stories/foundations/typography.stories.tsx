import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Style = {
  name: string;
  utility: string;
  sample: string;
};

const SAMPLE = "Book a room in Maadi";

const styles: Style[] = [
  { name: "Display/Lg", utility: "text-display-lg", sample: SAMPLE },
  { name: "Heading/H1", utility: "text-h1", sample: SAMPLE },
  { name: "Heading/H2", utility: "text-h2", sample: SAMPLE },
  { name: "Heading/H3", utility: "text-h3", sample: SAMPLE },
  { name: "Body/Md", utility: "text-body-md", sample: SAMPLE },
  { name: "Body/Sm", utility: "text-body-sm", sample: SAMPLE },
  { name: "Label/Md", utility: "text-label-md", sample: SAMPLE },
  { name: "Label/Sm", utility: "text-label-sm", sample: SAMPLE },
  {
    name: "Overline",
    utility: "text-overline",
    sample: "Today's availability",
  },
];

function Specimen({ name, utility, sample }: Style) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [meta, setMeta] = useState("");

  useEffect(() => {
    if (!ref.current) return;
    const cs = getComputedStyle(ref.current);
    setMeta(`${cs.fontSize} / ${cs.lineHeight} · weight ${cs.fontWeight}`);
  }, []);

  return (
    <div className="flex items-baseline gap-6 border-b border-line py-4">
      <div className="w-48 shrink-0">
        <p className="text-label-md text-fg">{name}</p>
        <p className="text-label-sm text-fg-secondary">{utility}</p>
        <p className="text-label-sm text-fg-tertiary">{meta}</p>
      </div>
      <p ref={ref} className={`${utility} text-fg`}>
        {sample}
      </p>
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = {
  render: () => (
    <section>
      <h2 className="mb-2 text-h2 text-fg">Typography — Roboto</h2>
      <div>
        {styles.map((style) => (
          <Specimen key={style.name} {...style} />
        ))}
      </div>
    </section>
  ),
};
