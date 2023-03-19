import React from "react";

function BookItem({ title, url }: { title: string; url: string }) {
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
const MemoBookItem = React.memo(BookItem);

function Aside() {
  return (
    <div className="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <a className="font-display uppercase text-xl flex py-3 px-2 items-center gap-3 transition-colors duration-200 text-white cursor-pointer mb-2 flex-shrink-0">
              Meditations
            </a>
            <MemoBookItem
              title="The First Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_FIRST_BOOK"
            />
            <MemoBookItem
              title="The Second Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_SECOND_BOOK"
            />
            <MemoBookItem
              title="The Third Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_THIRD_BOOK"
            />
            <MemoBookItem
              title="The Forth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_FOURTH_BOOK"
            />
            <MemoBookItem
              title="The Fifth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_FIFTH_BOOK"
            />
            <MemoBookItem
              title="The Sixth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_SIXTH_BOOK"
            />
            <MemoBookItem
              title="The Seventh Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_SEVENTH_BOOK"
            />
            <MemoBookItem
              title="The Eighth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_EIGHTH_BOOK"
            />
            <MemoBookItem
              title="The Ninth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_NINTH_BOOK"
            />
            <MemoBookItem
              title="The Tenth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_TENTH_BOOK"
            />
            <MemoBookItem
              title="The Eleventh Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_ELEVENTH_BOOK"
            />
            <MemoBookItem
              title="The Twelfth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_TWELFTH_BOOK"
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Aside);
