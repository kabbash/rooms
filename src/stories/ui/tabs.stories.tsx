import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "../../components/ui/tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
    },
    onValueChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

function FloorTabsExample() {
  const [activeFloor, setActiveFloor] = useState("floor-1");

  return (
    <div className="w-full">
      {" "}
      <Tabs
        aria-label="Select floor"
        items={[
          { value: "floor-1", label: "Floor 1" },
          { value: "floor-2", label: "Floor 2" },
        ]}
        value={activeFloor}
        onValueChange={setActiveFloor}
      />
      <p className="mt-4 text-body-sm text-fg-secondary">
        Selected: {activeFloor === "floor-1" ? "Floor 1" : "Floor 2"}
      </p>
    </div>
  );
}

function BookingTabsExample() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="w-full max-w-md">
      <Tabs
        aria-label="Booking history"
        items={[
          { value: "upcoming", label: "Upcoming" },
          { value: "past", label: "Past" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />
    </div>
  );
}

export const FloorSelection: Story = {
  args: {
    "aria-label": "Select floor",
    items: [
      { value: "floor-1", label: "Floor 1" },
      { value: "floor-2", label: "Floor 2" },
    ],
    value: "floor-1",
    onValueChange: () => {},
  },
  render: () => <FloorTabsExample />,
};

export const BookingHistory: Story = {
  args: {
    "aria-label": "Booking history",
    items: [
      { value: "upcoming", label: "Upcoming" },
      { value: "past", label: "Past" },
    ],
    value: "upcoming",
    onValueChange: () => {},
  },
  render: () => <BookingTabsExample />,
};

export const DisabledTab: Story = {
  args: {
    "aria-label": "Select floor",
    items: [
      { value: "floor-1", label: "Floor 1" },
      { value: "floor-2", label: "Floor 2", disabled: true },
    ],
    value: "floor-1",
    onValueChange: () => {},
  },
};

function ThreeTabsExample() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full">
      <Tabs
        aria-label="Filter rooms by floor"
        items={[
          { value: "all", label: "All" },
          { value: "floor-2", label: "Floor 2" },
          { value: "floor-1", label: "Floor 1" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />

      <p className="mt-4 text-body-sm text-fg-secondary">
        Selected:{" "}
        {activeTab === "all"
          ? "All"
          : activeTab === "floor-2"
            ? "Floor 2"
            : "Floor 1"}
      </p>
    </div>
  );
}

export const ThreeTabs: Story = {
  args: {
    "aria-label": "Filter rooms by floor",
    items: [
      { value: "all", label: "All" },
      { value: "floor-2", label: "Floor 2" },
      { value: "floor-1", label: "Floor 1" },
    ],
    value: "all",
    onValueChange: () => {},
  },
  render: () => <ThreeTabsExample />,
};
