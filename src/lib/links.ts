export function getBasePath(): string {
  const raw =
    typeof import.meta !== "undefined" && import.meta.env && typeof import.meta.env.BASE_URL === "string"
      ? import.meta.env.BASE_URL
      : "/";
  if (!raw || raw === "/") return "";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export function withBase(path: string): string {
  const base = getBasePath();
  if (!path || path === "/") return base ? `${base}/` : "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function lexicanumUrl(query: string): string {
  return `https://wh40k.lexicanum.com/mediawiki/index.php?search=${encodeURIComponent(query)}`;
}
