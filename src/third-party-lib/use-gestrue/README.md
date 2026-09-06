# use-gesture 图片轮播

将拖拽手势与弹簧动画组合成可自动播放的图片轮播。

## 交互指南

1. 左右拖动图片体验翻页。
2. 点击底部圆点跳转到指定图片。
3. 等待约三秒观察自动轮播，点击顶部彩色区域查看示例源码。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/use-gestrue/GestureDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `useDrag` | Hook | 读取 movement、direction 和 active |
| `useSprings` | Hook | 驱动每页位移与缩放 |
| `activeIndex` | number | 当前页索引 |
| `pages` | string[] | 示例图片 URL 列表 |

## 使用边界

图片依赖外部网络。组件目前没有对外配置接口，自动轮播间隔在源文件中固定为 3000 毫秒。

## 源码位置

- 演示入口：`src/third-party-lib/use-gestrue/GestureDemo.tsx`
- 相关实现：`src/third-party-lib/use-gestrue`
