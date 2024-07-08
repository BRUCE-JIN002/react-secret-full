import {
  CompressOutlined,
  CopyOutlined,
  ExpandOutlined,
  EyeInvisibleOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  anOldHope,
  gradientDark,
  solarizedDark,
  hopscotch,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useCopyToClipboard } from "../../hooks/useCopyToclipboard/useCopyToclipboard";
import { Input, Select, message } from "antd";
import { getRandomColor } from "../../common/utils/utils";
import { ConfigListItem, useCodeConfigStore } from "./store";
import { HooksType } from "../../menu/Menu";
import { useSafeState } from "ahooks";
import _ from "lodash";

const intialOption = [
  "anOldHope",
  "gradientDark",
  "solarizedDark",
  "hopscotch",
];

const themeMap = new Map<string, Record<string, React.CSSProperties>>([
  ["anOldHope", anOldHope],
  ["hopscotch", hopscotch],
  ["gradientDark", gradientDark],
  ["solarizedDark", solarizedDark],
]);

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

  const persistConfig = _.assign(
    { id },
    configList.find((l) => l.id === id)
  );

  const { skinColor, theme, expand, fileName }: ConfigListItem = {
    skinColor: "#00b56d",
    theme: "anOldHope",
    expand: false,
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

  return (
    <div
      style={{
        border: "1px solid #00000050",
        borderRadius: 8,
        paddingBottom: 8,
        color: "rgba(0,0,0, 0.75)",
        backgroundColor: skinColor,
        position: "relative",
        width: expand ? "98%" : width,
        maxHeight: "calc(100vh - 10px)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {contextHolder}
      <div
        style={{
          display: "flex",
          height: 16,
          fontSize: 12,
          alignItems: "center",
          gap: 8,
          margin: 4,
        }}
      >
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
                marginLeft: 4,
                fontSize: 14,
                height: 18,
                borderRadius: 4,
                padding: "0 4px",
                minWidth: 100,
                boxShadow: fileName
                  ? ""
                  : `inset -5px -5px 10px rgba(0, 0, 0, 0.1), 
                  inset 5px 5px 10px rgba(0, 0, 0, 0.1)`,
              }}
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
                expand: false,
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
                expand: true,
              })
            }
          />
        )}
        <SkinOutlined
          style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
          title="换肤"
          onClick={() =>
            updateConfig({
              ...persistConfig,
              skinColor: getRandomColor(),
            })
          }
        />
        <Select
          showSearch
          size="small"
          defaultValue={theme}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={(value) => {
            updateConfig({
              ...persistConfig,
              theme: value,
            });
          }}
          style={{
            border: "1px solid #00000060",
            borderRadius: 4,
            height: 21,
          }}
          filterOption={filterOption}
          options={getSelectOptions()}
        />
        <span onClick={handleCopy(codeString)}>
          <span style={{ margin: "0px 8px", cursor: "pointer" }}>复制代码</span>
          <CopyOutlined />
        </span>
      </div>
      <div style={{ maxHeight: "calc(100vh - 50px)", overflow: "auto" }}>
        <SyntaxHighlighter
          language="javascript"
          style={themeMap.get(theme)}
          showLineNumbers={true}
          wrapLongLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
