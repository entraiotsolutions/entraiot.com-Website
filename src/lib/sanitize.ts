const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const TAGS = /<[^>]*>/g;

export function sanitizeText(input: unknown, max = 2000): string {
  const value = typeof input === "string" ? input : "";
  return value
    .replace(TAGS, " ")
    .replace(CONTROL_CHARS, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeMultilineText(input: unknown, max = 8000): string {
  const value = typeof input === "string" ? input : "";
  return value
    .replace(TAGS, " ")
    .replace(CONTROL_CHARS, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

