import { FC } from "react";
import { HooksType } from "../menu/Menu";
import UseCookiesCode from "../hooks/useCookies/UseCookiesCode";
import UseCopyToClipboardCode from "../hooks/useCopyToclipboard/UseCopyToclipboardCode";
import { MenuKey } from "../App";
import UseCountdownCode from "../hooks/useCountDown/UseCountCode";
import UseCounterCode from "../hooks/useCounter/UseCounterCode";
import UseCreationCode from "../hooks/useCreation/UseCreationCode";
import UseCssCode from "../hooks/useCss/UseCssCode";
import UseDebounceCode from "../hooks/useDebounce/UseDebounceCode";
import UseDebounceFnCode from "../hooks/useDebounceFn/UseDebounceFnCode";
import UseDocumentVisibilityCode from "../hooks/useDocumentVisibility/UseDocumentVisibilityCode";
import UseEventListenerCode from "../hooks/useEventListener/UseEventListenerCode";
import UseForceUpdateCode from "../hooks/useForceUpdate/UseForceUpdateCode";
import UseFullscreenCode from "../hooks/useFullscreen/UseFullscreenCode";
import UseHoverCode from "../hooks/useHover/UseHoverCode";
import UseInViewportCode from "../hooks/useInViewport/UseInViewportCode";
import UseIsomorphicEffectCode from "../hooks/useIsomorphicEffect/UseIsomorphicEffectCode";
import UseLatestCode from "../hooks/useLatest/UseLatestCode";
import UseLiftcycleCode from "../hooks/useLifecycles/UseLiftcycleCode";
import UseLockFnCode from "../hooks/useLockFn/UseLockFnCode";
import UseMutationObserverCode from "../hooks/useMutateObserver/UseMutationObserverCode";
import UseMountedStateCode from "../hooks/useMountedState/UseMountedStateCode";
import UseNetworkCode from "../hooks/useNetWork/UseNetworkCode";
import UseReactiveCode from "../hooks/useReactive/UseReactiveCode";
import UseSafeStateCode from "../hooks/useSafeState/UseSafeStateCode";
import UseScrollingCode from "../hooks/useScrolling/UseScrollingCode";
import UseSelectionCode from "../hooks/useSelection/UseSelectionCode";
import UseSizeCode from "../hooks/useSize/UseSizeCode";
import UseTextSelectionCode from "../hooks/useTextSelection/UseTextSelectionCode";
import UseTimeoutCode from "../hooks/useTimeout/UseTimeoutCode";
import UseUnmountedRefCode from "../hooks/useUnmountedRef/UseUnmountedRefCode";
import UseWhyDidYouUpdateCode from "../hooks/useWhyDidYouUpdate/UseWhyDidYouUpdateCode";
import UseScrollDetectCode from "../hooks/useScrollDetect/useScrollDetectCode";
import UseStepProgressCode from "../hooks/useStepProgress/useStepProgressCode";
interface Iprops {
  currentPage?: MenuKey;
}

const CustomHooks: FC<Iprops> = (props) => {
  const { currentPage } = props;

  return (
    <>
      {currentPage === HooksType.UseCookies && <UseCookiesCode />}
      {currentPage === HooksType.UseCopyToClipboard && (
        <UseCopyToClipboardCode />
      )}
      {currentPage === HooksType.UseCountDown && <UseCountdownCode />}
      {currentPage === HooksType.UseCounter && <UseCounterCode />}
      {currentPage === HooksType.UseCreation && <UseCreationCode />}
      {currentPage === HooksType.UseCss && <UseCssCode />}
      {currentPage === HooksType.UseDebounce && <UseDebounceCode />}
      {currentPage === HooksType.UseDebounceFn && <UseDebounceFnCode />}
      {currentPage === HooksType.UseDocumentVisibility && (
        <UseDocumentVisibilityCode />
      )}
      {currentPage === HooksType.UseEventListener && <UseEventListenerCode />}
      {currentPage === HooksType.UseForceUpdate && <UseForceUpdateCode />}
      {currentPage === HooksType.UseFullscreen && <UseFullscreenCode />}
      {currentPage === HooksType.UseHover && <UseHoverCode />}
      {currentPage === HooksType.UseInViewport && <UseInViewportCode />}
      {currentPage === HooksType.UseIsomorphicEffect && (
        <UseIsomorphicEffectCode />
      )}
      {currentPage === HooksType.UseLatest && <UseLatestCode />}
      {currentPage === HooksType.UseLifecycle && <UseLiftcycleCode />}
      {currentPage === HooksType.UseLockFn && <UseLockFnCode />}
      {currentPage === HooksType.UseMutationObserver && (
        <UseMutationObserverCode />
      )}
      {currentPage === HooksType.UseMountedState && <UseMountedStateCode />}
      {currentPage === HooksType.UseNetwork && <UseNetworkCode />}
      {currentPage === HooksType.UseReactive && <UseReactiveCode />}
      {currentPage === HooksType.UseSafaState && <UseSafeStateCode />}
      {currentPage === HooksType.UseScrolling && <UseScrollingCode />}
      {currentPage === HooksType.UseSelection && <UseSelectionCode />}
      {currentPage === HooksType.UseSize && <UseSizeCode />}
      {currentPage === HooksType.UseTextSelection && <UseTextSelectionCode />}
      {currentPage === HooksType.UseTimeout && <UseTimeoutCode />}
      {currentPage === HooksType.UseUnmountedRef && <UseUnmountedRefCode />}
      {currentPage === HooksType.UseScrollDetect && <UseScrollDetectCode />}
      {currentPage === HooksType.UseStepProgress && <UseStepProgressCode />}
      {currentPage === HooksType.UseWhyDidYouUpdate && (
        <UseWhyDidYouUpdateCode />
      )}
    </>
  );
};

export default CustomHooks;
