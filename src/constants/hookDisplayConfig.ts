import { HooksType } from "../menu/Menu";

// 导入文档
import { readmeContent as useCookiesReadme } from "../hooks/useCookies/readme-content";
import { readmeContent as useCopyToClipboardReadme } from "../hooks/useCopyToclipboard/readme-content";
import { readmeContent as useCountDownReadme } from "../hooks/useCountDown/readme-content";
import { readmeContent as useCounterReadme } from "../hooks/useCounter/readme-content";
import { readmeContent as useCreationReadme } from "../hooks/useCreation/readme-content";
import { readmeContent as useCssReadme } from "../hooks/useCss/readme-content";
import { readmeContent as useDebounceReadme } from "../hooks/useDebounce/readme-content";
import { readmeContent as useDebounceFnReadme } from "../hooks/useDebounceFn/readme-content";
import { readmeContent as useDocumentVisibilityReadme } from "../hooks/useDocumentVisibility/readme-content";
import { readmeContent as useEventListenerReadme } from "../hooks/useEventListener/readme-content";
import { readmeContent as useForceUpdateReadme } from "../hooks/useForceUpdate/readme-content";
import { readmeContent as useFullscreenReadme } from "../hooks/useFullscreen/readme-content";
import { readmeContent as useHoverReadme } from "../hooks/useHover/readme-content";
import { readmeContent as useInViewportReadme } from "../hooks/useInViewport/readme-content";
import { readmeContent as useIsomorphicEffectReadme } from "../hooks/useIsomorphicEffect/readme-content";
import { readmeContent as useLatestReadme } from "../hooks/useLatest/readme-content";
import { readmeContent as useLifecyclesReadme } from "../hooks/useLifecycles/readme-content";
import { readmeContent as useLockFnReadme } from "../hooks/useLockFn/readme-content";
import { readmeContent as useMountedStateReadme } from "../hooks/useMountedState/readme-content";
import { readmeContent as useMutateObserverReadme } from "../hooks/useMutateObserver/readme-content";
import { readmeContent as useNetWorkReadme } from "../hooks/useNetWork/readme-content";
import { readmeContent as useReactiveReadme } from "../hooks/useReactive/readme-content";
import { readmeContent as useSafeStateReadme } from "../hooks/useSafeState/readme-content";
import { readmeContent as useScrollReadme } from "../hooks/useScroll/readme-content";
import { readmeContent as useScrollingReadme } from "../hooks/useScrolling/readme-content";
import { readmeContent as useSelectionReadme } from "../hooks/useSelection/readme-content";
import { readmeContent as useSizeReadme } from "../hooks/useSize/readme-content";
import { readmeContent as useStepProgressReadme } from "../hooks/useStepProgress/readme-content";
import { readmeContent as useTextSelectionReadme } from "../hooks/useTextSelection/readme-content";
import { readmeContent as useTimeoutReadme } from "../hooks/useTimeout/readme-content";
import { readmeContent as useUnmountedRefReadme } from "../hooks/useUnmountedRef/readme-content";
import { readmeContent as useWhyDidYouUpdateReadme } from "../hooks/useWhyDidYouUpdate/readme-content";

// 导入代码片段
import { useCookiesCodeString } from "../hooks/useCookies/code";
import { useCopyToClipboardCodeString } from "../hooks/useCopyToclipboard/code";
import { useCountdownCodeString } from "../hooks/useCountDown/code";
import { useCounterCodeString } from "../hooks/useCounter/code";
import { useCreationCodeString } from "../hooks/useCreation/code";
import { useCssCodeString } from "../hooks/useCss/code";
import { useDebounceCodeString } from "../hooks/useDebounce/code";
import { useDebounceFnCodeString } from "../hooks/useDebounceFn/code";
import { useDocumentVisibilityCodeString } from "../hooks/useDocumentVisibility/code";
import { useEventListenerCodeString } from "../hooks/useEventListener/code";
import { useForceUpdateCodeString } from "../hooks/useForceUpdate/code";
import { useFullscreenCodeString } from "../hooks/useFullscreen/code";
import { useHoverCodeString } from "../hooks/useHover/code";
import { useInViewportCodeString } from "../hooks/useInViewport/code";
import { useIsomorphicEffectCodeString } from "../hooks/useIsomorphicEffect/code";
import { useLatestCodeString } from "../hooks/useLatest/code";
import { useLiftcycleCodeString } from "../hooks/useLifecycles/code";
import { UseLockFnCodeString } from "../hooks/useLockFn/code";
import { UseMountedStateCodeString } from "../hooks/useMountedState/code";
import { useMutationObserverCodeString } from "../hooks/useMutateObserver/code";
import { useNetworkCodeString } from "../hooks/useNetWork/code";
import { useReactiveCodeString } from "../hooks/useReactive/code";
import { useSafeStateCodeString } from "../hooks/useSafeState/code";
import { useScrollCodeString } from "../hooks/useScroll/code";
import { useScrllingCodeString } from "../hooks/useScrolling/code";
import { useSelectionCodeString } from "../hooks/useSelection/code";
import { useSizeCodeString } from "../hooks/useSize/code";
import { useStepProgressCodeString } from "../hooks/useStepProgress/code";
import { useTextSelectionCodeString } from "../hooks/useTextSelection/code";
import { useTimeoutCodeString } from "../hooks/useTimeout/code";
import { useUnmountedRefCodeString } from "../hooks/useUnmountedRef/code";
import { useWhyDidYouUpdateCodeString } from "../hooks/useWhyDidYouUpdate/code";

