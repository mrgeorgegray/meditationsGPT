import React from "react";

import { FileLite } from "@/types/file";
import FileItem from "@/components/FileItem";

type FileListProps = {
  files: FileLite[];
  title?: string;
};

function FileList(props: FileListProps) {
  const fileCount = props.files.length;

  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      {fileCount > 0 &&
        props.files.map((file) => <FileItem key={file.name} file={file} />)}
    </>
  );
}

export default React.memo(FileList);
