import { FC } from "react";
import { Progress } from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import "./index.scss";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: "ready" | "uploading" | "success" | "error";
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="upload-list">
      {fileList.map((item) => {
        return (
          <li
            className={`upload-list-item upload-list-item-${item.status}`}
            key={item.uid}
          >
            <span className="file-name">
              {(item.status === "uploading" || item.status === "ready") && (
                <LoadingOutlined style={{ color: "#2b8ffa" }} />
              )}
              {item.status === "success" && <PaperClipOutlined />}
              {item.status === "error" && <PaperClipOutlined />}
              {item.name}
            </span>
            <span className="file-actions">
              {(item.status === "error" || item.status === "success") && (
                <DeleteOutlined
                  title={
                    item.status === "error" || item.status === "success"
                      ? "删除"
                      : "取消"
                  }
                  onClick={() => {
                    onRemove(item);
                  }}
                />
              )}
            </span>
            {item.status === "uploading" && (
              <Progress
                percent={item.percent || 0}
                strokeColor={"#2b8ffa"}
                size="small"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
