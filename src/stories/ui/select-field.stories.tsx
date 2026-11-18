import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { SelectField } from "@/components/ui/select-field";
import { useState } from "react";

const timeOptions = [];

for (let minutes = 9 * 60; minutes <= 18 * 60; minutes += 30) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const label = `${String(hours).padStart(2, "0")}:${String(
    remainingMinutes,
  ).padStart(2, "0")}`;

  timeOptions.push({ label, value: label });
}

const meta = {
  title: "UI/SelectField",
  component: SelectField,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Date: Story = {
  args: {
    type: "date",
    label: "Date",
    value: "2026-10-26",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    return (
      <SelectField
        {...args}
        value={value as string}
        onChange={(newValue) => updateArgs({ value: newValue })}
      />
    );
  },
};

export const DisabledDate: Story = {
  args: {
    type: "date",
    label: "Date",
    value: "2026-10-26",
    disabled: true,
  },
};

export const Time: Story = {
  args: {
    type: "select",
    options: timeOptions,
    label: "Start",
    icon: "clock",
    value: "13:30",
  },
  render: function Render(args) {
    const [start, setStart] = useState("13:30");
    const [end, setEnd] = useState("14:30");

    return (
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <SelectField
          {...args}
          label="Start"
          value={start}
          onChange={setStart}
        />

        <SelectField {...args} label="End" value={end} onChange={setEnd} />
      </div>
    );
  },
};
