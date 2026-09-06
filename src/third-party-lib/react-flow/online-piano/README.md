# Web Audio 在线钢琴

通过振荡器和增益包络合成简单琴音，无需音频文件。

## 交互指南

1. 点击琴键播放对应音符。
2. 使用键盘 A、S、D、F、G、H、J、K 演奏。
3. 观察琴键按下反馈和约一秒的声音衰减。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-flow/online-piano/index";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `keys` | Record | 键名到频率的映射 |
| `OscillatorNode` | Web Audio | 生成 sine 波形 |
| `GainNode` | Web Audio | 控制音量包络 |

## 使用边界

需要浏览器支持 AudioContext，并可能要求先点击页面以允许声音。黑键是装饰元素，当前只实现八个白键音符。

## 源码位置

- 演示入口：`src/third-party-lib/react-flow/online-piano/index.tsx`
- 相关实现：`src/third-party-lib/react-flow/online-piano`
