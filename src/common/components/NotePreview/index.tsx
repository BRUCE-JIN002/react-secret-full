import React, { useMemo } from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
interface NotePreviewProps { children?: string; className?: string; style?: React.CSSProperties }
export default function NotePreview({ children = "", className = "", style }: NotePreviewProps) {
  const html = useMemo(() => sanitizeHtml(marked.parse(children, { async: false, gfm: true }) as string), [children]);
  return <div className={`markdown-content ${className}`} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}
