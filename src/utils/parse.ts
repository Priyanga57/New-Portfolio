import { twMerge } from 'tailwind-merge';

type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}

/** Splits a delimited cell into a trimmed, de-duplicated, non-empty list. */
export function splitList(value: string | undefined, separator: RegExp = /;/): string[] {
  if (!value) return [];
  const parts = value.
  split(separator).
  map((part) => part.trim()).
  filter((part) => part.length > 0 && !isNullish(part));
  return Array.from(new Set(parts));
}

export function toBoolean(value: string | undefined): boolean {
  if (!value) return false;
  return /^(true|yes|y|1)$/i.test(value.trim());
}

/** Returns the value only when it is a syntactically valid http(s) URL. */
export function safeUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) return undefined;
  try {
    const url = new URL(trimmed);
    return url.toString();
  } catch {
    return undefined;
  }
}

/** Guards against literal "null"/"undefined"/"NaN" strings leaking from a spreadsheet. */
export function isNullish(value: string | undefined): boolean {
  if (!value) return true;
  return /^(null|undefined|nan|n\/a|-)$/i.test(value.trim());
}

export function clean(value: string | undefined): string | undefined {
  if (isNullish(value)) return undefined;
  return value?.trim();
}

export function slugify(value: string): string {
  return value.
  toLowerCase().
  replace(/[^a-z0-9]+/g, '-').
  replace(/(^-|-$)/g, '');
}