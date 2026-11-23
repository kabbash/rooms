import Link from "next/link";
import { Avatar } from "./avatar";

type MobileTopBarProps = {
  user: {
    name: string;
    avatar?: string;
  };
};

export function MobileTopBar({ user }: MobileTopBarProps) {
  return (
    <header className="flex h-14 w-full items-center gap-3 border-b border-line bg-surface px-4 md:hidden">
      <Link
        href="/"
        aria-label="Rooms home"
        className="flex flex-1 items-center gap-1.5 text-h3"
      >
        <span className="text-fg-brand">{"{R}"}</span>
        <span className="text-icon-brand">ROOMS</span>
      </Link>

      <Avatar
        src={user.avatar}
        name={user.name}
        size={32}
        className="border-2 border-surface bg-brand-subtle text-fg-brand"
      />
    </header>
  );
}
