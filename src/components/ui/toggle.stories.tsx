import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Toggle } from "./toggle";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive example to test Toggle behavior
function InteractiveToggle() {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      checked={checked}
      onCheckedChange={setChecked}
      label="Enable notifications"
    />
  );
}

export const Selected: Story = {
  args: {
    checked: true,
    label: "Enable notifications",
    onCheckedChange: () => {},
  },
};

export const Unselected: Story = {
  args: {
    checked: false,
    label: "Enable notifications",
    onCheckedChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    label: "Enable notifications",
    disabled: true,
    onCheckedChange: () => {},
  },
};

export const Interactive: Story = {
  args: {
    checked: false,
    label: "Enable notifications",
    onCheckedChange: () => {},
  },
  render: () => <InteractiveToggle />,
};
