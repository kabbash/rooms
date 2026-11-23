import Link from "next/link";
import { Avatar } from "./avatar";
import { Icon } from "./icon";

type NavKey = "rooms" | "myBookings" | "manageRooms";

type AppHeaderProps = {
  active: NavKey;
  isAdmin: boolean;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  bookingCount: number;
  portalUrl: string;
};

type NavItem = {
  label: string;
  href: string;
  key: NavKey;
  icon: "door" | "calendar" | "shield";
};

export function AppHeader({
  active,
  isAdmin,
  user,
  bookingCount,
  portalUrl,
}: AppHeaderProps) {
  const navItems: NavItem[] = [
    { label: "Rooms", href: "/", key: "rooms", icon: "door" },
    {
      label: "My bookings",
      href: "/my-bookings",
      key: "myBookings",
      icon: "calendar",
    },
    ...(isAdmin
      ? [
          {
            label: "Manage rooms",
            href: "/admin/rooms",
            key: "manageRooms" as const,
            icon: "shield" as const,
          },
        ]
      : []),
  ];

  return (
    <header className="hidden h-[72px] w-full items-center gap-10 border-b border-line bg-surface px-12 md:flex">
      {/* Logo + office */}
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-h2 font-semibold"
        >
          <span className="text-fg-brand">{"{R}"}</span>
          <span className="text-icon-brand">ROOMS</span>
        </Link>

        <button
          type="button"
          className="flex items-center gap-1 rounded-full bg-subtle py-1 pr-2 pl-2.5 text-label-sm text-fg-secondary"
        >
          Maadi office
          <span className="flex size-3.5 items-center justify-center text-fg-tertiary">
            <Icon name="chevron-down" size={14} />
          </span>
        </button>
      </div>

      {/* Nav */}
      <nav
        aria-label="Main navigation"
        className="flex flex-1 items-center gap-2 self-stretch"
      >
        {navItems.map((item) => {
          const isActive = active === item.key;
          const isManageRooms = item.key === "manageRooms";

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-2 self-stretch border-b-2 px-3 text-label-md transition-colors ${
                isActive
                  ? isManageRooms
                    ? "border-fg text-fg"
                    : "border-line-brand text-fg-brand"
                  : "border-transparent text-fg-secondary hover:text-fg"
              }`}
            >
              <span
                className={
                  isManageRooms && isActive ? "text-fg-brand" : undefined
                }
              >
                <Icon name={item.icon} size={18} />
              </span>
              {item.label}

              {item.key === "myBookings" && (
                <span
                  className={`rounded-full px-1.5 py-px text-label-sm ${
                    isActive
                      ? "bg-brand text-fg-on-brand"
                      : "bg-muted text-fg-secondary"
                  }`}
                >
                  {bookingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-5">
        <Link
          href={portalUrl}
          className="flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-label-md text-fg-secondary"
        >
          <Icon name="arrow-left" size={16} />
          RC Portal
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="flex flex-col items-end">
            <span className="text-label-md text-fg">{user.name}</span>
            <span className="text-label-sm text-fg-tertiary">{user.role}</span>
          </div>
          <Avatar
            src={user.avatar}
            name={user.name}
            size={40}
            className="border-2 border-surface bg-brand-subtle text-fg-brand"
          />
        </div>
      </div>
    </header>
  );
}
