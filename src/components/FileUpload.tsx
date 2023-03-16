import React from "react";
import axios from "axios";
import compact from "lodash/compact";

import { FileLite } from "../types/file";

type FileUploadProps = {
  handleSetFiles: React.Dispatch<React.SetStateAction<FileLite[]>>;
  maxNumFiles: number;
  maxFileSizeMB: number;
};

function FileUpload({
  handleSetFiles,
  maxNumFiles,
  maxFileSizeMB,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileLite[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleFileChange = React.useCallback(
    async (selectedFiles: FileList | null) => {
      if (selectedFiles && selectedFiles.length > 0) {
        setError("");

        if (files.length + selectedFiles.length > maxNumFiles) {
          setError(`You can only upload up to ${maxNumFiles} files.`);
          return;
        }

        setLoading(true);

        const uploadedFiles = await Promise.all(
          Array.from(selectedFiles).map(async (file) => {
            // Check the file type
            if (
              file.type.match(
                /(text\/plain|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)|text\/(markdown|x-markdown))/
              ) && // AND file isn't too big
              file.size < maxFileSizeMB * 1024 * 1024
            ) {
              // Check if the file name already exists in the files state
              if (files.find((f) => f.name === file.name)) {
                return null; // Skip this file
              }

              const formData = new FormData();
              formData.append("file", file);
              formData.append("filename", file.name);

              try {
                const processFileResponse = await axios.post(
                  "/api/process-file",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

                if (processFileResponse.status === 200) {
                  const text = processFileResponse.data.text;
                  const meanEmbedding = processFileResponse.data.meanEmbedding;
                  const chunks = processFileResponse.data.chunks;

                  const fileObject: FileLite = {
                    name: file.name,
                    url: URL.createObjectURL(file),
                    type: file.type,
                    size: file.size,
                    embedding: meanEmbedding,
                    chunks,
                    extractedText: text,
                  };

                  return fileObject;
                } else {
                  console.log("Error creating file embedding");
                  return null;
                }
              } catch (err) {
                console.log(`Error creating file embedding: ${err}`);
                return null;
              }
            } else {
              alert(
                `Invalid file type or size. Only TXT, PDF, DOCX or MD are allowed, up to ${maxFileSizeMB}MB.`
              );
              return null; // Skip this file
            }
          })
        );

        // Filter out any null values from the uploadedFiles array
        const validFiles = compact(uploadedFiles);

        // Set the files state with the valid files and the existing files
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        handleSetFiles((prevFiles) => [...prevFiles, ...validFiles]);

        setLoading(false);
      }
    },
    [files, handleSetFiles, maxFileSizeMB, maxNumFiles]
  );

  return (
    <div>
      <label htmlFor="file-upload">
        <div>
          {loading ? (
            <p>Uploading...</p>
          ) : (
            <div>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={(event) => handleFileChange(event.target.files)}
              />
            </div>
          )}
        </div>
      </label>

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(FileUpload);
