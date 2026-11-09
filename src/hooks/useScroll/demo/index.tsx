import React, { useState, useRef, useCallback } from "react";
import { useScroll } from "../index";

// 样式常量
const styles = {
  container: {
    width: "100%",
    maxWidth: "min(1000px, 100%)",
    minWidth: 0,
    flexShrink: 1,
    boxSizing: "border-box" as const,
    margin: "0 auto",
    padding: "24px",
    overflowWrap: "break-word",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e2e8f0",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap" as const,
    maxWidth: "100%",
    minWidth: 0,
  },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#3b82f6",
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  scrollArea: {
    width: "100%",
    height: "300px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    overflow: "auto",
    position: "relative" as const,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    width: "150%",
    height: "800px",
    background:
      "linear-gradient(45deg, #f0f9ff 25%, transparent 25%), linear-gradient(-45deg, #f0f9ff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f9ff 75%), linear-gradient(-45deg, transparent 75%, #f0f9ff 75%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
    position: "relative" as const,
  },
  marker: {
    position: "absolute" as const,
    padding: "4px 8px",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
  },
  statusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  statusItem: {
    textAlign: "center" as const,
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  statusValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
  },
  statusLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    marginRight: "8px",
    width: "80px",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    marginRight: "8px",
    backgroundColor: "white",
  },
  eventLog: {
    maxHeight: "150px",
    overflow: "auto",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "12px",
    fontFamily: "monospace",
  },
  eventItem: {
    padding: "4px 0",
    borderBottom: "1px solid #e2e8f0",
    color: "#374151",
  },
};

// 基础滚动控制演示
const BasicScrollDemo = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollState, scrollMethods] = useScroll(scrollAreaRef);
  const [duration, setDuration] = useState(300);
  const [animation, setAnimation] = useState<
    "smooth" | "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
  >("smooth");

  const scrollOptions = { duration, animation };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🎯 基础滚动控制</h3>
      <p style={styles.subtitle}>
        展示 scrollToTop, scrollToBottom, scrollToLeft, scrollToRight 方法
      </p>

      {/* 滚动状态显示 */}
      <div style={styles.statusGrid}>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>{scrollState.x}px</div>
          <div style={styles.statusLabel}>水平位置</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>{scrollState.y}px</div>
          <div style={styles.statusLabel}>垂直位置</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>
            {scrollState.isTop ? "✅" : "❌"}
          </div>
          <div style={styles.statusLabel}>顶部</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>
            {scrollState.isBottom ? "✅" : "❌"}
          </div>
          <div style={styles.statusLabel}>底部</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>
            {scrollState.isLeft ? "✅" : "❌"}
          </div>
          <div style={styles.statusLabel}>左侧</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>
            {scrollState.isRight ? "✅" : "❌"}
          </div>
          <div style={styles.statusLabel}>右侧</div>
        </div>
      </div>

      {/* 动画配置 */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontSize: "14px", color: "#374151" }}>
          动画时长:
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={styles.input}
            min="100"
            max="2000"
            step="100"
          />
          ms
        </label>
        <label style={{ fontSize: "14px", color: "#374151" }}>
          动画类型:
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value as any)}
            style={styles.select}
          >
            <option value="smooth">smooth</option>
            <option value="linear">linear</option>
            <option value="ease">ease</option>
            <option value="ease-in">ease-in</option>
            <option value="ease-out">ease-out</option>
            <option value="ease-in-out">ease-in-out</option>
          </select>
        </label>
      </div>

      {/* 控制按钮 */}
      <div style={styles.buttonGroup}>
        <button
          onClick={() => scrollMethods.scrollToTop(scrollOptions)}
          style={styles.button}
        >
          ⬆️ 滚动到顶部
        </button>
        <button
          onClick={() => scrollMethods.scrollToBottom(scrollOptions)}
          style={styles.button}
        >
          ⬇️ 滚动到底部
        </button>
        <button
          onClick={() => scrollMethods.scrollToLeft(scrollOptions)}
          style={styles.button}
        >
          ⬅️ 滚动到左侧
        </button>
        <button
          onClick={() => scrollMethods.scrollToRight(scrollOptions)}
          style={styles.button}
        >
          ➡️ 滚动到右侧
        </button>
      </div>

      {/* 滚动区域 */}
      <div ref={scrollAreaRef} style={styles.scrollArea}>
        <div style={styles.scrollContent}>
          <div style={{ ...styles.marker, top: "10px", left: "10px" }}>
            顶部左侧 (0, 0)
          </div>
          <div style={{ ...styles.marker, top: "10px", right: "10px" }}>
            顶部右侧
          </div>
          <div style={{ ...styles.marker, bottom: "10px", left: "10px" }}>
            底部左侧
          </div>
          <div style={{ ...styles.marker, bottom: "10px", right: "10px" }}>
            底部右侧
          </div>
          <div
            style={{
              ...styles.marker,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ef4444",
            }}
          >
            中心点 ({Math.round(scrollState.x)}, {Math.round(scrollState.y)})
          </div>
        </div>
      </div>
    </div>
  );
};

