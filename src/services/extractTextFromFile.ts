import fs from "fs";

export default async function extractTextFromFile({
  filepath,
  filetype,
}: {
  filepath: string;
  filetype: string;
}): Promise<string> {
  const buffer: Buffer = await new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filepath);
    const chunks: any[] = [];

    fileStream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    fileStream.on("error", (error) => {
      reject(error);
    });
    fileStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });

  // only support plain text for now
  switch (filetype) {
    case "text/plain":
      return buffer.toString();
    case "application/pdf":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "text/markdown":
    case "text/csv":
    case "text/html":
    default:
      throw new Error("Unsupported file type");
  }
}
