import { useSafeState } from "ahooks";
import { ConfigProvider, Input, message, Select } from "antd";
import classNames from "classnames";
import _ from "lodash";
import { useState } from "react";

import {
  CaretDownOutlined,
  CaretRightOutlined,
  CompressOutlined,
  CopyOutlined,
  ExpandOutlined,
  EyeInvisibleOutlined,
  PicRightOutlined,
  SkinOutlined
} from "@ant-design/icons";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

import { getRandomColor } from "../../common/utils/utils";
import { useCopyToClipboard } from "../../hooks/useCopyToclipboard/useCopyToclipboard";
import { HooksType } from "../../menu/Menu";
import { ConfigListItem, useCodeConfigStore } from "./store";

const intialOption = ["vs-light", "vs-dark", "hc-black"];

const getSelectOptions = () =>
  intialOption.map((theme) => ({ label: theme, value: theme }));

interface CodeProps {
  id: HooksType;
  fileName?: string;
  codeString: string;
  width?: number | string;
  onClick?: () => void;
}

export const Code: React.FC<CodeProps> = (props) => {
  const { codeString, width = 900, id, onClick } = props;
  const [, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const { configList, updateConfig } = useCodeConfigStore();
  const [isEdit, setIsEdit] = useSafeState(false);
  const [randomColor, setRandomColor] = useState<string | undefined>(
    () => configList.find((l) => l.id === id)?.skinColor
  );

  const persistConfig = _.assign(
    configList.find((l) => l.id === id),
    { id }
  );

  const { skinColor, theme, expand, fileName, collapse }: ConfigListItem = {
    skinColor: "#00b56d",
    theme: "vs-dark",
    expand: false,
    fileName: props.fileName,
    collapse: true,
    ...persistConfig
  };

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "复制成功！"
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "复制失败！"
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
        borderRadius: 8,
        paddingBottom: collapse ? 8 : 0,
        color: "rgba(0,0,0, 0.75)",
        backgroundColor: skinColor,
        position: "relative",
        width: expand ? "98%" : width,
        maxHeight: "calc(100vh - 10px)",
        transition: "all 0.3s ease-in-out"
      }}
    >
      {contextHolder}
      <div className="flex items-center h-4 text-[12px] gap-3 m-[4px]">
        <div
          className={classNames(
            "flex justify-center items-center text-[12px] py-1 px-[2px] rounded-sm cursor-pointer"
          )}
          onClick={() => {
            updateConfig({
              ...persistConfig,
              collapse: !persistConfig.collapse
            });
          }}
        >
          {collapse ? (
            <CaretDownOutlined title="收起" />
          ) : (
            <CaretRightOutlined title="展开" />
          )}
        </div>
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
                  fileName: nameValue
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
                  inset 5px 5px 10px rgba(0, 0, 0, 0.1)`
              }}
              className="text-sm h-[18px] rounded min-w-24"
            >
              {fileName}
            </div>
          )}
        </div>
        {onClick && (
          <EyeInvisibleOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="收起代码"
            onClick={onClick}
          />
        )}
        {expand ? (
          <CompressOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="退出全屏"
            onClick={() =>
              updateConfig({
                ...persistConfig,
                expand: false
              })
            }
          />
        ) : (
          <ExpandOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="全屏查看"
            onClick={() =>
              updateConfig({
                ...persistConfig,
                expand: true
              })
            }
          />
        )}
        <PicRightOutlined
          style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
          title="缩略图"
          onClick={() => {
            updateConfig({
              ...persistConfig,
              minimap: !persistConfig.minimap
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
              skinColor: color
            });
          }}
        />
        <ConfigProvider
          theme={{
            components: {
              Select: {
                selectorBg: randomColor,
                activeBorderColor: randomColor,
                hoverBorderColor: randomColor,
                colorBorder: randomColor,
                optionActiveBg: `${randomColor}50`,
                optionSelectedBg: randomColor,
                optionHeight: 10,
                optionPadding: 2
              }
            }
          }}
        >
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
                theme: value
              });
            }}
            style={{
              border: "1px solid #00000060",
              borderRadius: 4,
              height: 18,
              backgroundColor: randomColor
            }}
            filterOption={filterOption}
            options={getSelectOptions()}
          />
        </ConfigProvider>
        <span onClick={handleCopy(codeString)}>
          <span style={{ margin: "0px 5px", cursor: "pointer" }}>复制代码</span>
          <CopyOutlined style={{ marginRight: 8 }} />
        </span>
      </div>
      {collapse && (
        <MonacoEditor
          width={"100%"}
          height={"90vh"}
          language={
            persistConfig.fileName?.endsWith("js") ? "javascript" : "typescript"
          }
          onMount={handleEditorMount}
          value={codeString}
          theme={theme}
          options={{
            fontSize: 14,
            scrollBeyondLastLine: false,
            readOnly: true,
            minimap: {
              enabled: persistConfig.minimap,
              size: "proportional"
            },
            overviewRulerBorder: false,
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6
            }
          }}
        />
      )}
    </div>
  );
};
