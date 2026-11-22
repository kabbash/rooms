import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-lg",
        "h1",
        "h2",
        "h3",
        "body-md",
        "body-sm",
        "label-md",
        "label-sm",
        "overline",
      ],
    },
  },
});

/** Merge Tailwind classes; later classes win (shadcn/ui convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
