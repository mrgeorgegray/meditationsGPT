import React from "react";

interface BookItemProps {
  title: string;
  url: string;
}

function BookItem({ title, url }: BookItemProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex py-1 px-3 items-center gap-3 hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="#fff"
      >
        <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
        <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
      </svg>
      {title}
    </a>
  );
}
export default React.memo(BookItem);
