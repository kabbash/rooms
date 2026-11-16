import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EquipmentTagProps = {
  icon: ReactNode;
  label: string;
};

export function EquipmentTag({ icon, label }: EquipmentTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] rounded-sm border border-line bg-subtle px-3 py-1 text-label-sm font-sans text-fg-secondary ",
      )}
    >
      {icon}
      {label}
    </span>
  );
}
