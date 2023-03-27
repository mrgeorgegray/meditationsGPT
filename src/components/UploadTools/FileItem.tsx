import React from "react";

import { FileLite } from "@/types/file";

type FileItemProps = {
  file: FileLite;
};

function FileItem(props: FileItemProps) {
  const handleDownload = () => {
    const data = JSON.stringify(props.file);
    const blob = new Blob([data], { type: "text/json" });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = `${props.file.name}.json`;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return (
    <div
      style={{
        borderTop: "2px solid #6e6e6e",
        borderBottom: "2px solid #6e6e6e",
        padding: "10px 0",
        margin: "10px 0",
      }}
    >
      <p>
        <strong>{props.file.name}</strong>
      </p>

      <div
        style={{
          height: 100,
          overflowY: "scroll",
          fontSize: "11px",
          margin: "0 0 10px",
        }}
      >
        <p>{props.file.extractedText}</p>
      </div>

      <button onClick={handleDownload}>download</button>

      <a href={props.file.url} target="_blank" rel="noopener noreferrer">
        view
      </a>
    </div>
  );
}

export default React.memo(FileItem);
