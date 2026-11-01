import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "dark" | "secondary" | "danger" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-[0_8px_24px_-10px_var(--color-brand-600)] hover:bg-brand-700",
  dark: "bg-ink text-white hover:bg-brand-600",
  secondary: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-ink/20",
  danger: "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50",
  ghost: "text-ink-soft hover:bg-white hover:text-ink",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export function Button({ variant = "primary", loading, disabled, className = "", children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {loading && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}
