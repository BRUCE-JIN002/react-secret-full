import { FC, useRef, ChangeEvent, PropsWithChildren, useState } from "react";
import axios from "axios";
import UploadList, { UploadFile } from "./UplaodList";
import "./index.scss";
import { Dragger } from "./UploadDragger";

export interface UploadProps extends PropsWithChildren {
  action: string; //上传的url
  headers?: Record<string, any>; //请求头
  name?: string; //文件的表单字段名
  data?: Record<string, any>; //携带的数据
  withCredentials?: boolean; //当前请求为跨域时是否携带Cookies
  accept?: string; //接受的文件格式
  multiple?: boolean; //是否可多选, children为隐藏的 file input
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  drag: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  // 创建 CancelToken 实例
  const source = axios.CancelToken.source();

  const cancelRequest = () => {
    source.cancel("canceld!!!");
  };

  const post = (file: File) => {
    let uploadFile: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [uploadFile, ...prevList];
    });

    const formData = new FormData();

    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        cancelToken: source.token,
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            updateFileList(uploadFile, {
              percent: percentage,
              status: "uploading",
            });

            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(uploadFile, { status: "success", response: resp.data });

        onSuccess?.(resp.data, file);
        onChange?.(file);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          // 如果请求被取消，这里可以进行相应的处理
          console.log("Request canceled:", err.message);
        }
        updateFileList(uploadFile, { status: "error", error: err });

        onError?.(err, file);
        onChange?.(file);
      });
  };

  return (
    <div className="upload-component">
      <div className="upload-input" onClick={handleClick}>
        {drag ? <Dragger onFile={uploadFiles}>{children}</Dragger> : children}
        <input
          className="upload-file-input"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
        onCancel={cancelRequest}
      />
    </div>
  );
};

export default Upload;
