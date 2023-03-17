import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ScrollToBottom from "react-scroll-to-bottom";

import { FileChunk, FileLite } from "@/types/file";
import FileList from "@/components/FileList";
import NoSsr from "@/components/NoSsr";
import marcusAureliusImg from "../../public/marcus_aurelius_sketch.jpg";
import questionMarkImg from "../../public/question_mark_72.png";
import { Loader } from "./Loader";

type FileQandProps = {
  files: FileLite[];
};

type HistoryItem = {
  id: string;
  role: "user" | "marcus";
  message: string;
};

function FileQandA(props: FileQandProps) {
  const questionRef = React.useRef<HTMLTextAreaElement>(null);
  const [hasAskedQuestion, setHasAskedQuestion] = React.useState(false);
  const [answerError, setAnswerError] = React.useState("");
  const [answerLoading, setAnswerLoading] = React.useState<boolean>(false);
  const [answer, setAnswer] = React.useState("");
  const [answerDone, setAnswerDone] = React.useState(false);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  const handleSearch = React.useCallback(async () => {
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
    if (questionRef.current) {
      questionRef.current.value = "";
    }

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
  }, [answerLoading, answer, props.files]);

  const handleChangeQuestion = React.useCallback(
    async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (questionRef.current) {
        questionRef.current.style.height = `24px`;
        questionRef.current.style.height = `${event.target.scrollHeight}px`;
      }
    },
    []
  );

  const handleKeyDownQuestion = React.useCallback(
    async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleSubmit = React.useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSearch();
    },
    [handleSearch]
  );

  const isEmpty = !hasAskedQuestion && history.length === 0;

  return (
    <NoSsr>
      <div className="flex-1 overflow-hidden">
        <ScrollToBottom className="h-full">
          <div className="relative h-full">
            <div className="flex flex-col items-center text-sm">
              {isEmpty && (
                <div className="text-center max-w-lg">
                  <h1 className="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-2 sm:mb-4 flex gap-2 items-center justify-center">
                    Meditations
                  </h1>
                  <Image
                    alt="Marcus Aurelius Sketch"
                    src={marcusAureliusImg}
                    width={100}
                    height={100}
                    className="rounded-md overflow-hidden mx-auto"
                  />
                  <p className="text-xl mt-4">
                    Explore the writings of Marcus Aurelius –<br /> His
                    Meditations concerning himself.
                  </p>
                </div>
              )}
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`group w-full text-gray-800 border-b border-black/10 ${
                    item.role === "marcus" ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="text-base gap-2 md:gap-4 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                    <div className="w-[40px] flex flex-col relative items-end">
                      <div className="relative flex">
                        {item.role === "user" ? (
                          <Image
                            alt="User"
                            src={questionMarkImg}
                            width={30}
                            height={30}
                            className="rounded-md overflow-hidden"
                          />
                        ) : (
                          <Image
                            alt="Marcus Aurelius Sketch"
                            src={marcusAureliusImg}
                            width={40}
                            height={40}
                            className="rounded-md overflow-hidden"
                          />
                        )}
                      </div>
                    </div>
                    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="flex flex-grow flex-col gap-3">
                        <ReactMarkdown
                          className="prose min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap"
                          linkTarget="_blank"
                        >
                          {item.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
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
        <form
          className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
          onSubmit={handleSubmit}
        >
          <div className="relative flex h-full flex-1 md:flex-col">
            <div className="flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center" />
            <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">
              <textarea
                className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 md:pl-0"
                placeholder={
                  answerLoading ? "Answering..." : "Ask Marcus a question..."
                }
                name="search"
                ref={questionRef}
                style={{
                  height: "24px",
                  overflowY: "hidden",
                  maxHeight: "300px",
                  outline: "none",
                }}
                onChange={handleChangeQuestion}
                onKeyDown={handleKeyDownQuestion}
                disabled={answerLoading}
              />
              <button
                className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100  disabled:hover:bg-transparent"
                type="submit"
                disabled={answerLoading}
              >
                {answerLoading ? (
                  <Loader
                    height="24px"
                    width="24px"
                    top="2px"
                    position="relative"
                  />
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </NoSsr>
  );
}

export default React.memo(FileQandA);
