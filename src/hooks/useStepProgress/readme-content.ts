// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useStepProgress

一个用于创建平滑进度条动画的 React Hook。支持设置目标进度、最小执行时间和完成回调，常用于文件上传、数据加载等场景的进度展示。

## 功能特性

- ✅ **平滑动画**: 自动创建从 0 到目标进度的平滑过渡动画
- ✅ **最小时间控制**: 确保进度条至少运行指定时间，避免过快完成
- ✅ **智能速度调节**: 根据目标进度自动调整动画速度
- ✅ **完成回调**: 进度达到 100% 时自动触发回调函数
- ✅ **自动清理**: 组件卸载时自动清理定时器，防止内存泄漏
- ✅ **类型安全**: 完整的 TypeScript 类型支持

## 基本用法

\`\`\`typescript
import useStepProgress from "./useStepProgress";

function ProgressDemo() {
  const [targetProgress, setTargetProgress] = useState(0);

  const progress = useStepProgress({
    percentage: targetProgress,
    minTime: 2000, // 最少运行 2 秒
    onFinish: () => {
      console.log("进度完成！");
    },
  });

  return (
    <div>
      <div>当前进度: {progress}%</div>
      <div
        style={{
          width: \`\${progress}%\`,
          height: 20,
          backgroundColor: "#1890ff",
        }}
      />
      <button onClick={() => setTargetProgress(100)}>开始进度</button>
    </div>
  );
}
\`\`\`

## 高级用法

### 文件上传进度

\`\`\`typescript
function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const progress = useStepProgress({
    percentage: uploadProgress,
    minTime: 1000,
    onFinish: () => {
      message.success("文件上传完成！");
    },
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
    } catch (error) {
      console.error("上传失败:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
      <div>上传进度: {progress}%</div>
      <Progress percent={progress} />
    </div>
  );
}
\`\`\`

### 数据加载进度

\`\`\`typescript
function DataLoader() {
  const [loadingSteps, setLoadingSteps] = useState(0);
  const totalSteps = 5;

  const progress = useStepProgress({
    percentage: (loadingSteps / totalSteps) * 100,
    minTime: 3000, // 至少显示 3 秒
    onFinish: () => {
      setIsLoading(false);
    },
  });

  const loadData = async () => {
    setLoadingSteps(1); // 开始连接
    await connectToServer();

    setLoadingSteps(2); // 获取用户信息
    await fetchUserInfo();

    setLoadingSteps(3); // 加载配置
    await loadConfig();

    setLoadingSteps(4); // 初始化组件
    await initializeComponents();

    setLoadingSteps(5); // 完成
  };

  return (
    <div>
      <div>加载进度: {progress}%</div>
      <div>
        步骤: {loadingSteps}/{totalSteps}
      </div>
    </div>
  );
}
\`\`\`

### 模拟网络请求进度

\`\`\`typescript
function ApiProgress() {
  const [apiProgress, setApiProgress] = useState(0);

  const progress = useStepProgress({
    percentage: apiProgress,
    minTime: 1500,
    onFinish: () => {
      notification.success({
        message: "请求完成",
        description: "数据已成功加载",
      });
    },
  });

  const simulateApiCall = async () => {
    // 模拟分步骤的 API 调用
    setApiProgress(20); // 发起请求
    await delay(300);

    setApiProgress(50); // 处理中
    await delay(500);

    setApiProgress(80); // 接收数据
    await delay(400);

    setApiProgress(100); // 完成
  };

  return (
    <div>
      <Button onClick={simulateApiCall}>开始请求</Button>
      <div style={{ marginTop: 16 }}>
        <div>请求进度: {progress}%</div>
        <div
          style={{
            width: "100%",
            height: 8,
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: \`\${progress}%\`,
              height: "100%",
              backgroundColor: "#52c41a",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
\`\`\`

## API 参考

### useStepProgress(options)

#### 参数

| 参数      | 类型              | 描述         |
| --------- | ----------------- | ------------ |
| \`options\` | \`ProgressOptions\` | 进度配置选项 |

#### ProgressOptions

| 属性         | 类型         | 默认值 | 描述                       |
| ------------ | ------------ | ------ | -------------------------- |
| \`percentage\` | \`number\`     | -      | 目标进度百分比 (0-100)     |
| \`minTime\`    | \`number\`     | \`1000\` | 最小执行时间（毫秒）       |
| \`onFinish\`   | \`() => void\` | -      | 进度达到 100% 时的回调函数 |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| \`number\` | 当前进度值 (0-100) |

## 实现原理

### 动画机制

1. **定时器驱动**: 使用 \`setInterval\` 创建平滑的进度动画
2. **智能速度**: 根据目标进度调整动画速度
   - 目标进度 ≥ 100%: 4ms 间隔（快速）
   - 目标进度 < 100%: 16ms 间隔（平滑）
3. **最小时间控制**: 在达到最小时间前，进度不会超过 99%

### 状态管理

\`\`\`typescript
// 核心状态
const [progress, setProgress] = useState(0);
const timerRef = useRef<ReturnType<typeof setInterval>>();
const startTimeRef = useRef<number>(Date.now());

// 进度更新逻辑
setProgress((prev) => {
  // 最小时间控制
  if (minTime && elapsedTime() < minTime && prev >= 99) {
    return 99;
  }

  // 达到目标进度
  if (prev >= targetPercentage) {
    clearTimer();
    return prev;
  }

  // 递增进度
  return prev + 1;
});
\`\`\`

## 使用场景

### 1. 文件上传进度条

\`\`\`typescript
const uploadProgress = useStepProgress({
  percentage: realUploadProgress,
  minTime: 2000,
  onFinish: () => showSuccessMessage(),
});
\`\`\`

### 2. 页面加载进度

\`\`\`typescript
const loadingProgress = useStepProgress({
  percentage: loadedResourcesPercent,
  minTime: 1500,
  onFinish: () => setPageReady(true),
});
\`\`\`

### 3. 表单提交进度

\`\`\`typescript
const submitProgress = useStepProgress({
  percentage: formSubmissionProgress,
  minTime: 1000,
  onFinish: () => redirectToSuccessPage(),
});
\`\`\`

### 4. 数据同步进度

\`\`\`typescript
const syncProgress = useStepProgress({
  percentage: dataSyncPercent,
  minTime: 3000,
  onFinish: () => refreshData(),
});
\`\`\`

## 最佳实践

### 1. 合理设置最小时间

\`\`\`typescript
// ✅ 好的做法：根据用户体验设置合适的最小时间
const progress = useStepProgress({
  percentage: uploadPercent,
  minTime: 1500, // 给用户足够的视觉反馈时间
  onFinish: handleComplete,
});

// ❌ 避免：时间过短或过长
const badProgress1 = useStepProgress({
  percentage: uploadPercent,
  minTime: 100, // 太短，用户可能看不清
});

const badProgress2 = useStepProgress({
  percentage: uploadPercent,
  minTime: 10000, // 太长，影响用户体验
});
\`\`\`

### 2. 处理错误情况

\`\`\`typescript
function RobustProgress() {
  const [targetProgress, setTargetProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const progress = useStepProgress({
    percentage: hasError ? 0 : targetProgress,
    minTime: 1000,
    onFinish: () => {
      if (!hasError) {
        handleSuccess();
      }
    },
  });

  const handleApiCall = async () => {
    try {
      setHasError(false);
      setTargetProgress(50);

      const result = await apiCall();
      setTargetProgress(100);
    } catch (error) {
      setHasError(true);
      setTargetProgress(0);
      handleError(error);
    }
  };
}
\`\`\`

### 3. 组合使用多个进度

\`\`\`typescript
function MultiStepProgress() {
  const [step1Progress, setStep1Progress] = useState(0);
  const [step2Progress, setStep2Progress] = useState(0);

  const totalProgress = useStepProgress({
    percentage: (step1Progress + step2Progress) / 2,
    minTime: 2000,
    onFinish: () => console.log("所有步骤完成"),
  });

  return (
    <div>
      <div>总进度: {totalProgress}%</div>
      <div>步骤1: {step1Progress}%</div>
      <div>步骤2: {step2Progress}%</div>
    </div>
  );
}
\`\`\`

## 注意事项

1. **内存管理**: Hook 会自动清理定时器，无需手动处理
2. **进度范围**: 目标进度会自动限制在 0-100 范围内
3. **最小时间**: 设置合理的最小时间以提供良好的用户体验
4. **回调时机**: \`onFinish\` 只在进度达到 100% 时触发一次

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)

## 性能优化

- 使用 \`useCallback\` 优化定时器清理函数
- 自动清理定时器防止内存泄漏
- 智能速度调节减少不必要的渲染
`;
