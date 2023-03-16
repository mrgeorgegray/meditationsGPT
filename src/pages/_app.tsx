import type { AppProps } from "next/app";
import { PT_Serif } from "next/font/google";

import "../styles/globals.css";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ptSerif.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
