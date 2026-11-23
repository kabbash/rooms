import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  TimeSlot,
  TimeSlotGroup,
  type TimeSlotGroupProps,
} from "../../components/rooms/time-slot";

const daySlots: TimeSlotGroupProps["slots"] = [
  { start: "09:00", end: "09:30", state: "default" },
  { start: "09:30", end: "10:00", state: "default" },
  { start: "10:00", end: "10:30", state: "unavailable" },
  { start: "10:30", end: "11:00", state: "default" },
  { start: "11:00", end: "11:30", state: "default" },
  { start: "11:30", end: "12:00", state: "unavailable" },
  { start: "12:00", end: "12:30", state: "default" },
  { start: "12:30", end: "13:00", state: "default" },
  { start: "13:00", end: "13:30", state: "default" },
  { start: "13:30", end: "14:00", state: "unavailable" },
  { start: "14:00", end: "14:30", state: "default" },
  { start: "14:30", end: "15:00", state: "default" },
  { start: "15:00", end: "15:30", state: "default" },
  { start: "15:30", end: "16:00", state: "default" },
  { start: "16:00", end: "16:30", state: "unavailable" },
  { start: "16:30", end: "17:00", state: "default" },
];

const meta = {
  title: "Rooms/Time Slot",
  component: TimeSlotGroup,
  tags: ["autodocs"],
  argTypes: {
    slots: { control: false },
    onChange: { control: false },
  },
} satisfies Meta<typeof TimeSlotGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  args: {
    slots: daySlots,
    value: "09:30",
    onChange: () => {},
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TimeSlot start="09:00" end="09:30" state="default" />
      <TimeSlot start="09:30" end="10:00" state="selected" />
      <TimeSlot start="10:00" end="10:30" state="unavailable" />
    </div>
  ),
};

function FullDayExample() {
  const [selectedTime, setSelectedTime] = useState<string | null>("09:00");

  return (
    <div className="w-full max-w-2xl space-y-4">
      <TimeSlotGroup
        slots={daySlots}
        value={selectedTime}
        onChange={setSelectedTime}
      />

      <p className="text-body-sm text-fg-secondary">
        Selected time: {selectedTime ?? "No time selected"}
      </p>
    </div>
  );
}

export const FullDay: Story = {
  args: {
    slots: daySlots,
    value: "09:00",
    onChange: () => {},
  },
  render: () => <FullDayExample />,
};
