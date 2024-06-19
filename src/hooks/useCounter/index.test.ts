import { act, renderHook } from "@testing-library/react";
import useCounter from "./index";

describe("useCounter 测试", () => {
  it("默认初始化", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current[0]).toEqual(0);
  });

  it("数字加1", () => {
    const { result } = renderHook(() => useCounter(7));
    expect(result.current[0]).toEqual(7);

    act(() => {
      result.current[1].add();
    });

    expect(result.current[0]).toEqual(8);
  });

  it("数字减1", () => {
    const { result } = renderHook(() => useCounter(7));
    expect(result.current[0]).toEqual(7);

    act(() => {
      result.current[1].dec();
    });

    expect(result.current[0]).toEqual(6);
  });

  it("设置为3", () => {
    const { result } = renderHook(() => useCounter(7));
    expect(result.current[0]).toEqual(7);

    act(() => {
      result.current[1].set(3);
    });
    expect(result.current[0]).toEqual(3);
  });

  it("重置", () => {
    const { result } = renderHook(() => useCounter(7));
    expect(result.current[0]).toEqual(7);

    act(() => {
      result.current[1].set();
    });
    expect(result.current[0]).toEqual(1);
  });
});
