import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseStepProgressCode: React.FC = () => {
  return (
    <Code
      codeString={useStepProgressCodeString}
      fileName="useStepProgress.ts"
      id={HooksType.UseStepProgress}
    />
  );
};

export default UseStepProgressCode;

const useStepProgressCodeString = `import { useState, useEffect, useRef, useCallback } from 'react'

interface ProgressOptions {
  /** 目标进度，即接口请求成功数量率 */
  percentage: number
  /** 进度完成的回调 */
  onFinish?: () => void
  /** 最小时间，单位毫秒 */
  minTime?: number
}

const useStepProgress = ({ percentage, minTime = 1000, onFinish }: ProgressOptions) => {
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const startTimeRef = useRef<number>(Date.now())
  const targetPercentage = Math.min(percentage, 100)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  // 处理进度变化的 effect
  useEffect(() => {
    clearTimer()
    startTimeRef.current = Date.now()

    const elapsedTime = () => Date.now() - startTimeRef.current
    const stepSpeed = targetPercentage >= 100 ? 4 : 16

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        // 如果还没到最小时间，限制进度不超过99
        if (minTime && elapsedTime() < minTime && prev >= 99) {
          return 99
        }

        if (prev >= targetPercentage) {
          clearTimer()
          return prev
        }
        return prev + 1
      })
    }, stepSpeed)

    return clearTimer
  }, [targetPercentage, clearTimer, minTime])

  useEffect(() => {
    if (progress >= 100 && onFinish) {
      onFinish()
    }
  }, [progress, onFinish])

  return progress
}

export default useStepProgress

`;
