import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 hover:shadow-lg hover:shadow-[#3AA7FF]/20 text-white",
  secondary:
    "bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white/90",
  ghost: "bg-white/5 border border-white/20 hover:bg-white/10 text-white/90",
};

export function Button({
  children,
  variant = "primary",
  href,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-nav font-medium transition-all",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
