import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseNetworkCode: React.FC = () => {
  return (
    <Code
      codeString={useNetworkCodeString}
      fileName="useNetwork.ts"
      id={HooksType.UseNetwork}
    />
  );
};

export default UseNetworkCode;

const useNetworkCodeString = `import { useEventListener, useSafeState } from "ahooks";

interface NetWorkStates {
  online?: boolean; // 网络是否为在线
  rtt?: number; // 当前连接下评估的往返时延
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown"; // 设备使用与所述网络进行通信的连接的类型
  saveData?: boolean; // 用户代理是否设置了减少数据使用的选项
  downlink?: number; // 最大下行速度（单位：兆比特/秒）
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g"; // 网络连接的类型
}

const getConnection = (): NetWorkStates | undefined => {
  if (navigator && typeof navigator === "object") {
    const nav = navigator as any;
    return {
      rtt: nav.connection?.rtt,
      type: nav.connection?.type,
      saveData: nav.connection?.saveData,
      downlink: nav.connection?.downlink,
      effectiveType: nav.connection?.effectiveType
    };
  }
};

const useNetWork = (): NetWorkStates => {
  const [netStatus, setNetStatus] = useSafeState(() => ({
    online: navigator?.onLine,
    ...getConnection()
  }));

  useEventListener("online", () => {
    setNetStatus((s) => ({
      ...s,
      online: true
    }));
  });

  useEventListener("offline", () => {
    setNetStatus((s) => ({
      ...s,
      online: false
    }));
  });

  return netStatus;
};

export default useNetWork;`;
