import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "./index";
import "./index.scss";

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

const uploadBox = (
  <div className="flex flex-col gap-[16px]">
    <p>
      <InboxOutlined style={{ fontSize: "50px", color: "#2b8ffa" }} />
    </p>
    <span className="text-[14px] font-medium">
      Click or drag file to this area to upload
    </span>
  </div>
);

const UploadDemo = () => {
  return <Upload {...props}>{uploadBox}</Upload>;
};

export default UploadDemo;
