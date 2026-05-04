/** Visible text from HTML (for validation and counts). */
export function stripHtmlToPlainText(html: string): string {
  const raw = (html ?? "").trim();
  if (!raw) return "";
  if (typeof document === "undefined") {
    return raw
      .replace(/<[^>]+>/g, " ")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  const div = document.createElement("div");
  div.innerHTML = raw;
  const text = (div.textContent || div.innerText || "").replace(/\u00a0/g, " ");
  return text.replace(/\s+/g, " ").trim();
}
