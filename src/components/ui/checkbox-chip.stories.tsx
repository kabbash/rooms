import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckboxChip } from "./checkbox-chip";
//import { useState } from "react";

function MonitorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="3.5"
        width="15"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 16.5H13M10 13.5V16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const meta = {
  title: "UI/CheckboxChip",
  component: CheckboxChip,
  tags: ["autodocs"],
  args: {
    label: "Monitor",
    icon: <MonitorIcon />,
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
//           icon={<MonitorIcon />}
//         />

//         <CheckboxChip
//           checked={selected.includes("hdmi")}
//           onChange={() => toggleOption("hdmi")}
//           label="HDMI"
//           icon={<MonitorIcon />}
//         />
//       </div>
//     );
//   },
// };
