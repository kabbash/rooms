import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "@/components/ui/app-header";

const meta = {
  title: "UI/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "select",
      options: ["rooms", "myBookings", "manageRooms"],
    },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

const employee = {
  name: "Ahmed Kabbash",
  role: "Employee",
  avatar: undefined,
};

export const EmployeeRooms: Story = {
  args: {
    active: "rooms",
    isAdmin: false,
    user: employee,
    bookingCount: 2,
    portalUrl: "https://remotecoders.org/portal",
  },
};

export const EmployeeMyBookings: Story = {
  args: {
    active: "myBookings",
    isAdmin: false,
    user: employee,
    bookingCount: 2,
    portalUrl: "https://remotecoders.org/portal",
  },
};

export const AdminManageRooms: Story = {
  args: {
    active: "manageRooms",
    isAdmin: true,
    user: {
      ...employee,
      role: "Admin",
    },
    bookingCount: 2,
    portalUrl: "https://remotecoders.org/portal",
  },
};
