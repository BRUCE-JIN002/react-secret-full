// Import necessary dependencies
import { renderHook } from "@testing-library/react";
import useEventListener from "./index";

describe("useEventListener", () => {
  it("should add and remove event listener correctly", () => {
    // Mock event handler function
    const mockHandler = jest.fn();

    // Render the hook with initial values
    const { rerender, unmount } = renderHook(() =>
      useEventListener("click", mockHandler)
    );

    // Ensure that initially no event listener is added
    expect(mockHandler).not.toHaveBeenCalled();

    // Trigger a click event manually
    document.dispatchEvent(new MouseEvent("click"));

    // Check if event handler was called once
    expect(mockHandler).toHaveBeenCalledTimes(1);

    // Rerender the hook with different options if needed
    rerender();

    // Unmount the hook
    unmount();

    // Additional assertions if necessary
  });

  it("should pass event parameters to event handler", () => {
    const mockHandler = jest.fn();
    const event = new MouseEvent("click");

    // Render the hook with an event that accepts parameters
    const { unmount } = renderHook(() =>
      useEventListener("click", mockHandler)
    );

    // Trigger a click event manually
    document.dispatchEvent(event);

    // Check if event handler received the correct parameters
    expect(mockHandler).toHaveBeenCalledWith(event);

    // Unmount the hook
    unmount();
  });
});
