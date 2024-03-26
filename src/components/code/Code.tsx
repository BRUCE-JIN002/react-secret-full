import { CopyOutlined } from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  anOldHope,
  gradientDark,
  solarizedDark,
  hopscotch,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useCopyToClipboard } from "../../hooks/useCopyToclipboard";
import { Select, message } from "antd";
import { useState } from "react";

const intialOption = [
  "anOldHope",
  "gradientDark",
  "solarizedDark",
  "hopscotch",
];

const themeMap = new Map<string, { [key: string]: React.CSSProperties }>([
  ["anOldHope", anOldHope],
  ["hopscotch", hopscotch],
  ["gradientDark", gradientDark],
  ["solarizedDark", solarizedDark],
]);

const getSelectOptions = () =>
  intialOption.map((theme) => ({ label: theme, value: theme }));

getSelectOptions();
interface CodeProps {
  codeString: string;
  fileName?: string;
  width?: number | string;
}

export const Code: React.FC<CodeProps> = (props) => {
  const { codeString, fileName, width = 900 } = props;
  const [, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const [stateTheme, setTheme] = useState<string>("anOldHope");

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
        color: "#00000090",
        backgroundColor: "#00b56d",
      }}
    >
      <div
        style={{
          fontSize: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 8,
          height: 16,
          gap: 10,
          padding: "4px 12px",
          marginBottom: -10,
          cursor: "pointer",
          width: width,
        }}
      >
        {contextHolder}
        <div>{fileName}</div>
        <div>
          <Select
            showSearch
            size="small"
            defaultValue={stateTheme}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(value) => {
              setTheme(value);
            }}
            style={{
              border: "1px solid #00000050",
              borderRadius: 4,
              height: 21,
            }}
            filterOption={filterOption}
            options={getSelectOptions()}
          />
          <span onClick={handleCopy(codeString)}>
            <span style={{ margin: "0px 8px" }}>复制代码</span>
            <CopyOutlined />
          </span>
        </div>
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={themeMap.get(stateTheme)}
        showLineNumbers={true}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
