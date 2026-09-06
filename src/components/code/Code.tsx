import { useEffect, useState } from "react";
import { Button, Input, message, Select, Tooltip } from "antd";
import { CopyOutlined, EyeInvisibleOutlined, LockOutlined, PicRightOutlined, UnlockOutlined } from "@ant-design/icons";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useCopyToClipboard } from "../../hooks/useCopyToclipboard";
import { useCodeConfigStore } from "./store";

interface CodeProps {
  id: string;
  fileName?: string;
  codeString: string;
  onClick?: () => void;
}

export const Code: React.FC<CodeProps> = ({ codeString, id, fileName: initialFileName, onClick }) => {
  const [, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const { configList, updateConfig } = useCodeConfigStore();
  const [renaming, setRenaming] = useState(false);
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(codeString);
  const config = configList.find((item) => item.id === id);
  const fileName = config?.fileName || initialFileName || "example.ts";
  const theme = config?.theme || "vs-light";

  useEffect(() => {
    setValue(codeString);
    setEditable(false);
    setRenaming(false);
  }, [codeString, id]);

  const handleMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  const copyCode = async () => {
    try {
      await copy(value);
      messageApi.success("代码已复制");
    } catch {
      messageApi.error("复制失败，请手动选择代码复制");
    }
  };

  return (
    <div className="code-panel">
      {contextHolder}
      <div className="code-toolbar">
        {renaming ? <Input autoFocus size="small" aria-label="代码文件名" value={fileName} onChange={(event) => updateConfig({ ...config, id, fileName: event.target.value })} onPressEnter={() => setRenaming(false)} onBlur={() => setRenaming(false)} /> : <button className="code-filename" title="双击修改文件名" onDoubleClick={() => setRenaming(true)}>{fileName}</button>}
        <div className="code-actions">
          <Tooltip title={editable ? "切换为只读" : "编辑代码（仅本次预览）"}>
            <Button type="text" size="small" aria-label={editable ? "切换为只读" : "编辑代码"} icon={editable ? <UnlockOutlined /> : <LockOutlined />} onClick={() => setEditable(!editable)} />
          </Tooltip>
          <Tooltip title="切换缩略图">
            <Button type="text" size="small" aria-label="切换缩略图" icon={<PicRightOutlined />} onClick={() => updateConfig({ ...config, id, minimap: !config?.minimap })} />
          </Tooltip>
          {onClick && <Button type="text" size="small" aria-label="收起代码" icon={<EyeInvisibleOutlined />} onClick={onClick} />}
          <Select aria-label="编辑器主题" size="small" value={theme} onChange={(nextTheme) => updateConfig({ ...config, id, theme: nextTheme })} options={[{ label: "浅色", value: "vs-light" }, { label: "深色", value: "vs-dark" }, { label: "高对比", value: "hc-black" }]} />
          <Tooltip title="复制代码">
            <Button type="text" size="small" aria-label="复制代码" icon={<CopyOutlined />} onClick={copyCode} />
          </Tooltip>
        </div>
      </div>
      <div className="code-editor">
        <MonacoEditor width="100%" height="100%" language={fileName.endsWith(".js") ? "javascript" : "typescript"} onMount={handleMount} value={value} onChange={(nextValue) => setValue(nextValue || "")} theme={theme}
          loading={<div className="code-fallback">
            <p>正在连接编辑器资源 · 可先阅读或复制源码</p>
            <pre>
              <code>{value}</code>
            </pre>
          </div>}
          options={{ fontSize: 12, lineHeight: 21, padding: { top: 16 }, scrollBeyondLastLine: false, readOnly: !editable, minimap: { enabled: config?.minimap || false }, overviewRulerBorder: false, automaticLayout: true, scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 } }}
        />
      </div>
    </div>
  );
};
