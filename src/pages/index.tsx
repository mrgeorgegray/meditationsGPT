import Head from "next/head";
import React from "react";
import axios from "axios";

import { FileLite } from "@/types/file";
import FileQandA from "@/components/FileQandA";
import FileList from "@/components/FileList";
import FileUpload from "@/components/FileUpload";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  return (
    <>
      <Head>
        <title>Meditations GPT</title>
        <meta name="description" content="Meditations GPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Meditations GPT</h1>

        <hr />
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
      </main>
    </>
  );
}
