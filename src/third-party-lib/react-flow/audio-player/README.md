# React Flow 音频播放

把 Web Audio 振荡器、音量和输出节点映射为可编辑的音频连接图。

## 交互指南

1. 查看初始振荡器 → 音量 → 输出链路。
2. 调整节点内的频率、波形和音量控件。
3. 添加节点并拖动连接点；删除连线观察音频图同步断开。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-flow/audio-player/AudioPlayer";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `osc` | 节点类型 | 振荡器，包含 frequency 与 type |
| `volume` | 节点类型 | 增益节点，包含 gain |
| `out` | 节点类型 | 音频输出 |
| `connect / disconnect` | function | 同步画布连接与音频连接 |

## 使用边界

需要浏览器支持 Web Audio；播放可能需要先进行用户交互。节点与连接状态是演示数据，尚未提供导出和保存功能。

## 源码位置

- 演示入口：`src/third-party-lib/react-flow/audio-player/AudioPlayer.tsx`
- 相关实现：`src/third-party-lib/react-flow/audio-player`
