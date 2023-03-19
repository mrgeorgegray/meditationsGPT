import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import marcusAureliusImg from "../../public/marcus_aurelius_sketch.jpg";
import questionMarkImg from "../../public/question_mark_72.png";

export type HistoryItemProps = {
  id: string;
  role: "user" | "marcus";
  message: string;
};

function HistoryItem(item: HistoryItemProps) {
  return (
    <div
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
  );
}

export default React.memo(HistoryItem);
