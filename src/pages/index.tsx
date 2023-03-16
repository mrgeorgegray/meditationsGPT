import Head from "next/head";
import React from "react";

import { FileLite } from "@/types/file";
import FileQandA from "@/components/FileQandA";
import FileList from "@/components/FileList";
import FileUpload from "@/components/FileUpload";

import { data } from "@/data";

export interface HomePageProps {
  books: FileLite[];
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Meditations GPT</title>
        <meta name="description" content="Meditations GPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-hidden w-full h-full relative">
        <div className="flex h-full flex-1 flex-col">
          <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
            <FileQandA files={data} />

            {/* <hr />
            <h2>Upload</h2>
            <FileUpload
              handleSetFiles={setFiles}
              maxNumFiles={75}
              maxFileSizeMB={30}
            />

            <hr />
            <h2>Files: {files.length}</h2>
            <FileList files={files} /> */}
          </main>
        </div>
      </div>
    </>
  );
}
