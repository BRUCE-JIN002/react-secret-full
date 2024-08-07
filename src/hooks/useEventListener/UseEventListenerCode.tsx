import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseEventListenerCode: React.FC = () => {
  return (
    <Code
      codeString={useEventListenerCodeString}
      fileName="useEventListener.ts"
      id={HooksType.UseEventListener}
    />
  );
};

export default UseEventListenerCode;

const useEventListenerCodeString = `import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicEffect/useIsomorphicEffect";

function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  T extends Element = K extends keyof HTMLElementEventMap
    ? HTMLDivElement
    : SVGAElement
>(
  eventName: K,
  handler:
    | ((event: HTMLElementEventMap[K]) => void)
    | ((event: SVGElementEventMap[K]) => void),
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | SVGElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
) {
  const saveHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const listener: typeof handler = (event) => {
      saveHandler.current(event);
    };

    targetElement.addEventListener(eventName, listener, options);

    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

export default useEventListener;`;
