/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, renderHook, act } from "@testing-library/react";
import useHover from "./useHoverr";

describe("useHover", () => {
  it("should be defined", () => {
    expect(useHover).toBeDefined();
  });

  it("测试Hover", () => {
    const { getByText } = render(<div>Hover</div>);

    const { result } = renderHook(() => useHover(getByText("Hover"), {}));

    // void 的目的是告诉fireEvent方法返回的是undefined
    act(() => void fireEvent.mouseEnter(getByText("Hover")));
    expect(result.current).toBe(true);

    act(() => void fireEvent.mouseLeave(getByText("Hover")));
    expect(result.current).toBe(false);
  });

  it("测试功能", () => {
    const { getByText } = render(<div>Hover</div>);
    let count = 0;
    let flag = false;
    const { result } = renderHook(() =>
      useHover(getByText("Hover"), {
        onEnter: () => {
          count++;
        },
        onChange: (isFlag) => {
          flag = isFlag;
        },
        onLeave: () => {
          count++;
        },
      })
    );

    expect(result.current).toBe(false);

    act(() => void fireEvent.mouseEnter(getByText("Hover")));
    expect(result.current).toBe(true);
    expect(count).toBe(1);
    expect(flag).toBe(true);

    act(() => void fireEvent.mouseLeave(getByText("Hover")));
    expect(result.current).toBe(false);
    expect(count).toBe(2);
    expect(flag).toBe(false);
  });
});
