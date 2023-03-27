import React from "react";

import BookItem from "@/components/BookItem";

function Aside() {
  return (
    <div className="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <a className="font-display uppercase text-xl flex py-3 px-2 items-center gap-3 transition-colors duration-200 text-white cursor-pointer mb-2 flex-shrink-0">
              Meditations
            </a>
            <BookItem
              title="The First Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_FIRST_BOOK"
            />
            <BookItem
              title="The Second Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_SECOND_BOOK"
            />
            <BookItem
              title="The Third Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_THIRD_BOOK"
            />
            <BookItem
              title="The Forth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_FOURTH_BOOK"
            />
            <BookItem
              title="The Fifth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_FIFTH_BOOK"
            />
            <BookItem
              title="The Sixth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_SIXTH_BOOK"
            />
            <BookItem
              title="The Seventh Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_SEVENTH_BOOK"
            />
            <BookItem
              title="The Eighth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_EIGHTH_BOOK"
            />
            <BookItem
              title="The Ninth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_NINTH_BOOK"
            />
            <BookItem
              title="The Tenth Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_TENTH_BOOK"
            />
            <BookItem
              title="The Eleventh Book"
              url="https://en.wikisource.org/wiki/Marcus_Aurelius_Antoninus_-_His_Meditations_concerning_himselfe#THE_ELEVENTH_BOOK"
            />
            <BookItem
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
