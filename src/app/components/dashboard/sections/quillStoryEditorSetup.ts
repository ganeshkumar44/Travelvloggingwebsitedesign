import Quill from "quill";

const MAX_TABLE_DIM = 20;

/** Builds an HTML table for the Quill table embed (used by the create-story picker). */
export function buildStoryTableHtml(rows: number, cols: number): string {
  const r = Math.min(Math.max(1, Math.floor(rows)), MAX_TABLE_DIM);
  const c = Math.min(Math.max(1, Math.floor(cols)), MAX_TABLE_DIM);
  let body = "<tbody>";
  for (let i = 0; i < r; i++) {
    body += "<tr>";
    for (let j = 0; j < c; j++) {
      body +=
        '<td style="border:1px solid #ccc;padding:8px;min-width:48px"><br></td>';
    }
    body += "</tr>";
  }
  body += "</tbody>";
  return `<table class="story-quill-table" style="width:100%;border-collapse:collapse">${body}</table>`;
}

const BlockEmbed = Quill.import("blots/block/embed") as any;

class TableEmbed extends BlockEmbed {
  static blotName = "tableEmbed";

  static tagName = "div";

  static className = "ql-table-embed";

  static create(value?: unknown) {
    const node = super.create(value) as HTMLElement;
    const html =
      typeof value === "string" && value.trim().length > 0
        ? String(value)
        : buildStoryTableHtml(2, 2);
    node.innerHTML = html;
    return node;
  }

  static value(node: HTMLElement) {
    return node.innerHTML;
  }
}

let registered = false;

export function registerStoryQuillTableEmbed(): void {
  if (registered) return;
  Quill.register(TableEmbed, true);
  registered = true;
}
