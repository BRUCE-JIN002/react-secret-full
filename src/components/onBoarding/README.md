# OnBoarding 漫游式引导

通过选择器定位页面元素，结合遮罩和浮层展示分步操作引导。

## 交互指南

1. 进入演示后按引导逐步浏览目标按钮。
2. 结束后点击重新演示再次运行。
3. Link Button 可通过 ref.reStart() 重启。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/onBoarding/Demo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `steps` | array | 有序的步骤配置 |
| `selector` | () => HTMLElement | null | 定位当前步骤的目标 |
| `renderContent` | () => ReactNode | 渲染步骤说明 |
| `placement` | string | 浮层方位 |
| `ref.reStart` | () => void | 重新开始引导 |

## 使用边界

selector 必须在步骤显示时能找到目标。示例有外部图片，需要网络。遮罩覆盖页面属于此示例的预期效果。

## 源码位置

- 演示入口：`src/components/onBoarding/Demo.tsx`
- 相关实现：`src/components/onBoarding`
