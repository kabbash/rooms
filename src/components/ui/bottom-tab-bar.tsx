import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

type BottomTabKey = "rooms" | "myBookings";

type BottomTabBarProps = {
  active: BottomTabKey;
  portalUrl: string;
};

const tabs: {
  key: BottomTabKey;
  label: string;
  href: string;
  icon: IconName;
}[] = [
  { key: "rooms", label: "Rooms", href: "/", icon: "door" },
  {
    key: "myBookings",
    label: "My bookings",
    href: "/my-bookings",
    icon: "calendar",
  },
];

const tabClass =
  "flex flex-1 flex-col items-center gap-1 pt-[10px] text-label-sm";

export function BottomTabBar({ active, portalUrl }: BottomTabBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="flex min-h-[72px] w-full items-start border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              tabClass,
              isActive ? "text-fg-brand" : "text-fg-tertiary",
            )}
          >
            <span className={isActive ? "text-icon-brand" : undefined}>
              <Icon name={tab.icon} size={22} />
            </span>
            {tab.label}
          </Link>
        );
      })}

      <Link href={portalUrl} className={cn(tabClass, "text-fg-tertiary")}>
        <Icon name="external-link" size={22} />
        RC Portal
      </Link>
    </nav>
  );
}
