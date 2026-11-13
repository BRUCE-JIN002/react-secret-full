import React, { useState, useCallback, useMemo } from "react";
import { useProgressiveCompute } from "../index";

// 生成测试数据
const generateTestData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    description: `This is description for item ${i + 1}`,
    category: ["A", "B", "C"][i % 3],
    isActive: Math.random() > 0.5,
  }));
};

// 样式常量
const styles = {
  container: {
    width: "100%",
    maxWidth: "min(800px, 100%)",
    minWidth: 0,
    flexShrink: 1,
    boxSizing: "border-box" as const,
    margin: "0 auto",
    padding: "24px",
    overflowWrap: "break-word" as const,
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
    marginBottom: "20px",
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
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
  },
  disabledButton: {
    backgroundColor: "#f1f5f9",
    color: "#94a3b8",
    cursor: "not-allowed",
  },
  progressContainer: {
    marginBottom: "20px",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#f1f5f9",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "8px",
  },
  progressFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
  statItem: {
    textAlign: "center" as const,
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    marginRight: 0,
    minWidth: 0,
    width: "auto",
    maxWidth: "100%",
    flex: "1 1 220px",
  },
  resultsList: {
    maxHeight: "200px",
    overflow: "auto",
    marginTop: "16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
  },
  resultItem: {
    padding: "12px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "14px",
  },
};

// Demo 1: 数据转换
const DataTransformDemo = () => {
  const data = useMemo(() => generateTestData(8000), []);

  const transformFn = useCallback(
    (item: any) => ({
      ...item,
      squared: item.value ** 2,
      cubed: item.value ** 3,
      isEven: item.value % 2 === 0,
    }),
    []
  );

  const { result, isComputing, progress, start, pause, resume, cancel, reset } =
    useProgressiveCompute(data, transformFn, {
      batchSize: 500,
      debounceMs: 16,
    });

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🔄 数据转换演示</h3>
      <p style={styles.subtitle}>
        对 {data.length.toLocaleString()} 条数据进行数学运算转换
      </p>

      <div style={styles.buttonGroup}>
        <button
          onClick={start}
          disabled={isComputing}
          style={{
            ...styles.button,
            ...(isComputing ? styles.disabledButton : styles.primaryButton),
          }}
        >
          {isComputing ? "转换中..." : "开始转换"}
        </button>
        <button
          onClick={pause}
          disabled={!isComputing}
          style={{
            ...styles.button,
            ...(!isComputing ? styles.disabledButton : styles.secondaryButton),
          }}
        >
          暂停
        </button>
        <button
          onClick={resume}
          disabled={isComputing}
          style={{
            ...styles.button,
            ...(isComputing ? styles.disabledButton : styles.secondaryButton),
          }}
        >
          恢复
        </button>
        <button
          onClick={cancel}
          style={{
            ...styles.button,
            ...styles.secondaryButton,
          }}
        >
          取消
        </button>
        <button
          onClick={reset}
          style={{
            ...styles.button,
            ...styles.secondaryButton,
          }}
        >
          重置
        </button>
      </div>

      <div style={styles.progressContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "14px", color: "#374151" }}>处理进度</span>
          <span
            style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}
          >
            {progress.toFixed(1)}%
          </span>
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
              backgroundColor: "#10b981",
            }}
          />
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <div style={styles.statValue}>{result.length.toLocaleString()}</div>
          <div style={styles.statLabel}>已处理</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>{data.length.toLocaleString()}</div>
          <div style={styles.statLabel}>总数量</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>
            {((result.length / data.length) * 100).toFixed(1)}%
          </div>
          <div style={styles.statLabel}>完成率</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>{isComputing ? "运行中" : "空闲"}</div>
          <div style={styles.statLabel}>状态</div>
        </div>
      </div>
    </div>
  );
};

