# Space 间距

统一子元素间距，支持水平、垂直、换行和分割元素。

## 交互指南

1. 切换排列方向。
2. 开关换行与分割线。
3. 使用加减按钮在 10–50 范围内调整间距。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/space/SpaceDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `direction` | horizontal / vertical | 排列方向 |
| `size` | number | 子元素间距 |
| `wrap` | boolean | 是否允许换行 |
| `split` | ReactNode | 插入子元素之间的分隔内容 |

## 使用边界

可以用本目录 ConfigProvider 的 space.size 提供共享间距。示例分割线尺寸是固定的，业务中应按内容调整。

## 源码位置

- 演示入口：`src/components/space/SpaceDemo.tsx`
- 相关实现：`src/components/space`
