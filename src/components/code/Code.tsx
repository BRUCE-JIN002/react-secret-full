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
import { useCopyToClipboard } from "../../hooks/useCopyToclipboard";
import { Select, message } from "antd";
import { useState } from "react";
import { getRandomColor } from "../../common/utils";
import { useToggle } from "ahooks";

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
  const [isFullScreen, setIsFullScreen] = useToggle<boolean>(false);

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
        backgroundColor: stateColor,
        position: "relative",
        width: isFullScreen ? "98%" : width,
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
        <div style={{ marginRight: "auto" }}>{fileName}</div>
        {onClick && (
          <EyeInvisibleOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="收起代码"
            onClick={onClick}
          />
        )}
        {isFullScreen ? (
          <CompressOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="退出全屏"
            onClick={() => setIsFullScreen.toggle()}
          />
        ) : (
          <ExpandOutlined
            style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
            title="全屏查看"
            onClick={() => setIsFullScreen.toggle()}
          />
        )}
        <SkinOutlined
          style={{ fontSize: 14, marginTop: 2, cursor: "pointer" }}
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
          <span style={{ margin: "0px 8px", cursor: "pointer" }}>复制代码</span>
          <CopyOutlined />
        </span>
      </div>
      <div style={{ maxHeight: "calc(100vh - 50px)", overflow: "auto" }}>
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
