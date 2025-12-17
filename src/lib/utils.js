import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function resolveMediaUrl(url) {
  if (!url) return "";
  if (typeof url !== "string") return String(url);
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const origin =
    process.env.NEXT_PUBLIC_MEDIA_ORIGIN || "http://127.0.0.1:8000";
  if (url.startsWith("/")) return `${origin}${url}`;
  return `${origin}/${url}`;
}
