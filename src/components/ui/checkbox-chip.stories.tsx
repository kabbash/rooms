import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckboxChip } from "./checkbox-chip";
//import { useState } from "react";

const meta = {
  title: "UI/CheckboxChip",
  component: CheckboxChip,
  tags: ["autodocs"],
  args: {
    label: "Monitor",
    icon: "monitor",
    onChange: () => {},
  },
} satisfies Meta<typeof CheckboxChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { checked: true },
};

export const Unselected: Story = {
  args: { checked: false },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};

// export const MultiSelectTest: Story = {
//   render: function Render() {
//     const [selected, setSelected] = useState<string[]>(["monitor"]);

//     const toggleOption = (value: string) => {
//       setSelected((current) =>
//         current.includes(value)
//           ? current.filter((item) => item !== value)
//           : [...current, value],
//       );
//     };

//     return (
//       <div className="flex gap-3">
//         <CheckboxChip
//           checked={selected.includes("monitor")}
//           onChange={() => toggleOption("monitor")}
//           label="Monitor"
//           icon="monitor"
//         />

//         <CheckboxChip
//           checked={selected.includes("hdmi")}
//           onChange={() => toggleOption("hdmi")}
//           label="HDMI"
//           icon="monitor"
//         />
//       </div>
//     );
//   },
// };