// 精确滚动演示
const PreciseScrollDemo = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollState, scrollMethods] = useScroll(scrollAreaRef);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [usePercentage, setUsePercentage] = useState(false);

  const handleScrollTo = () => {
    if (usePercentage) {
      scrollMethods.scrollTo({
        x: `${targetX}%` as any,
        y: `${targetY}%` as any,
      });
    } else {
      scrollMethods.scrollTo({ x: targetX, y: targetY });
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🎯 精确滚动控制</h3>
      <p style={styles.subtitle}>展示 scrollTo 方法，支持像素值和百分比</p>

      {/* 当前位置显示 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>{scrollState.x}px</div>
          <div style={styles.statusLabel}>当前 X 位置</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>{scrollState.y}px</div>
          <div style={styles.statusLabel}>当前 Y 位置</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>
            {scrollState.hasHorizontalScroll ? "✅" : "❌"}
          </div>
          <div style={styles.statusLabel}>水平滚动</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>
            {scrollState.hasVerticalScroll ? "✅" : "❌"}
          </div>
          <div style={styles.statusLabel}>垂直滚动</div>
        </div>
      </div>

      {/* 滚动控制 */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <label style={{ fontSize: "14px", color: "#374151" }}>
            目标 X:
            <input
              type="number"
              value={targetX}
              onChange={(e) => setTargetX(Number(e.target.value))}
              style={styles.input}
              min="0"
              max={usePercentage ? 100 : 1000}
            />
            {usePercentage ? "%" : "px"}
          </label>
          <label style={{ fontSize: "14px", color: "#374151" }}>
            目标 Y:
            <input
              type="number"
              value={targetY}
              onChange={(e) => setTargetY(Number(e.target.value))}
              style={styles.input}
              min="0"
              max={usePercentage ? 100 : 1000}
            />
            {usePercentage ? "%" : "px"}
          </label>
          <label
            style={{
              fontSize: "14px",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={usePercentage}
              onChange={(e) => setUsePercentage(e.target.checked)}
            />
            使用百分比
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleScrollTo} style={styles.button}>
            🎯 滚动到指定位置
          </button>
          <button
            onClick={() => scrollMethods.scrollTo(200)}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            📍 滚动到 Y=200px
          </button>
          <button
            onClick={() => {
              setTargetX(scrollState.x);
              setTargetY(scrollState.y);
            }}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            📌 使用当前位置
          </button>
        </div>
      </div>

      {/* 滚动区域 */}
      <div ref={scrollAreaRef} style={styles.scrollArea}>
        <div style={styles.scrollContent}>
          {/* 网格标记 */}
          {Array.from({ length: 5 }, (_, i) =>
            Array.from({ length: 4 }, (_, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  ...styles.marker,
                  top: `${i * 25}%`,
                  left: `${j * 25}%`,
                  backgroundColor: i === 2 && j === 2 ? "#ef4444" : "#3b82f6",
                }}
              >
                {i * 25}%, {j * 25}%
              </div>
            ))
          )}
          <div
            style={{
              position: "absolute",
              top: `${Math.min(95, (scrollState.y / 500) * 100)}%`,
              left: `${Math.min(95, (scrollState.x / 300) * 100)}%`,
              width: "20px",
              height: "20px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              border: "2px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// 滚动事件监听演示
const ScrollEventDemo = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollState, scrollMethods] = useScroll(scrollAreaRef);
  const [events, setEvents] = useState<string[]>([]);
  const [listenerPosition, setListenerPosition] = useState(100);
  const [listenerDirection, setListenerDirection] = useState<"x" | "y">("y");

  // 添加事件监听器
  const addListener = useCallback(() => {
    const callback = (position: number, direction: "x" | "y") => {
      const timestamp = new Date().toLocaleTimeString();
      setEvents((prev) => [
        `[${timestamp}] 触发: ${direction}轴 ${position}px`,
        ...prev.slice(0, 19), // 保留最近20条
      ]);
    };

    const unsubscribe = scrollMethods.addEventListener(
      listenerPosition,
      listenerDirection,
      callback
    );

    setEvents((prev) => [
      `[${new Date().toLocaleTimeString()}] 添加监听器: ${listenerDirection}轴 ${listenerPosition}px`,
      ...prev.slice(0, 19),
    ]);

    // 返回取消函数，这里我们不直接使用，而是通过其他方式管理
    return unsubscribe;
  }, [scrollMethods, listenerPosition, listenerDirection]);

  // 移除事件监听器
  const removeListener = useCallback(() => {
    scrollMethods.removeEventListener(listenerPosition, listenerDirection);
    setEvents((prev) => [
      `[${new Date().toLocaleTimeString()}] 移除监听器: ${listenerDirection}轴 ${listenerPosition}px`,
      ...prev.slice(0, 19),
    ]);
  }, [scrollMethods, listenerPosition, listenerDirection]);

  // 清除所有监听器
  const clearAllListeners = useCallback(() => {
    scrollMethods.clearAllEventListeners();
    setEvents((prev) => [
      `[${new Date().toLocaleTimeString()}] 清除所有监听器`,
      ...prev.slice(0, 19),
    ]);
  }, [scrollMethods]);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🎧 滚动事件监听</h3>
      <p style={styles.subtitle}>
        展示 addEventListener, removeEventListener, clearAllEventListeners 方法
      </p>

      {/* 当前滚动位置 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100px, 100%), 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>{scrollState.x}px</div>
          <div style={styles.statusLabel}>X 位置</div>
        </div>
        <div style={styles.statusItem}>
          <div style={styles.statusValue}>{scrollState.y}px</div>
          <div style={styles.statusLabel}>Y 位置</div>
        </div>
      </div>

      {/* 监听器控制 */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <label style={{ fontSize: "14px", color: "#374151" }}>
            监听位置:
            <input
              type="number"
              value={listenerPosition}
              onChange={(e) => setListenerPosition(Number(e.target.value))}
              style={styles.input}
              min="0"
              max="500"
              step="10"
            />
            px
          </label>
          <label style={{ fontSize: "14px", color: "#374151" }}>
            监听方向:
            <select
              value={listenerDirection}
              onChange={(e) =>
                setListenerDirection(e.target.value as "x" | "y")
              }
              style={styles.select}
            >
              <option value="y">Y轴 (垂直)</option>
              <option value="x">X轴 (水平)</option>
            </select>
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={addListener} style={styles.button}>
            ➕ 添加监听器
          </button>
          <button
            onClick={removeListener}
            style={{ ...styles.button, ...styles.secondaryButton }}
          >
            ➖ 移除监听器
          </button>
          <button
            onClick={clearAllListeners}
            style={{ ...styles.button, ...styles.dangerButton }}
          >
            🗑️ 清除所有监听器
          </button>
        </div>
      </div>

      {/* 事件日志 */}
      <div style={{ marginBottom: "16px" }}>
        <h4
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: "8px",
          }}
        >
          📋 事件日志
        </h4>
        <div style={styles.eventLog}>
          {events.length === 0 ? (
            <div style={{ color: "#9ca3af", fontStyle: "italic" }}>
              暂无事件，请添加监听器并滚动查看效果
            </div>
          ) : (
            events.map((event, index) => (
              <div key={index} style={styles.eventItem}>
                {event}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 滚动区域 */}
      <div ref={scrollAreaRef} style={styles.scrollArea}>
        <div style={styles.scrollContent}>
          {/* 位置标记 */}
          {[50, 100, 150, 200, 250, 300, 350, 400].map((pos) => (
            <div
              key={`y-${pos}`}
              style={{
                ...styles.marker,
                top: `${pos}px`,
                left: "10px",
                backgroundColor:
                  pos === listenerPosition && listenerDirection === "y"
                    ? "#ef4444"
                    : "#3b82f6",
              }}
            >
              Y: {pos}px
            </div>
          ))}
          {[50, 100, 150, 200, 250, 300].map((pos) => (
            <div
              key={`x-${pos}`}
              style={{
                ...styles.marker,
                top: "10px",
                left: `${pos}px`,
                backgroundColor:
                  pos === listenerPosition && listenerDirection === "x"
                    ? "#ef4444"
                    : "#10b981",
              }}
            >
              X: {pos}px
            </div>
          ))}

          {/* 当前监听位置指示器 */}
          <div
            style={{
              position: "absolute",
              [listenerDirection === "y"
                ? "top"
                : "left"]: `${listenerPosition}px`,
              [listenerDirection === "y" ? "left" : "top"]: "0",
              [listenerDirection === "y" ? "width" : "height"]: "100%",
              [listenerDirection === "y" ? "height" : "width"]: "2px",
              backgroundColor: "#ef4444",
              opacity: 0.7,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// 主组件
const UseScrollDemo = () => {
  return (
    <div style={styles.container}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "8px",
          }}
        >
          useScroll Hook 演示
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b" }}>
          完整展示滚动状态检测、控制方法和事件监听功能
        </p>
      </div>

      <BasicScrollDemo />
      <PreciseScrollDemo />
      <ScrollEventDemo />

      <div
        style={{
          ...styles.card,
          backgroundColor: "#f0f9ff",
          border: "1px solid #bae6fd",
        }}
      >
        <h3 style={{ ...styles.title, color: "#0369a1" }}>📚 功能总览</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "8px",
              }}
            >
              🎯 滚动控制方法
            </div>
            <ul
              style={{
                fontSize: "14px",
                color: "#0c4a6e",
                margin: 0,
                paddingLeft: "16px",
              }}
            >
              <li>scrollToTop - 滚动到顶部</li>
              <li>scrollToBottom - 滚动到底部</li>
              <li>scrollToLeft - 滚动到左侧</li>
              <li>scrollToRight - 滚动到右侧</li>
              <li>scrollTo - 精确滚动到指定位置</li>
            </ul>
          </div>
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "8px",
              }}
            >
              📊 滚动状态检测
            </div>
            <ul
              style={{
                fontSize: "14px",
                color: "#0c4a6e",
                margin: 0,
                paddingLeft: "16px",
              }}
            >
              <li>x, y - 当前滚动位置</li>
              <li>isTop, isBottom - 边界检测</li>
              <li>isLeft, isRight - 水平边界</li>
              <li>hasVerticalScroll - 垂直滚动条</li>
              <li>hasHorizontalScroll - 水平滚动条</li>
            </ul>
          </div>
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "8px",
              }}
            >
              🎧 事件监听功能
            </div>
            <ul
              style={{
                fontSize: "14px",
                color: "#0c4a6e",
                margin: 0,
                paddingLeft: "16px",
              }}
            >
              <li>addEventListener - 添加位置监听</li>
              <li>removeEventListener - 移除监听</li>
              <li>clearAllEventListeners - 清除所有</li>
              <li>支持 X/Y 轴独立监听</li>
              <li>自动触发和重置机制</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseScrollDemo;
