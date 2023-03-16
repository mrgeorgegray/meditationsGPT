import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { FileChunk, FileLite } from "@/types/file";
import FileList from "@/components/FileList";

type FileQandProps = {
  files: FileLite[];
};

function FileQandA(props: FileQandProps) {
  const questionRef = React.useRef<HTMLInputElement>(null);
  const [hasAskedQuestion, setHasAskedQuestion] = React.useState(false);
  const [answerError, setAnswerError] = React.useState("");
  const [answerLoading, setAnswerLoading] = React.useState<boolean>(false);
  const [answer, setAnswer] = React.useState("");
  const [answerDone, setAnswerDone] = React.useState(false);

  const handleSearch = React.useCallback(async () => {
    if (answerLoading) {
      return;
    }

    const question = questionRef?.current?.value ?? "";
    setAnswer("");
    setAnswerDone(false);

    if (!question) {
      setAnswerError("Please ask a question.");
      return;
    }
    if (props.files.length === 0) {
      setAnswerError("Please upload files before asking a question.");
      return;
    }

    setAnswerLoading(true);
    setAnswerError("");

    let results: FileChunk[] = [];

    try {
      const searchResultsResponse = await axios.post(
        "/api/search-file-chunks",
        {
          searchQuery: question,
          files: props.files,
          maxResults: 10,
        }
      );

      if (searchResultsResponse.status === 200) {
        results = searchResultsResponse.data.searchResults;
      } else {
        setAnswerError("Sorry, something went wrong!");
      }
    } catch (err) {
      setAnswerError("Sorry, something went wrong!");
    }

    setHasAskedQuestion(true);

    const res = await fetch("/api/get-answer-from-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        fileChunks: results,
      }),
    });
    const reader = res.body!.getReader();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setAnswerDone(true);
        break;
      }
      setAnswer((prev) => prev + new TextDecoder().decode(value));
    }

    setAnswerLoading(false);
  }, [props.files, answerLoading]);

  const handleEnterInSearchBar = React.useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        await handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div>
      <div>
        <input
          placeholder="Ask a question..."
          name="search"
          ref={questionRef}
          onKeyDown={handleEnterInSearchBar}
        />
        <button onClick={handleSearch}>
          {answerLoading ? "Answering..." : "Ask"}
        </button>
      </div>
      <div>
        {answerError && <p>{answerError}</p>}

        {hasAskedQuestion && answer && (
          <div>
            <ReactMarkdown className="prose" linkTarget="_blank">
              {`${answer}${answerDone ? "" : "  |"}`}
            </ReactMarkdown>

            <FileList files={props.files} title="Sources" />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(FileQandA);
