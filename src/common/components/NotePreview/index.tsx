import React from "react";
import { marked } from "marked";

interface NotePreviewProps {
  children?: string;
  className?: string;
  style?: React.CSSProperties;
}

// 内联样式
const notePreviewStyles: React.CSSProperties = {
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  padding: "0",
  boxSizing: "border-box",
  backgroundColor: "#ffffff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  lineHeight: "1.6",
  color: "#333",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const markdownContentStyles: React.CSSProperties = {
  margin: "0 auto",
  padding: "40px",
  height: "100vh",
  overflow: "auto",
  boxSizing: "border-box",
};

// 添加全局样式到 head
const addMarkdownStyles = () => {
  const styleId = "markdown-preview-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .markdown-content h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 2rem 0 1rem 0;
      color: #1a1a1a;
      border-bottom: 3px solid #007acc;
      padding-bottom: 0.5rem;
    }
    .markdown-content h2 {
      font-size: 2rem;
      font-weight: 600;
      margin: 1.8rem 0 0.8rem 0;
      color: #2c3e50;
      border-bottom: 2px solid #e1e8ed;
      padding-bottom: 0.3rem;
    }
    .markdown-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 1.5rem 0 0.6rem 0;
      color: #34495e;
    }
    .markdown-content h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 1.2rem 0 0.5rem 0;
      color: #34495e;
    }
    .markdown-content p {
      margin: 1rem 0;
      line-height: 1.7;
    }
    .markdown-content ul, .markdown-content ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    .markdown-content li {
      margin: 0.5rem 0;
      line-height: 1.6;
    }
    .markdown-content code {
      background-color: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 4px;
      padding: 0.2rem 0.4rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
      color: #e83e8c;
    }
    .markdown-content pre {
      background-color: #f8f9fa;
      border: 1px solid #e1e8ed;
      border-radius: 6px;
      padding: 20px 24px;
      overflow-x: auto;
      margin: 1.5rem 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
      line-height: 1.5;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .markdown-content pre code {
      background: none;
      border: none;
      padding: 0;
      color: #333;
    }
    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.95em;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    .markdown-content th,
    .markdown-content td {
      border: 1px solid #ddd;
      padding: 12px 15px;
      text-align: left;
    }
    .markdown-content th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #495057;
      border-bottom: 2px solid #007acc;
    }
    .markdown-content tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    .markdown-content tr:hover {
      background-color: #e9ecef;
    }
    .markdown-content blockquote {
      border-left: 4px solid #007acc;
      margin: 1.5rem 0;
      padding: 1rem 1.5rem;
      background-color: #f8f9fa;
      color: #6c757d;
      font-style: italic;
    }
    .markdown-content strong {
      font-weight: 600;
      color: #2c3e50;
    }
    .markdown-content em {
      font-style: italic;
      color: #34495e;
    }
    .markdown-content a {
      color: #007acc;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-bottom-color 0.2s ease;
    }
    .markdown-content a:hover {
      border-bottom-color: #007acc;
    }
    
    /* 代码高亮样式 */
    .markdown-content pre code {
      display: block;
      padding: 0;
      background: none;
      border: none;
      color: #333;
    }
    
    .markdown-content pre.code-highlighted {
      background-color: #2d3748 !important;
      border: 1px solid #4a5568 !important;
      padding: 20px 24px !important;
    }
    
    .markdown-content .language-typescript,
    .markdown-content .language-javascript,
    .markdown-content .language-ts,
    .markdown-content .language-js {
      color: #e2e8f0 !important;
    }
    
    .markdown-content .language-typescript .keyword,
    .markdown-content .language-javascript .keyword,
    .markdown-content .language-ts .keyword,
    .markdown-content .language-js .keyword {
      color: #f56565;
      font-weight: bold;
    }
    
    .markdown-content .language-typescript .string,
    .markdown-content .language-javascript .string,
    .markdown-content .language-ts .string,
    .markdown-content .language-js .string {
      color: #68d391;
    }
    
    .markdown-content .language-typescript .comment,
    .markdown-content .language-javascript .comment,
    .markdown-content .language-ts .comment,
    .markdown-content .language-js .comment {
      color: #a0aec0;
      font-style: italic;
    }
    
    .markdown-content .language-typescript .function,
    .markdown-content .language-javascript .function,
    .markdown-content .language-ts .function,
    .markdown-content .language-js .function {
      color: #63b3ed;
    }
    
    .markdown-content .language-typescript .number,
    .markdown-content .language-javascript .number,
    .markdown-content .language-ts .number,
    .markdown-content .language-js .number {
      color: #f6ad55;
    }
    
    /* 自定义滚动条样式 */
    .markdown-content::-webkit-scrollbar {
      width: 8px;
    }

    .markdown-content::-webkit-scrollbar {
      height: 0;
    }
    
    .markdown-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .markdown-content::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    
    .markdown-content::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    
    /* 代码块内的滚动条样式 */
    .markdown-content pre::-webkit-scrollbar {
      height: 6px;
    }
    
    .markdown-content pre::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    .markdown-content pre::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }
    
    .markdown-content pre::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `;
  document.head.appendChild(style);
};

export default function NotePreview({
  children = "",
  className = "",
  style = {},
}: NotePreviewProps) {
  const combinedStyles = { ...notePreviewStyles, ...style };
  const [processedHtml, setProcessedHtml] = React.useState<string>("");

  React.useEffect(() => {
    addMarkdownStyles();
  }, []);

  // 简单的语法高亮
  const highlightCode = (code: string, language: string) => {
    if (
      !language ||
      !["typescript", "javascript", "ts", "js"].includes(language)
    ) {
      // 对于非 JS/TS 代码，进行 HTML 转义
      return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    // 先进行 HTML 转义，然后添加高亮
    let highlightedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    // 添加语法高亮
    highlightedCode = highlightedCode
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|class|interface|type|import|export|from|as|async|await|try|catch|finally)\b/g,
        '<span class="keyword">$1</span>'
      )
      .replace(
        /(&#39;|&quot;|`)((?:\\.|(?!\1)[^\\])*?)\1/g,
        '<span class="string">$1$2$1</span>'
      )
      .replace(
        /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        '<span class="comment">$1</span>'
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
      .replace(
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
        '<span class="function">$1</span>'
      );

    return highlightedCode;
  };

  React.useEffect(() => {
    const processMarkdown = async (markdown: string) => {
      try {
        // 配置 marked 选项
        marked.setOptions({
          breaks: true,
          gfm: true,
        });

        let html = await marked(markdown);

        // 后处理：添加代码高亮
        html = html.replace(
          /<code class="language-(\w+)">([\s\S]*?)<\/code>/g,
          (match, language, code) => {
            // 解码 HTML 实体
            const decodedCode = code
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&amp;/g, "&")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");

            // 只对支持的语言进行高亮
            if (["typescript", "javascript", "ts", "js"].includes(language)) {
              const highlightedCode = highlightCode(decodedCode, language);
              return `<code class="language-${language}">${highlightedCode}</code>`;
            }

            // 对于不支持的语言，重新进行 HTML 转义
            const escapedCode = decodedCode
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");

            return `<code class="language-${language}">${escapedCode}</code>`;
          }
        );

        // 为带语法高亮的代码块添加特殊样式
        html = html.replace(
          /<pre><code class="language-(typescript|javascript|ts|js)">/g,
          '<pre class="code-highlighted"><code class="language-$1">'
        );

        return html;
      } catch (error) {
        console.error("Markdown processing error:", error);
        return markdown.replace(/\n/g, "<br>");
      }
    };

    processMarkdown(children).then(setProcessedHtml);
  }, [children]);

  return (
    <div className={className} style={combinedStyles}>
      <div
        className="markdown-content"
        style={markdownContentStyles}
        dangerouslySetInnerHTML={{
          __html: processedHtml,
        }}
      />
    </div>
  );
}
