import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function resolveMediaUrl(url) {
  if (!url) return "";
  if (typeof url !== "string") return String(url);
  // Return blob URLs as-is (they should not be modified)
  if (url.startsWith("blob:")) return url;
  // Return full URLs as-is
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Normalize origin to remove trailing slash
  const origin =
    (process.env.NEXT_PUBLIC_MEDIA_ORIGIN || "http://103.98.76.142").replace(/\/+$/, "");
  // Handle URLs that start with /
  if (url.startsWith("/")) return `${origin}${url}`;
  // Handle URLs without leading /
  return `${origin}/${url}`;
}
