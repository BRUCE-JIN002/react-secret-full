import { Input } from "antd";
import { create } from "./zustand";

const useTestStore = create((set) => ({
  aaa: "",
  bbb: "",
  updateAaa: (value) => set(() => ({ aaa: value })),
  updateBbb: (value) => set(() => ({ bbb: value })),
}));

export default function TestZustand() {
  const updateAaa = useTestStore((state) => state.updateAaa);
  const updateBbb = useTestStore((state) => state.updateBbb);
  const aaa = useTestStore((state) => state.aaa);
  const bbb = useTestStore((state) => state.bbb);

  return (
    <div>
      <div className="mb-[10px]">My Zustand Test</div>
      <Input onChange={(e) => updateAaa(e.currentTarget.value)} value={aaa} />
      <div className="h-[8px]" />
      <Input onChange={(e) => updateBbb(e.currentTarget.value)} value={bbb} />
      <Bbb></Bbb>
    </div>
  );
}

function Bbb() {
  return (
    <div>
      <Ccc></Ccc>
    </div>
  );
}

function Ccc() {
  const aaa = useTestStore((state) => state.aaa);
  const bbb = useTestStore((state) => state.bbb);

  return (
    <>
      <p>aaa: {aaa}</p>
      <p>bbb: {bbb}</p>
    </>
  );
}
