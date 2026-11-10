import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, type IconName } from "./icon";

const iconNames: IconName[] = [
  "users",
  "monitor",
  "plug",
  "keyboard",
  "presentation",
  "clock",
  "calendar",
  "check",
  "chevron-right",
  "chevron-down",
  "x",
  "armchair",
  "search",
  "plus",
  "door",
  "refresh",
  "layout-grid",
  "layers",
  "trash",
  "menu",
  "bell",
  "arrow-left",
  "external-link",
  "pencil",
  "upload",
  "alert-triangle",
  "eye-off",
  "shield",
  "image",
];

const meta = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  args: {
    name: "users",
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
      {iconNames.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-md border border-line p-4"
        >
          <Icon name={name} size={24} />
          <span className="text-body-sm text-fg-secondary">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    name: "users",
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {[14, 16, 18, 20, 22, 24].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="users" size={size as 14 | 16 | 18 | 20 | 22 | 24} />
          <span className="text-body-sm text-fg-secondary">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const InheritedColor: Story = {
  args: {
    name: "users",
  },
  render: () => (
    <div className="flex gap-6">
      <span className="flex items-center gap-2 text-fg-secondary">
        <Icon name="users" />
        Secondary
      </span>

      <span className="flex items-center gap-2 text-fg-brand">
        <Icon name="check" />
        Brand
      </span>

      <span className="flex items-center gap-2 text-fg-danger">
        <Icon name="alert-triangle" />
        Danger
      </span>
    </div>
  ),
};
