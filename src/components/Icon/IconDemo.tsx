import { ConfigProvider, Divider, Radio, RadioChangeEvent, Space } from "antd";
import React, { useEffect, useState } from "react";
import HeartOutlined from "./AntdIcon";
import { IconAdd, IconEmail } from "./Icons";
import { createFromIconfont } from "./createFromIconFont";

const IconFont = createFromIconfont(
  "//at.alicdn.com/t/c/font_3078386_jfmtii0wd1.js"
);

const IconFontCodesList: string[] = [
  "icon-add-circle",
  "icon-arrow-up-circle",
  "icon-xiangyoujiantou",
  "icon-xiangyou3",
  "icon-xiangyoujiantou1",
  "icon-arrow-down",
  "icon-browse",
  "icon-bottom",
  "icon-attachment",
  "icon-code",
  "icon-file-add",
  "icon-fullscreen-shrink",
  "icon-lock",
  "icon-fullscreen-expand",
  "icon-pdf",
  "icon-meinv",
  "icon-xingzhuang-sanjiaoxing",
  "icon-15tianwuliyoutuihuo",
  "icon-shoujiapp",
  "icon-xiazai1",
  "icon-xiazai",
  "icon-huidingbu",
  "icon-520jiashouhouwangdian24px",
  "icon-7tianbaotui",
  "icon-tian",
  "icon-fangdajing1",
  "icon-rengongfuwu",
  "icon-liwu",
  "icon-shouhoufuwu",
];

const ColoredIconFontCodeSet: string[] = [
  "icon-a-045_dingwei",
  "icon-a-045_jianzhu-21",
  "icon-a-045_gengduo",
  "icon-a-045_liwu",
  "icon-a-045_liaotian",
  "icon-a-045_lajitong",
  "icon-a-045_shangdian-20",
  "icon-a-045_shuben",
  "icon-a-045_xiaoxi",
  "icon-a-045_shezhi-12",
  "icon-a-045_tianqi",
  "icon-a-045_wenjian",
  "icon-a-045_zhaopian",
];

const enum Size {
  Small = 16,
  Default = 20,
  Large = 28,
}

const optionsWithDisabled = [
  { label: "小", value: Size.Small },
  { label: "中", value: Size.Default },
  { label: "大", value: Size.Large },
];

const IconDemo: React.FC = () => {
  const [stateSize, setSize] = useState<Size>(Size.Default);
  const [stateColorSet, setColorSet] = useState([
    "red",
    "gold",
    "blue",
    "green",
    "magenta",
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setColorSet((pre) => {
        const tail = pre[pre.length - 1];
        const rest = pre.slice(0, pre.length - 1);
        return [tail, ...rest];
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setSize(value);
  };

  return (
    <div
      style={{
        width: "75%",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 25,
        border: "1px solid #e0e0e0",
      }}
    >
      <Radio.Group
        options={optionsWithDisabled}
        value={stateSize}
        onChange={onChange}
        optionType="button"
        buttonStyle="solid"
        size="small"
      />
      <div className="layout">
        <ConfigProvider space={{ size: stateSize }}>
          <Divider orientation="left">
            <span>通过Antd封装svg图标</span>
          </Divider>
          <div>
            <Space direction="horizontal" wrap>
              {stateColorSet.map((color, index) => (
                <HeartOutlined
                  key={`${color}-${index}`}
                  style={{ color: color, fontSize: stateSize }}
                />
              ))}
            </Space>
          </div>
          <Divider orientation="left">
            <span>通过svg封装图标</span>
          </Divider>
          <div>
            <Space direction="horizontal" wrap>
              <IconAdd spin={true} style={{ fontSize: stateSize }} />
              <IconEmail style={{ fontSize: stateSize }} />
              <IconEmail style={{ color: "blue", fontSize: stateSize }} />
              <IconAdd
                spin={true}
                style={{ fontSize: stateSize, color: "green" }}
              />
            </Space>
          </div>
          <Divider orientation="left">
            <span>封装IconFont单色图标</span>
          </Divider>
          <div>
            <Space direction="horizontal" wrap>
              {IconFontCodesList.map((icon) => (
                <span title={icon} key={icon}>
                  <IconFont type={`${icon}`} size={`${stateSize}px`} />
                </span>
              ))}
            </Space>
          </div>
          <Divider orientation="left">
            <span>封装IconFont彩色图标</span>
          </Divider>
          <div>
            <Space direction="horizontal" wrap>
              {ColoredIconFontCodeSet.map((icon) => (
                <span title={icon} key={icon}>
                  <IconFont type={`${icon}`} size={`${stateSize * 1.2}px`} />
                </span>
              ))}
            </Space>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default IconDemo;
