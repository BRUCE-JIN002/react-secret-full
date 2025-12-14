// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useCountDown

一个功能强大的倒计时 React Hook，支持多种倒计时模式和格式化输出。

## 功能特性

- ✅ **多种倒计时模式**: 支持剩余时间和目标时间两种模式
- ✅ **格式化输出**: 自动解析为天、小时、分钟、秒、毫秒
- ✅ **自定义间隔**: 可配置更新间隔时间
- ✅ **结束回调**: 倒计时结束时触发回调函数
- ✅ **自动清理**: 组件卸载时自动清理定时器
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **灵活配置**: 支持多种时间格式输入

## 基本用法

### 剩余时间模式

\`\`\`typescript
import useCountDown from "./useCountDown";

function CountDownComponent() {
  // 60秒倒计时
  const [timeLeft, formattedTime] = useCountDown({
    leftTime: 60 * 1000,
    onEnd: () => {
      console.log("倒计时结束！");
    }
  });

  return (
    <div>
      <div>剩余时间: {Math.ceil(timeLeft / 1000)}秒</div>
      <div>
        {formattedTime.days}天 {formattedTime.hours}时 
        {formattedTime.minites}分 {formattedTime.seconds}秒
      </div>
    </div>
  );
}
\`\`\`

### 目标时间模式

\`\`\`typescript
function TargetCountDown() {
  // 倒计时到明天
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const [timeLeft, formattedTime] = useCountDown({
    targetDate: tomorrow,
    onEnd: () => {
      alert("新的一天开始了！");
    }
  });

  return (
    <div>
      <h3>距离明天还有:</h3>
      <div>
        {formattedTime.hours}:{formattedTime.minites.toString().padStart(2, '0')}:
        {formattedTime.seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}
\`\`\`

## 高级用法

### 自定义更新间隔

\`\`\`typescript
function PreciseCountDown() {
  // 100毫秒更新一次，更精确的倒计时
  const [timeLeft, formattedTime] = useCountDown({
    leftTime: 10 * 1000, // 10秒
    interval: 100, // 100毫秒更新
  });

  return (
    <div>
      精确倒计时: {formattedTime.seconds}.{Math.floor(formattedTime.minlliseconds / 100)}秒
    </div>
  );
}
\`\`\`

### 验证码倒计时

\`\`\`typescript
function VerificationCode() {
  const [isSending, setIsSending] = useState(false);
  const [timeLeft, formattedTime] = useCountDown({
    leftTime: isSending ? 60 * 1000 : undefined,
    onEnd: () => {
      setIsSending(false);
    }
  });

  const sendCode = () => {
    // 发送验证码逻辑
    setIsSending(true);
  };

  return (
    <button onClick={sendCode} disabled={isSending}>
      {isSending ? \`\${formattedTime.seconds}秒后重发\` : "发送验证码"}
    </button>
  );
}
\`\`\`

### 活动倒计时

\`\`\`typescript
function EventCountDown() {
  const eventDate = new Date("2024-12-31 23:59:59");
  const [timeLeft, formattedTime] = useCountDown({
    targetDate: eventDate,
    onEnd: () => {
      // 活动开始处理
      window.location.reload();
    }
  });

  if (timeLeft === 0) {
    return <div>活动已开始！</div>;
  }

  return (
    <div className="event-countdown">
      <h2>距离活动开始还有:</h2>
      <div className="time-display">
        <span>{formattedTime.days}天</span>
        <span>{formattedTime.hours}小时</span>
        <span>{formattedTime.minites}分钟</span>
        <span>{formattedTime.seconds}秒</span>
      </div>
    </div>
  );
}
\`\`\`

## API 参考

### useCountDown(options?)

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| \`options\` | \`Options\` | \`{}\` | 倒计时配置选项 |

#### Options 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| \`leftTime\` | \`number\` | - | 剩余时间（毫秒），与 targetDate 二选一 |
| \`targetDate\` | \`TDate\` | - | 目标时间，与 leftTime 二选一 |
| \`interval\` | \`number\` | \`1000\` | 更新间隔（毫秒） |
| \`onEnd\` | \`VoidFunction\` | - | 倒计时结束回调 |

#### TDate 类型

支持 dayjs 的所有时间格式：
- \`string\`: "2024-12-31", "2024-12-31 23:59:59"
- \`number\`: 时间戳
- \`Date\`: Date 对象
- \`dayjs.Dayjs\`: dayjs 对象

#### 返回值

返回一个数组 \`[timeLeft, formattedTime]\`

| 索引 | 名称 | 类型 | 描述 |
|------|------|------|------|
| \`0\` | \`timeLeft\` | \`number\` | 剩余毫秒数 |
| \`1\` | \`formattedTime\` | \`FormattedRes\` | 格式化的时间对象 |

#### FormattedRes 对象

| 属性 | 类型 | 描述 |
|------|------|------|
| \`days\` | \`number\` | 剩余天数 |
| \`hours\` | \`number\` | 剩余小时数（0-23） |
| \`minites\` | \`number\` | 剩余分钟数（0-59） |
| \`seconds\` | \`number\` | 剩余秒数（0-59） |
| \`minlliseconds\` | \`number\` | 剩余毫秒数（0-999） |

## 使用场景

### 秒杀倒计时

\`\`\`typescript
function FlashSale() {
  const saleEndTime = new Date("2024-12-25 12:00:00");
  const [timeLeft, formattedTime] = useCountDown({
    targetDate: saleEndTime,
    onEnd: () => {
      // 秒杀结束，刷新页面或更新状态
      window.location.reload();
    }
  });

  return (
    <div className="flash-sale">
      <h3>🔥 限时秒杀</h3>
      {timeLeft > 0 ? (
        <div className="countdown">
          <span className="time-unit">
            <span className="number">{formattedTime.hours}</span>
            <span className="label">时</span>
          </span>
          <span className="time-unit">
            <span className="number">{formattedTime.minites}</span>
            <span className="label">分</span>
          </span>
          <span className="time-unit">
            <span className="number">{formattedTime.seconds}</span>
            <span className="label">秒</span>
          </span>
        </div>
      ) : (
        <div>秒杀已结束</div>
      )}
    </div>
  );
}
\`\`\`

### 考试倒计时

\`\`\`typescript
function ExamTimer() {
  const [timeLeft, formattedTime] = useCountDown({
    leftTime: 90 * 60 * 1000, // 90分钟
    onEnd: () => {
      // 自动提交考试
      submitExam();
    }
  });

  const submitExam = () => {
    alert("考试时间结束，已自动提交！");
  };

  return (
    <div className="exam-timer">
      <div className="timer-display">
        剩余时间: {formattedTime.hours}:{formattedTime.minites.toString().padStart(2, '0')}:
        {formattedTime.seconds.toString().padStart(2, '0')}
      </div>
      {timeLeft < 5 * 60 * 1000 && ( // 最后5分钟警告
        <div className="warning">⚠️ 注意：剩余时间不足5分钟！</div>
      )}
    </div>
  );
}
\`\`\`

### 会议倒计时

\`\`\`typescript
function MeetingCountdown() {
  const meetingTime = new Date();
  meetingTime.setHours(14, 30, 0, 0); // 今天下午2:30

  const [timeLeft, formattedTime] = useCountDown({
    targetDate: meetingTime,
    interval: 1000,
    onEnd: () => {
      // 会议开始提醒
      new Notification("会议开始了！", {
        body: "您的会议现在开始，请及时参加。"
      });
    }
  });

  return (
    <div className="meeting-reminder">
      <h4>📅 下次会议</h4>
      {timeLeft > 0 ? (
        <div>
          {formattedTime.hours > 0 && \`\${formattedTime.hours}小时\`}
          {formattedTime.minites > 0 && \`\${formattedTime.minites}分钟\`}
          {formattedTime.seconds}秒后开始
        </div>
      ) : (
        <div>会议进行中...</div>
      )}
    </div>
  );
}
\`\`\`

## 注意事项

1. **时间精度**: 默认1秒更新，可通过 \`interval\` 调整精度
2. **性能考虑**: 高频更新（如100ms）会增加CPU使用率
3. **时区处理**: 使用 dayjs 处理时间，注意时区问题
4. **内存泄漏**: Hook 会自动清理定时器，无需手动处理
5. **参数优先级**: \`leftTime\` 优先于 \`targetDate\`

## 依赖

- \`dayjs\`: 用于时间处理和格式化

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
`;