// Demo 2: 搜索过滤
const SearchFilterDemo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const data = useMemo(() => generateTestData(6000), []);

  const filterFn = useCallback(
    (item: any) => {
      if (!searchQuery) return null;

      const query = searchQuery.toLowerCase();
      if (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      ) {
        return {
          ...item,
          matchScore: Math.random(),
        };
      }
      return null;
    },
    [searchQuery]
  );

  const { result, isComputing, progress, start, reset } = useProgressiveCompute(
    data,
    filterFn,
    {
      batchSize: 400,
      debounceMs: 50,
    }
  );

  const filteredResults = result.filter((item) => item !== null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      start();
    } else {
      reset();
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🔍 智能搜索演示</h3>
      <p style={styles.subtitle}>
        在 {data.length.toLocaleString()} 条数据中进行实时搜索和过滤
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
          marginBottom: "20px",
          maxWidth: "100%",
          minWidth: 0,
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="输入搜索关键词 (如: Item, description, A/B/C)..."
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          disabled={isComputing || !searchQuery.trim()}
          style={{
            ...styles.button,
            ...(isComputing || !searchQuery.trim()
              ? styles.disabledButton
              : styles.primaryButton),
          }}
        >
          {isComputing ? "搜索中..." : "开始搜索"}
        </button>
        <button
          onClick={reset}
          style={{
            ...styles.button,
            ...styles.secondaryButton,
          }}
        >
          清空结果
        </button>
      </div>

      {isComputing && (
        <div style={styles.progressContainer}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#374151" }}>搜索进度</span>
            <span
              style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}
            >
              {progress.toFixed(1)}%
            </span>
          </div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
                backgroundColor: "#3b82f6",
              }}
            />
          </div>
        </div>
      )}

      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <div style={styles.statValue}>
            {filteredResults.length.toLocaleString()}
          </div>
          <div style={styles.statLabel}>匹配结果</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>{result.length.toLocaleString()}</div>
          <div style={styles.statLabel}>已搜索</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>
            {result.length > 0
              ? ((filteredResults.length / result.length) * 100).toFixed(1)
              : 0}
            %
          </div>
          <div style={styles.statLabel}>匹配率</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>{searchQuery || "无"}</div>
          <div style={styles.statLabel}>关键词</div>
        </div>
      </div>

      {filteredResults.length > 0 && (
        <div style={styles.resultsList}>
          {filteredResults.slice(0, 8).map((item, index) => (
            <div key={item.id} style={styles.resultItem}>
              <div style={{ fontWeight: "500", color: "#1e293b" }}>
                {item.name}
              </div>
              <div
                style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}
              >
                {item.description} • 分类: {item.category}
              </div>
            </div>
          ))}
          {filteredResults.length > 8 && (
            <div
              style={{
                ...styles.resultItem,
                fontStyle: "italic",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              还有 {filteredResults.length - 8} 条匹配结果...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 主组件
const ProgressiveComputeDemo = () => {
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
          useProgressiveCompute Hook
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b" }}>
          渐进式计算演示 - 保持UI流畅的大数据处理方案
        </p>
      </div>

      <DataTransformDemo />
      <SearchFilterDemo />

      <div
        style={{
          ...styles.card,
          backgroundColor: "#f0f9ff",
          border: "1px solid #bae6fd",
        }}
      >
        <h3 style={{ ...styles.title, color: "#0369a1" }}>💡 核心特性</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "4px",
              }}
            >
              ⚡ 非阻塞处理
            </div>
            <div style={{ fontSize: "14px", color: "#0c4a6e" }}>
              时间片调度，UI始终流畅
            </div>
          </div>
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "4px",
              }}
            >
              📊 实时进度
            </div>
            <div style={{ fontSize: "14px", color: "#0c4a6e" }}>
              精确的进度反馈和状态
            </div>
          </div>
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "4px",
              }}
            >
              🎛️ 灵活控制
            </div>
            <div style={{ fontSize: "14px", color: "#0c4a6e" }}>
              支持暂停、恢复、取消
            </div>
          </div>
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "4px",
              }}
            >
              🛡️ 内存安全
            </div>
            <div style={{ fontSize: "14px", color: "#0c4a6e" }}>
              自动清理，防止内存泄漏
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveComputeDemo;
