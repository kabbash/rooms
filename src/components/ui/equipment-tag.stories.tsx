import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Monitor, Plug, Keyboard, Presentation } from "lucide-react";
import { EquipmentTag } from "./equipment-tag";

const meta = {
  title: "UI/EquipmentTag",
  component: EquipmentTag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EquipmentTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MonitorEquipment: Story = {
  args: {
    icon: <Monitor size={14} strokeWidth={2.5} />,
    label: "Monitor",
  },
};

export const HDMIEquipment: Story = {
  args: {
    icon: <Plug size={14} strokeWidth={2.5} />,
    label: "HDMI",
  },
};

export const MouseAndKeyboardEquipment: Story = {
  args: {
    icon: <Keyboard size={14} strokeWidth={2.5} />,
    label: "Mouse and Keyboard",
  },
};

export const WhiteboardEquipment: Story = {
  args: {
    icon: <Presentation size={14} strokeWidth={2.5} />,
    label: "Whiteboard",
  },
};
