import {
  CompressOutlined,
  CopyOutlined,
  SkinOutlined,
} from "@ant-design/icons";
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
import { getRandomColor } from "../../common/utils";
import Space from "../space/Space";

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
  onClick?: () => void;
}

export const Code: React.FC<CodeProps> = (props) => {
  const { codeString, fileName, width = 900, onClick } = props;
  const [, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const [stateTheme, setTheme] = useState<string>("anOldHope");
  const [stateColor, setColor] = useState<string>("#00b56d");

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
        backgroundColor: stateColor,
        width,
        position: "relative",
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
        }}
      >
        {contextHolder}
        <div>{fileName}</div>
        <Space size={12}>
          <CompressOutlined
            style={{ fontSize: 14, marginTop: 3 }}
            title="查看示例"
            onClick={onClick}
          />
          <SkinOutlined
            style={{ fontSize: 14, marginTop: 3 }}
            title="换肤"
            onClick={() => setColor(getRandomColor())}
          />
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
              border: "1px solid #00000060",
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
        </Space>
      </div>
      <div style={{ maxHeight: 600, overflow: "auto" }}>
        <SyntaxHighlighter
          language="javascript"
          style={themeMap.get(stateTheme)}
          showLineNumbers={true}
          wrapLongLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
