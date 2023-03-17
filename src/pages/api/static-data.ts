import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

import { FileLite } from "@/types/file";

type Data = {
  books: FileLite[];
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const booksRoot = path.join(process.cwd(), "data", "embeddings");
  const allFiles = await fs.readdir(booksRoot);
  const bookPaths = allFiles.filter((file) => path.extname(file) === ".json");

  const data = await Promise.all(
    bookPaths.map(async (bookPath) => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const bookData = await fs.readFile(
        path.join(booksRoot, bookPath),
        "utf8"
      );
      return JSON.parse(bookData);
    })
  );

  res.status(200).json({
    books: data,
  });
}
