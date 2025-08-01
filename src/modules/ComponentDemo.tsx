import { FC } from "react";
import { ComponentsType } from "../menu/Menu";
import { MenuKey } from "../App";
import CountDemo from "../components/countDown";
import MinCalendarDemo from "../components/miniCalendar/Demo";
import CalendarDemo from "../components/calendar/CalendarDemo";
import IconDemo from "../components/Icon/IconDemo";
import WatermarkDemo from "../components/watermark/WatermarkDemo";
import SpaceDemo from "../components/space/SpaceDemo";
import CodeDemo from "../components/code/CodeDemo";
import PopoverDemo from "../components/popover/PopoverDemo";
import MessageDemo from "../components/message/MessageDemo";
import OnBoardingDemo from "../components/onBoarding/Demo";
import FormDemo from "../components/form/FormDemo";
import UploadDemo from "../components/upload/UploadDemo";
import LazyloadDemo from "../components/lazyLoad/LazyloadDemo";
import SlidInOverlayDemo from "../components/slideInOverlay/SlidInOverlayDemo";
import ModalDemo from "../components/modal/ModalDemo";
import CheckCardDemo from "../components/checkCard/CheckCardDemo";
import MyQRcode from "../components/QRCode/QrCode";
import TabDemo from "../components/Tab";

interface IComponentProps {
  currentPage?: MenuKey;
}

const ComponentDemo: FC<IComponentProps> = (props) => {
  const { currentPage } = props;

  return (
    <>
      {/** 倒计时 */}
      {currentPage === ComponentsType.CountDown && <CountDemo />}
      {/** 迷你日历 */}
      {currentPage === ComponentsType.MinCalendar && <MinCalendarDemo />}
      {/* 日历组件 */}
      {currentPage === ComponentsType.Calendar && <CalendarDemo />}
      {/* Icon组件 */}
      {currentPage === ComponentsType.Icon && <IconDemo />}
      {/* 二维码组件 */}
      {currentPage === ComponentsType.QRcode && <MyQRcode />}
      {/** 水印组件 */}
      {currentPage === ComponentsType.Watermark && <WatermarkDemo />}
      {/* Space组件 */}
      {currentPage === ComponentsType.Space && <SpaceDemo />}
      {/* 代码块 */}
      {currentPage === ComponentsType.CodeDemo && <CodeDemo />}
      {/* Popover */}
      {currentPage === ComponentsType.Popover && <PopoverDemo />}
      {/* Message */}
      {currentPage === ComponentsType.Message && <MessageDemo />}
      {/* OnBoarding */}
      {currentPage === ComponentsType.OnBoarding && <OnBoardingDemo />}
      {/** Form */}
      {currentPage === ComponentsType.Form && <FormDemo />}
      {/** Upload */}
      {currentPage === ComponentsType.Upload && <UploadDemo />}
      {/** Lazyload */}
      {currentPage === ComponentsType.Lazyload && <LazyloadDemo />}
      {/** SlidInOverlay */}
      {currentPage === ComponentsType.SlidInOverlay && <SlidInOverlayDemo />}
      {/** Modal */}
      {currentPage === ComponentsType.Modal && <ModalDemo />}
      {/** CheckCard */}
      {currentPage === ComponentsType.CheckCard && <CheckCardDemo />}
      {/** Tab */}
      {currentPage === ComponentsType.Tab && <TabDemo />}
    </>
  );
};

export default ComponentDemo;
