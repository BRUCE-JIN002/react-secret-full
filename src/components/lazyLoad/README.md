# Lazyload 懒加载

通过 IntersectionObserver 在内容接近视口时渲染，配合占位骨架降低首屏开销。

## 交互指南

1. 在预览区域向下滚动到占位文字底部。
2. 观察图片接近视口时替换骨架。
3. 调整 offset 比较提前加载距离。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/lazyLoad/LazyloadDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `offset` | number / string | 观察区域 rootMargin，默认 0；本例 250 |
| `placeholder` | ReactNode | 内容未可见时的占位 |
| `width / height` | number / string | 占位尺寸 |
| `onContentVisible` | () => void | 内容首次可见时回调 |

## 使用边界

示例图片来自外部站点，网络不可用时不会显示。首次相交后停止观察；离开视口不会卸载内容。

## 源码位置

- 演示入口：`src/components/lazyLoad/LazyloadDemo.tsx`
- 相关实现：`src/components/lazyLoad`
