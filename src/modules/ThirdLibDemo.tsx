import { FC } from "react";
import { ThirdParyLibrary } from "../menu/Menu";
import { MenuKey } from "../App";
import DndPage1 from "../third-party-lib/react-dnd/react-dnd-1/Page";
import ClickToComponentDemo from "../third-party-lib/click-to-component";
import SpringBox1 from "../third-party-lib/react-spring/spring-1/SpringBox1";
import DndPage2 from "../third-party-lib/react-dnd/react-dnd-2/DndPage2";
import SpringBox2 from "../third-party-lib/react-spring/spring-2/SpringBox2";
import SpringBox3 from "../third-party-lib/react-spring/spring-3/SpringBox3";
import Springs from "../third-party-lib/react-spring/springs/Springs";
import Viewpager from "../third-party-lib/use-gestrue/GestureDemo";
import TestZustand from "../zustand/TestZustand";
import FlowBase from "../third-party-lib/react-flow/base-use/FlowBase";
import AudioPlayer from "../third-party-lib/react-flow/audio-player/AudioPlayer";
import Piano from "../third-party-lib/react-flow/online-piano";

interface ThirdLibProps {
  currentPage?: MenuKey;
}

const ThirdLibDemo: FC<ThirdLibProps> = (props) => {
  const { currentPage } = props;

  return (
    <>
      {/* Dnd基础拖拽示例 */}
      {currentPage === ThirdParyLibrary.ReactDnd1 && <DndPage1 />}
      {/* Dnd进阶拖拽示例 */}
      {currentPage === ThirdParyLibrary.ReactDnd2 && <DndPage2 />}
      {/* react-spring简单示例1 */}
      {currentPage === ThirdParyLibrary.ReactSpring1 && <SpringBox1 />}
      {/* react-spring简单示例2 */}
      {currentPage === ThirdParyLibrary.ReactSpring2 && <SpringBox2 />}
      {/* react-spring简单示例3 */}
      {currentPage === ThirdParyLibrary.ReactSpring3 && <SpringBox3 />}
      {/* react-spring综合示例 */}
      {currentPage === ThirdParyLibrary.ReactSprings && <Springs />}
      {/* UseGesture & react-spring 手势动画示例 */}
      {currentPage === ThirdParyLibrary.UseGesture && <Viewpager />}
      {/** zustand 实现 */}
      {currentPage === ThirdParyLibrary.Zustand && <TestZustand />}
      {/** clickToComponent */}
      {currentPage === ThirdParyLibrary.ToComponent && <ClickToComponentDemo />}
      {/** reactFlowBase */}
      {currentPage === ThirdParyLibrary.ReactFlowBase && <FlowBase />}
      {/* AudioPlayer */}
      {currentPage === ThirdParyLibrary.ReactFlowAudioPlay && <AudioPlayer />}
      {/* OnlinePiano */}
      {currentPage === ThirdParyLibrary.AudioContext && <Piano />}
    </>
  );
};

export default ThirdLibDemo;
