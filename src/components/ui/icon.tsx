import {
  Users,
  Monitor,
  Plug,
  Keyboard,
  Presentation,
  Clock,
  Calendar,
  Check,
  ChevronRight,
  ChevronDown,
  X,
  Armchair,
  Search,
  Plus,
  DoorOpen,
  RefreshCcw,
  LayoutGrid,
  Layers,
  Trash,
  Menu,
  Bell,
  ArrowLeft,
  ExternalLink,
  Pencil,
  Upload,
  TriangleAlert,
  EyeOff,
  Shield,
  Image,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

const iconMap = {
  users: Users,
  monitor: Monitor,
  plug: Plug,
  keyboard: Keyboard,
  presentation: Presentation,
  clock: Clock,
  calendar: Calendar,
  check: Check,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  x: X,
  armchair: Armchair,
  search: Search,
  plus: Plus,
  door: DoorOpen,
  refresh: RefreshCcw,
  "layout-grid": LayoutGrid,
  layers: Layers,
  trash: Trash,
  menu: Menu,
  bell: Bell,
  "arrow-left": ArrowLeft,
  "external-link": ExternalLink,
  pencil: Pencil,
  upload: Upload,
  "alert-triangle": TriangleAlert,
  "eye-off": EyeOff,
  shield: Shield,
  image: Image,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

type IconSize = 14 | 16 | 18 | 20 | 22 | 24;

type IconProps = {
  name: IconName;
  size?: IconSize;
  strokeWidth?: number;
  className?: string;
  label?: string;
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  className,
  label,
}: IconProps) {
  const IconComponent = iconMap[name];

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      color="currentColor"
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    />
  );
}
