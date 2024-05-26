import { ReactNode } from "react";
import MyLazyload from ".";
import { Skeleton } from "antd";

const list: ReactNode[] = [];
for (let i = 0; i < 100; i++) {
  list.push(<p key={i}>xxxxxx占位符xxxxxxxxx</p>);
}
export default function LazyloadDemo() {
  return (
    <div>
      {list.map((node) => node)}

      <MyLazyload
        width={350}
        height={200}
        offset={250}
        placeholder={
          <Skeleton.Image active={true} style={{ height: 250, width: 350 }} />
        }
      >
        <img
          style={{ height: "100%", width: "100%" }}
          src={
            "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }
          alt=""
        />
      </MyLazyload>
    </div>
  );
}
