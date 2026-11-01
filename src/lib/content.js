// Shared by server and client renderers. Never modify the source data.
const warned = new Set();
export function hasPlaceholder(value) {
  if (typeof value === "string") return value.includes("[FILL");
  if (Array.isArray(value)) return value.some(hasPlaceholder);
  if (value && typeof value === "object") return Object.values(value).some(hasPlaceholder);
  return false;
}
function warnSkipped(label, entries) {
  if (process.env.NODE_ENV !== "development" || !entries.length) return;
  const message = label + ": " + entries.map((item) => typeof item === "string" ? item : item.title || item.question || item.name || item.id || JSON.stringify(item)).join("; ");
  if (warned.has(message)) return;
  warned.add(message);
  console.warn("[content] Skipped unfinished entries — " + message);
}
export function readyEntries(entries = [], label = "Content") {
  warnSkipped(label, entries.filter(hasPlaceholder));
  return entries.filter((entry) => entry != null && entry !== "" && !hasPlaceholder(entry));
}
export function readyText(text, label = "Text") {
  if (hasPlaceholder(text)) { warnSkipped(label, [text]); return ""; }
  return typeof text === "string" ? text.trim() : "";
}
