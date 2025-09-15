"use client";
import logoDarkImg from "@/assets/brand/logo-white.webp";
import logoImg from "@/assets/brand/logo.webp";
import { useTheme } from "next-themes";
import Image from "next/image";

interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={resolvedTheme === "dark" ? logoDarkImg : logoImg}
      alt="logo"
      width={500}
      height={500}
      className={className}
    />
  );
}
