import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function parsePrice(p: number | string | undefined): number {
  if (p === undefined) return 0;
  if (typeof p === "number") return p;
  let s = p.toString().trim();
  if (!s) return 0;

  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");

  if (lastComma > lastDot) {
    // European format: 1.234,56
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (lastDot > lastComma) {
    // US format: 1,234.56
    s = s.replace(/,/g, "");
  } else {
    // No separators or just one: "1234,56" or "1234.56"
    s = s.replace(",", ".");
  }

  const num = parseFloat(s);
  return isNaN(num) ? 0 : num;
}

export function formatPrice(p: number | string | undefined): string {
  const num = parsePrice(p);
  return num.toFixed(2).replace(".", ",");
}
