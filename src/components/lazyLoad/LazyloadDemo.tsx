import { ReactNode, useEffect, useState } from "react";
import MyLazyload from ".";
import { Skeleton } from "antd";

const nodeList: ReactNode[] = [];
for (let i = 0; i < 100; i++) {
  nodeList.push(<p key={i}>xxxxxx占位符xxxxxxxxx</p>);
}

export default function LazyloadDemo() {
  const [imgUrl, setImgUrl] = useState<string>();

  useEffect(() => {
    const getImgData = () => {
      return setTimeout(() => {
        setImgUrl(
          "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        );
      }, 1500);
    };
    getImgData();
  }, []);

  return (
    <div className="flex justify-center flex-col items-center">
      {nodeList.map((node) => node)}
      <MyLazyload
        width={350}
        height={200}
        offset={250}
        placeholder={
          <Skeleton.Image active={true} style={{ height: 250, width: 350 }} />
        }
      >
        {imgUrl && (
          <img style={{ height: "100%", width: "100%" }} src={imgUrl} alt="" />
        )}
      </MyLazyload>
    </div>
  );
}
