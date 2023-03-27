import React from "react";

import { FileLite } from "@/types/file";
import FileList from "@/components/UploadTools/FileList";
import FileUpload from "@/components/UploadTools/FileUpload";

export interface UploadToolsProps {
  files: FileLite[];
  setFiles: React.Dispatch<React.SetStateAction<FileLite[]>>;
}

function UploadTools({ files, setFiles }: UploadToolsProps) {
  return (
    <>
      <hr />
      <h2>Upload</h2>
      <FileUpload
        handleSetFiles={setFiles}
        maxNumFiles={75}
        maxFileSizeMB={30}
      />

      <hr />
      <h2>Files: {files.length}</h2>
      <FileList files={files} />
    </>
  );
}

export default React.memo(UploadTools);
