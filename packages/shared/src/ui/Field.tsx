"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const control =
  "block w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-ink ring-1 ring-inset ring-line outline-none transition placeholder:text-ink-soft/60 focus:ring-2 focus:ring-brand-600 aria-[invalid=true]:ring-brand-500";

interface WrapperProps {
  label: string;
  hint?: string;
  error?: string;
  children: (id: string) => ReactNode;
}

function FieldWrapper({ label, hint, error, children }: WrapperProps) {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="text-xs text-brand-700">{error}</p>
      ) : (
        hint && <p className="text-xs text-ink-soft">{hint}</p>
      )}
    </div>
  );
}

type Common = { label: string; hint?: string; error?: string };

export function TextField({ label, hint, error, ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} hint={hint} error={error}>
      {(id) => <input id={id} aria-invalid={!!error} className={control} {...props} />}
    </FieldWrapper>
  );
}

export function SelectField({ label, hint, error, children, ...props }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label} hint={hint} error={error}>
      {(id) => (
        <select id={id} aria-invalid={!!error} className={control} {...props}>
          {children}
        </select>
      )}
    </FieldWrapper>
  );
}

export function TextAreaField({ label, hint, error, ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label} hint={hint} error={error}>
      {(id) => <textarea id={id} aria-invalid={!!error} className={`${control} min-h-24`} {...props} />}
    </FieldWrapper>
  );
}
