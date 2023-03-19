import React from "react";
import Image from "next/image";

import marcusAureliusImg from "../../public/marcus_aurelius_sketch.jpg";

function EmptyState() {
  return (
    <div className="text-center max-w-lg">
      <h1 className="font-display uppercase tracking-tight text-5xl text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-2 sm:mb-4 flex gap-2 items-center justify-center">
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
        Explore the writings of Marcus Aurelius –<br /> His Meditations
        concerning himself.
      </p>
    </div>
  );
}

export default React.memo(EmptyState);
