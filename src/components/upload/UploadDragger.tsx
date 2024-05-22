import { FC, useState, DragEvent, PropsWithChildren } from "react";
import classNames from "classnames";
import "./index.scss";

interface DraggerProps extends PropsWithChildren {
  onFile: (file: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragover] = useState(false);

  const cs = classNames("upload-dragger", {
    "is-dragover": dragOver,
  });

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragover(false);
    console.log(e.dataTransfer);
    onFile(e.dataTransfer.files);
  };

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragover(over);
  };

  return (
    <div
      className={cs}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
