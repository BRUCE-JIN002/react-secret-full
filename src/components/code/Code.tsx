import { useBoolean, useSafeState } from "ahooks";
import { Input, message, Select } from "antd";
import _ from "lodash";
import { useState } from "react";

import {
  CopyOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  PicRightOutlined,
  SkinOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

import { getRandomColor } from "../../common/utils/utils";
import { useCopyToClipboard } from "../../hooks/useCopyToclipboard";
import { HooksType } from "../../menu/Menu";
import { ConfigListItem, useCodeConfigStore } from "./store";

const intialOption = ["vs-light", "vs-dark", "hc-black"];

const getSelectOptions = () =>
  intialOption.map((theme) => ({ label: theme, value: theme }));

interface CodeProps {
  id: HooksType | string;
  fileName?: string;
  codeString: string;
  onClick?: () => void;
}

export const Code: React.FC<CodeProps> = (props) => {
  const { codeString, id, onClick } = props;
  const [, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const { configList, updateConfig } = useCodeConfigStore();
  const [isEdit, setIsEdit] = useSafeState(false);
  const [isEditable, setIsEditable] = useBoolean(false);
  const [randomColor, setRandomColor] = useState<string | undefined>(
    () => configList.find((l) => l.id === id)?.skinColor
  );

  const persistConfig = _.assign(
    configList.find((l) => l.id === id),
    { id }
  );

  const { skinColor, theme, fileName }: ConfigListItem = {
    skinColor: "#00b56d",
    theme: "vs-dark",
    fileName: props.fileName,
    ...persistConfig,
  };

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "复制成功！",
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "复制失败！",
        });
      });
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  return (
    <div
      style={{
        border: "1px solid #00000050",
        borderRight: "none",
        color: "rgba(0,0,0, 0.75)",
        backgroundColor: skinColor,
        position: "relative",
        width: "100%",
        transition: "all 0.3s ease",
      }}
    >
      {contextHolder}
      <div className="flex items-center h-4 text-[12px] gap-3 m-[4px]">
        <div
          onDoubleClick={() => setIsEdit(true)}
          style={{ marginRight: "auto" }}
        >
          {isEdit ? (
            <Input
              autoFocus={true}
              size="small"
              value={fileName}
              onChange={(e) => {
                const nameValue =
                  e.target.value !== "" ? e.target.value : undefined;
                updateConfig({
                  ...persistConfig,
                  fileName: nameValue,
                });
              }}
              onPressEnter={() => setIsEdit(false)}
              onBlur={() => setIsEdit(false)}
              style={{ height: 21 }}
            />
          ) : (
            <div
              style={{
                boxShadow: fileName
                  ? ""
                  : `inset -5px -5px 10px rgba(0, 0, 0, 0.1), 
                  inset 5px 5px 10px rgba(0, 0, 0, 0.1)`,
              }}
              className="text-sm h-[18px] rounded min-w-24"
            >
              {fileName}
            </div>
          )}
        </div>
        {isEditable ? (
          <UnlockOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            onClick={() => setIsEditable.toggle()}
            title="编辑模式"
          />
        ) : (
          <LockOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            onClick={() => setIsEditable.toggle()}
            title="只读模式"
          />
        )}
        {onClick && (
          <EyeInvisibleOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="收起代码"
            onClick={onClick}
          />
        )}
        <PicRightOutlined
          style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
          title="缩略图"
          onClick={() => {
            updateConfig({
              ...persistConfig,
              minimap: !persistConfig.minimap,
            });
          }}
        />
        <SkinOutlined
          style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
          title="换肤"
          onClick={() => {
            const color = getRandomColor();
            setRandomColor(color);
            updateConfig({
              ...persistConfig,
              skinColor: color,
            });
          }}
        />
        <Select
          showSearch
          size="small"
          defaultValue={theme}
          placeholder="Select a theme"
          optionFilterProp="children"
          listItemHeight={10}
          onChange={(value) => {
            updateConfig({
              ...persistConfig,
              theme: value,
            });
          }}
          style={{
            border: "1px solid #00000060",
            borderRadius: 4,
            height: 18,
            backgroundColor: randomColor,
          }}
          filterOption={filterOption}
          options={getSelectOptions()}
        />
        <span onClick={handleCopy(codeString)}>
          <span style={{ margin: "0px 5px", cursor: "pointer" }}>复制代码</span>
          <CopyOutlined style={{ marginRight: 8 }} />
        </span>
      </div>
      <MonacoEditor
        width={"100%"}
        height={"calc(100vh - 24px)"}
        language={
          persistConfig.fileName?.endsWith("js") ? "javascript" : "typescript"
        }
        onMount={handleEditorMount}
        value={codeString}
        theme={theme}
        options={{
          fontSize: 14,
          scrollBeyondLastLine: false,
          readOnly: !isEditable,
          minimap: {
            enabled: persistConfig.minimap,
            size: "proportional",
          },
          overviewRulerBorder: false,
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
};
