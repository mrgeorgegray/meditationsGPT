import Head from "next/head";
import React from "react";
import axios from "axios";

import { FileLite } from "@/types/file";
import FileQandA from "@/components/FileQandA";
import { Loader } from "@/components/Loader";
import FileList from "@/components/FileList";
import FileUpload from "@/components/FileUpload";
import Aside from "@/components/Aside";

export interface HomePageProps {
  books: FileLite[];
}

export default function Home() {
  const [isLoaded, setLoaded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState<string | null>(null);
  const [files, setFiles] = React.useState<FileLite[]>([]);

  React.useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data } = await axios.get<{ books: FileLite[] }>(
          "/api/static-data"
        );
        setFiles(data.books);
      } catch (error) {
        console.log("Error fetching static data:", error);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };

    if (!isLoaded) {
      bootstrap();
    }
  }, [isLoaded]);

  return (
    <>
      <Head>
        <title>Meditations GPT</title>
        <meta
          name="description"
          content="Explore the writings of Marcus Aurelius – His Meditations concerning himself."
        />
      </Head>
      <div className="overflow-hidden w-full h-full relative">
        <div className="flex h-full flex-1 flex-col md:pl-[260px]">
          <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
            {isLoading && (
              <div className="h-full mt-6 sm:mt-[20vh]">
                <Loader />
              </div>
            )}
            {isError && (
              <p className="text-red-600 font-medium mb-2">
                Error, something went wrong.
              </p>
            )}
            {!isLoading && !isError && (
              <>
                <FileQandA files={files} />
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
              </>
            )}
          </main>
        </div>

        <Aside />
      </div>
    </>
  );
}
