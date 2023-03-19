import React from "react";

import { Loader } from "./Loader";

interface SearchInputProps {
  handleSearch: (value: string) => void;
  answerLoading: boolean;
}

function SearchInput({ answerLoading, handleSearch }: SearchInputProps) {
  const questionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleChangeQuestion = React.useCallback(
    async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (questionRef.current) {
        questionRef.current.style.height = `24px`;
        questionRef.current.style.height = `${event.target.scrollHeight}px`;
      }
    },
    []
  );

  const handleSubmit = React.useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (questionRef.current) {
        handleSearch(questionRef.current.value);
        questionRef.current.value = "";
      }
    },
    [handleSearch]
  );

  const handleKeyDownQuestion = React.useCallback(
    async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        if (questionRef.current) {
          handleSearch(questionRef.current.value);
          questionRef.current.value = "";
        }
      }
    },
    [handleSearch]
  );

  return (
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
  );
}

export default React.memo(SearchInput);
