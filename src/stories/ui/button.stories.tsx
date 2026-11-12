import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    leadingIcon: {
      control: false,
    },
    trailingIcon: {
      control: false,
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryMd: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Book Room",
    //onClick: () => alert("Button activated"),
  },
};

export const PrimaryMdLoading: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Book Room",
    loading: true,
  },
};

export const PrimaryMdWithLeadingIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Book Room",
    leadingIcon: <span aria-hidden="true">+</span>,
  },
};

export const PrimaryMdWithTrailingIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Book Room",
    trailingIcon: <span aria-hidden="true">+</span>,
  },
};

export const PrimaryMdDisabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Book Room",
    disabled: true,
  },
};

export const PrimarySm: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Book Room",
  },
};

export const PrimarySmDisabled: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Book Room",
    disabled: true,
  },
};

export const SecondaryMd: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Book Room",
  },
};

export const SecondaryMdDisabled: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Book Room",
    disabled: true,
  },
};

export const SecondarySm: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    children: "Book Room",
  },
};

export const SecondarySmDisabled: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    children: "Book Room",
    disabled: true,
  },
};

export const GhostMd: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: "Book Room",
  },
};

export const GhostMdDisabled: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: "Book Room",
    disabled: true,
  },
};

export const GhostSm: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    children: "Book Room",
    className: "text-fg-brand",
  },
};

export const GhostSmDisabled: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    children: "Book Room",
    disabled: true,
  },
};

export const DangerMd: Story = {
  args: {
    variant: "danger",
    size: "md",
    children: "Book Room",
  },
};

export const DangerMdDisabled: Story = {
  args: {
    variant: "danger",
    size: "md",
    children: "Book Room",
    disabled: true,
  },
};

export const DangerSm: Story = {
  args: {
    variant: "danger",
    size: "sm",
    children: "Book Room",
  },
};

export const DangerSmDisabled: Story = {
  args: {
    variant: "danger",
    size: "sm",
    children: "Book Room",
    disabled: true,
  },
};

export const PrimaryMdAsLink: Story = {
  args: {
    variant: "primary",
    size: "md",
    asChild: true,
    children: <a href="/rooms">Book Room</a>,
  },
};
