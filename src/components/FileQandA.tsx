import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ScrollToBottom from "react-scroll-to-bottom";

import { FileChunk, FileLite } from "@/types/file";
import NoSsr from "@/components/NoSsr";
import marcusAureliusImg from "../../public/marcus_aurelius_sketch.jpg";
import { Loader } from "./Loader";
import EmptyState from "./EmptyState";
import HistoryItem, { HistoryItemProps } from "./HistoryItem";
import SearchInput from "./SearchInput";

type FileQandProps = {
  files: FileLite[];
};

function FileQandA(props: FileQandProps) {
  const [hasAskedQuestion, setHasAskedQuestion] = React.useState(false);
  const [answerError, setAnswerError] = React.useState("");
  const [answerLoading, setAnswerLoading] = React.useState<boolean>(false);
  const [answer, setAnswer] = React.useState("");
  const [answerDone, setAnswerDone] = React.useState(false);
  const [history, setHistory] = React.useState<HistoryItemProps[]>([]);

  const handleSearch = React.useCallback(
    async (question: string) => {
      if (answerLoading) {
        return;
      }

      if (answer.length > 0) {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            role: "marcus",
            message: answer,
          },
        ]);
      }

      setAnswer("");
      setAnswerDone(false);

      if (question.length === 0) {
        setAnswerError("Please ask a question.");
        return;
      }
      if (props.files.length === 0) {
        setAnswerError("Please upload files before asking a question.");
        return;
      }

      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          role: "user",
          message: question,
        },
      ]);
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
    },
    [answerLoading, answer, props.files]
  );

  const isEmpty = !hasAskedQuestion && history.length === 0;

  return (
    <NoSsr>
      <div className="flex-1 overflow-hidden">
        <ScrollToBottom className="h-full">
          <div className="relative h-full">
            <div className="flex flex-col items-center text-sm">
              {isEmpty && <EmptyState />}
              {history.map((item) => (
                <HistoryItem key={item.id} {...item} />
              ))}
              {hasAskedQuestion && !answer && (
                <div
                  className={`group w-full text-gray-800 border-b border-black/10 bg-gray-50 py-4`}
                >
                  <Loader height="50px" />
                </div>
              )}
              {hasAskedQuestion && answer && (
                <div
                  className={`group w-full text-gray-800 border-b border-black/10 bg-gray-50`}
                >
                  <div className="text-base gap-2 md:gap-4 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                    <div className="w-[40px] flex flex-col relative items-end">
                      <div className="relative flex">
                        <Image
                          alt="Marcus Aurelius Sketch"
                          src={marcusAureliusImg}
                          width={40}
                          height={40}
                          className="rounded-md overflow-hidden"
                        />
                      </div>
                    </div>
                    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="flex flex-grow flex-col gap-3">
                        <ReactMarkdown
                          className="prose min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap"
                          linkTarget="_blank"
                        >
                          {`${answer}${answerDone ? "" : "  |"}`}
                        </ReactMarkdown>
                      </div>
                    </div>
                    {/* <FileList files={props.files} title="Sources" /> */}
                  </div>
                </div>
              )}
              <div className="w-full h-32 md:h-48 flex-shrink-0" />
            </div>
          </div>
        </ScrollToBottom>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 md:border-transparent md:bg-vert-light-gradient bg-white md:!bg-transparent pt-2">
        {answerError && (
          <p className="text-red-600 font-medium mb-2">{answerError}</p>
        )}
        <SearchInput
          answerLoading={answerLoading}
          handleSearch={handleSearch}
        />
      </div>
    </NoSsr>
  );
}

export default React.memo(FileQandA);
