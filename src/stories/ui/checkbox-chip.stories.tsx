import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckboxChip } from "../../components/ui/checkbox-chip";

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
