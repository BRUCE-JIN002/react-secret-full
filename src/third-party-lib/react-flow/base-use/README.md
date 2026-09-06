# React Flow 基础使用

演示自定义节点、连线、连线删除、缩放控件和小地图。

## 交互指南

1. 拖动节点改变位置。
2. 从节点连接点拖出新连线。
3. 点击连线上的 × 删除；点击添加节点创建新节点。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-flow/base-use/FlowBase";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `nodes / edges` | 数组 | 图的受控节点和连线数据 |
| `onNodesChange / onEdgesChange` | function | 处理图编辑 |
| `onConnect` | function | 连接两个端点 |
| `nodeTypes / edgeTypes` | 映射 | 注册自定义节点和连线 |

## 使用边界

图数据仅存在页面状态中。React Flow 父容器必须有明确宽高。业务使用时应把类型映射放在组件外以保持引用稳定。

## 源码位置

- 演示入口：`src/third-party-lib/react-flow/base-use/FlowBase.tsx`
- 相关实现：`src/third-party-lib/react-flow/base-use`
