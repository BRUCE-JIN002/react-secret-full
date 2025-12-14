export const useDocumentTitleCodeString = `import { useEffect, useRef } from "react";

//使用useRef改变页面标题
const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  //页面内加载时： 旧title
  //加载后： 新title
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //如果不指定依赖， 读到的就是旧的title
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

export default useDocumentTitle;

`;
