# useFullscreen

一个用于管理元素全屏状态的 React Hook，提供进入和退出全屏模式的功能。

## 功能特性

- ✅ **全屏控制**: 支持元素进入和退出全屏模式
- ✅ **状态监听**: 实时监听全屏状态变化
- ✅ **事件回调**: 支持进入和退出全屏的回调函数
- ✅ **兼容性检测**: 自动检测浏览器是否支持全屏 API
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **多目标支持**: 支持多种类型的目标元素

## 基本用法

```typescript
import useFullscreen from "./useFullscreen";

function FullscreenComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isFullscreen, isEnabled, enterFullscreen, exitFullscreen } =
    useFullscreen(videoRef, {
      onEnter: () => console.log("进入全屏"),
      onExit: () => console.log("退出全屏"),
    });

  return (
    <div>
      <video ref={videoRef} src="video.mp4" controls />
      <div>
        <span>全屏状态: {isFullscreen ? "是" : "否"}</span>
        <span>浏览器支持: {isEnabled ? "是" : "否"}</span>
      </div>
      <button onClick={enterFullscreen} disabled={!isEnabled}>
        进入全屏
      </button>
      <button onClick={exitFullscreen} disabled={!isEnabled}>
        退出全屏
      </button>
    </div>
  );
}
```

## 高级用法

### 图片查看器全屏

```typescript
function ImageViewer({ imageUrl }: { imageUrl: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(
    imageRef,
    {
      onEnter: () => {
        document.body.style.backgroundColor = "#000";
      },
      onExit: () => {
        document.body.style.backgroundColor = "";
      },
    }
  );

  return (
    <div className="image-viewer">
      <img
        ref={imageRef}
        src={imageUrl}
        alt="预览图片"
        style={{
          maxWidth: "100%",
          cursor: "pointer",
        }}
        onClick={enterFullscreen}
      />
      {isFullscreen && (
        <button
          onClick={exitFullscreen}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          退出全屏
        </button>
      )}
    </div>
  );
}
```

### 游戏容器全屏

```typescript
function GameContainer() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(
    gameRef,
    {
      onEnter: () => {
        setGameStarted(true);
        // 隐藏鼠标光标
        if (gameRef.current) {
          gameRef.current.style.cursor = "none";
        }
      },
      onExit: () => {
        setGameStarted(false);
        // 恢复鼠标光标
        if (gameRef.current) {
          gameRef.current.style.cursor = "default";
        }
      },
    }
  );

  return (
    <div
      ref={gameRef}
      className={`game-container ${isFullscreen ? "fullscreen" : ""}`}
    >
      {!gameStarted ? (
        <div className="game-menu">
          <h2>游戏标题</h2>
          <button onClick={enterFullscreen}>开始游戏 (全屏)</button>
        </div>
      ) : (
        <div className="game-content">
          <div className="game-ui">
            <button onClick={exitFullscreen}>退出游戏</button>
          </div>
          {/* 游戏内容 */}
        </div>
      )}
    </div>
  );
}
```

### 演示文稿全屏

```typescript
function PresentationViewer() {
  const presentationRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(
    presentationRef,
    {
      onEnter: () => {
        // 进入演示模式
        document.addEventListener("keydown", handleKeyDown);
      },
      onExit: () => {
        // 退出演示模式
        document.removeEventListener("keydown", handleKeyDown);
      },
    }
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        break;
      case "ArrowLeft":
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
        break;
      case "Escape":
        exitFullscreen();
        break;
    }
  };

  return (
    <div ref={presentationRef} className="presentation">
      <div className="slide">{slides[currentSlide]}</div>

      {!isFullscreen && (
        <div className="controls">
          <button onClick={enterFullscreen}>开始演示</button>
        </div>
      )}

      {isFullscreen && (
        <div className="fullscreen-controls">
          <span>
            {currentSlide + 1} / {slides.length}
          </span>
          <button onClick={exitFullscreen}>退出</button>
        </div>
      )}
    </div>
  );
}
```

## API 参考

### useFullscreen(target, options?)

#### 参数

| 参数      | 类型          | 描述             |
| --------- | ------------- | ---------------- |
| `target`  | `BasicTarget` | 要全屏的目标元素 |
| `options` | `Options`     | 配置选项         |

#### BasicTarget 类型

支持多种类型的目标元素：

| 类型                        | 描述           | 示例                                      |
| --------------------------- | -------------- | ----------------------------------------- |
| `RefObject<HTMLElement>`    | React ref 对象 | `useRef<HTMLDivElement>(null)`            |
| `HTMLElement`               | DOM 元素       | `document.getElementById('container')`    |
| `() => HTMLElement \| null` | 返回元素的函数 | `() => document.querySelector('.target')` |

#### Options 配置

| 属性      | 类型         | 描述                 |
| --------- | ------------ | -------------------- |
| `onEnter` | `() => void` | 进入全屏时的回调函数 |
| `onExit`  | `() => void` | 退出全屏时的回调函数 |

#### 返回值

| 属性              | 类型         | 描述                   |
| ----------------- | ------------ | ---------------------- |
| `isFullscreen`    | `boolean`    | 当前是否处于全屏状态   |
| `isEnabled`       | `boolean`    | 浏览器是否支持全屏 API |
| `enterFullscreen` | `() => void` | 进入全屏的函数         |
| `exitFullscreen`  | `() => void` | 退出全屏的函数         |

## 使用场景

### 媒体播放器

```typescript
function MediaPlayer({ src }: { src: string }) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(
    playerRef,
    {
      onEnter: () => {
        // 全屏时自动播放
        setIsPlaying(true);
      },
    }
  );

  return (
    <div ref={playerRef} className="media-player">
      <video src={src} controls={isFullscreen} autoPlay={isPlaying} />

      <div className="player-controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "暂停" : "播放"}
        </button>
        <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
          {isFullscreen ? "退出全屏" : "全屏"}
        </button>
      </div>
    </div>
  );
}
```

### 地图应用

```typescript
function MapViewer() {
  const mapRef = useRef<HTMLDivElement>(null);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(
    mapRef,
    {
      onEnter: () => {
        // 全屏时重新调整地图大小
        setTimeout(() => {
          map.resize();
        }, 100);
      },
    }
  );

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" id="map" />

      <div className="map-controls">
        <button onClick={enterFullscreen}>全屏查看</button>
        {isFullscreen && <button onClick={exitFullscreen}>退出全屏</button>}
      </div>
    </div>
  );
}
```

## 注意事项

1. **用户交互**: 全屏 API 需要用户交互才能触发（如点击事件）
2. **浏览器兼容性**: 不是所有浏览器都支持全屏 API
3. **权限策略**: 某些网站可能被浏览器策略限制全屏功能
4. **样式处理**: 全屏时可能需要调整元素样式
5. **事件清理**: 确保在组件卸载时清理事件监听器

## 浏览器兼容性

| 浏览器  | 支持版本 |
| ------- | -------- |
| Chrome  | 15+      |
| Firefox | 47+      |
| Safari  | 16.4+    |
| Edge    | 12+      |

## 最佳实践

1. **检查支持**: 使用前检查 `isEnabled` 状态
2. **用户体验**: 提供明确的进入/退出全屏按钮
3. **键盘支持**: 支持 ESC 键退出全屏
4. **样式适配**: 为全屏状态设计专门的样式
5. **错误处理**: 处理全屏请求失败的情况

## 依赖

- `screenfull`: 全屏 API 的跨浏览器封装库
- `ahooks`: 提供 useLatest 和 useSafeState

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ❌ 服务端渲染 (需要浏览器环境)
