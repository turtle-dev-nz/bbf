import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./BBRButton.css";

type BBRButtonSize = "sm" | "md" | "lg";

interface BBRButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: BBRButtonSize;
}

// Shared solid-orange CTA used across the Sam's Big Brain Run / Georgie's Story campaign
export function BBRButton({ children, size = "md", className, type = "button", ...props }: BBRButtonProps) {
  const classes = ["bbr-button", `bbr-button--${size}`, className].filter(Boolean).join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
