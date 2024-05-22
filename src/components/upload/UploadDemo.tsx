import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "./index";
import "./index.scss";

const UploadDemo = () => {
  const props: UploadProps = {
    name: "file",
    action: "http://localhost:3333/upload",
    drag: true,
    accept: ".png, .jpg, .jpeg",
    beforeUpload(file) {
      if (file.name.includes("1.image")) {
        return false;
      }
      return true;
    },
    onSuccess(ret) {
      console.log("onSuccess", ret);
    },
    onError(err) {
      console.log("onError", err);
    },
    onProgress(percentage, file) {
      console.log("onProgress", percentage);
    },
    onChange(file) {
      console.log("onChange", file);
    },
  };
  return (
    <Upload {...props}>
      <p>
        <InboxOutlined style={{ fontSize: "50px" }} />
      </p>
      <span className="text-[12px]">点击或者拖拽文件到此处</span>
    </Upload>
  );
};

export default UploadDemo;