export const hookMap: Record<
  HooksType,
  {
    doc: string;
    code: string;
    demo: React.ReactNode;
  }
> = {
  [HooksType.UseCookies]: {
    doc: useCookiesReadme,
    code: useCookiesCodeString,
    demo: null,
  },
  [HooksType.UseCopyToClipboard]: {
    doc: useCopyToClipboardReadme,
    code: useCopyToClipboardCodeString,
    demo: null,
  },
  [HooksType.UseCountDown]: {
    doc: useCountDownReadme,
    code: useCountdownCodeString,
    demo: null,
  },
  [HooksType.UseCounter]: {
    doc: useCounterReadme,
    code: useCounterCodeString,
    demo: null,
  },
  [HooksType.UseCreation]: {
    doc: useCreationReadme,
    code: useCreationCodeString,
    demo: null,
  },
  [HooksType.UseCss]: {
    doc: useCssReadme,
    code: useCssCodeString,
    demo: null,
  },
  [HooksType.UseDebounce]: {
    doc: useDebounceReadme,
    code: useDebounceCodeString,
    demo: null,
  },
  [HooksType.UseDebounceFn]: {
    doc: useDebounceFnReadme,
    code: useDebounceFnCodeString,
    demo: null,
  },
  [HooksType.UseDocumentVisibility]: {
    doc: useDocumentVisibilityReadme,
    code: useDocumentVisibilityCodeString,
    demo: null,
  },
  [HooksType.UseEventListener]: {
    doc: useEventListenerReadme,
    code: useEventListenerCodeString,
    demo: null,
  },
  [HooksType.UseForceUpdate]: {
    doc: useForceUpdateReadme,
    code: useForceUpdateCodeString,
    demo: null,
  },
  [HooksType.UseFullscreen]: {
    doc: useFullscreenReadme,
    code: useFullscreenCodeString,
    demo: null,
  },
  [HooksType.UseHover]: {
    doc: useHoverReadme,
    code: useHoverCodeString,
    demo: null,
  },
  [HooksType.UseInViewport]: {
    doc: useInViewportReadme,
    code: useInViewportCodeString,
    demo: null,
  },
  [HooksType.UseIsomorphicEffect]: {
    doc: useIsomorphicEffectReadme,
    code: useIsomorphicEffectCodeString,
    demo: null,
  },
  [HooksType.UseLatest]: {
    doc: useLatestReadme,
    code: useLatestCodeString,
    demo: null,
  },
  [HooksType.UseLifecycle]: {
    doc: useLifecyclesReadme,
    code: useLiftcycleCodeString,
    demo: null,
  },
  [HooksType.UseLockFn]: {
    doc: useLockFnReadme,
    code: UseLockFnCodeString,
    demo: null,
  },
  [HooksType.UseMountedState]: {
    doc: useMountedStateReadme,
    code: UseMountedStateCodeString,
    demo: null,
  },
  [HooksType.UseMutationObserver]: {
    doc: useMutateObserverReadme,
    code: useMutationObserverCodeString,
    demo: null,
  },
  [HooksType.UseNetwork]: {
    doc: useNetWorkReadme,
    code: useNetworkCodeString,
    demo: null,
  },
  [HooksType.UseReactive]: {
    doc: useReactiveReadme,
    code: useReactiveCodeString,
    demo: null,
  },
  [HooksType.UseSafaState]: {
    doc: useSafeStateReadme,
    code: useSafeStateCodeString,
    demo: null,
  },
  [HooksType.UseScrolling]: {
    doc: useScrollingReadme,
    code: useScrllingCodeString,
    demo: null,
  },
  [HooksType.UseSelection]: {
    doc: useSelectionReadme,
    code: useSelectionCodeString,
    demo: null,
  },
  [HooksType.UseSize]: {
    doc: useSizeReadme,
    code: useSizeCodeString,
    demo: null,
  },
  [HooksType.UseTextSelection]: {
    doc: useTextSelectionReadme,
    code: useTextSelectionCodeString,
    demo: null,
  },
  [HooksType.UseTimeout]: {
    doc: useTimeoutReadme,
    code: useTimeoutCodeString,
    demo: null,
  },
  [HooksType.UseUnmountedRef]: {
    doc: useUnmountedRefReadme,
    code: useUnmountedRefCodeString,
    demo: null,
  },
  [HooksType.UseWhyDidYouUpdate]: {
    doc: useWhyDidYouUpdateReadme,
    code: useWhyDidYouUpdateCodeString,
    demo: null,
  },
  [HooksType.UseScroll]: {
    doc: useScrollReadme,
    code: useScrollCodeString,
    demo: null,
  },
  [HooksType.UseStepProgress]: {
    doc: useStepProgressReadme,
    code: useStepProgressCodeString,
    demo: null,
  },
};
