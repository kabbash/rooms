import { useState } from "react";
import { cn } from "@/lib/cn";
import Image from "next/image";

type AvatarSize = 24 | 32 | 40 | 56;

type AvatarProps = {
  src?: string;
  name: string;
  size?: AvatarSize;
};

const avatarFontSizes: Record<AvatarSize, number> = {
  24: 10,
  32: 12,
  40: 14,
  56: 18,
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name, size = 40 }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showImage = src && !imageError;

  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full aspect-square box-border bg-subtle text-fg-secondary font-sans font-medium",
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          style={{ borderRadius: "50%" }}
          className="size-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{ fontSize: avatarFontSizes[size] }}
          className="flex size-full items-center justify-center"
        >
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
