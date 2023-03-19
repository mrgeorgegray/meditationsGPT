import type { NextApiRequest, NextApiResponse } from "next";

import { FileChunk } from "@/types/file";
import { chatCompletionStream } from "@/services/openai";
import { ChatCompletionRequestMessage } from "openai";

type Data = {
  answer?: string;
  error?: string;
};

const MAX_FILES_LENGTH = 2000 * 3;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const fileChunks = req.body.fileChunks as FileChunk[];

  const question = req.body.question as string;

  if (!Array.isArray(fileChunks)) {
    res.status(400).json({ error: "fileChunks must be an array" });
    return;
  }

  if (!question) {
    res.status(400).json({ error: "question must be a string" });
    return;
  }

  try {
    const filesString = fileChunks
      .map((fileChunk) => `###\n"${fileChunk.filename}"\n${fileChunk.text}`)
      .join("\n")
      .slice(0, MAX_FILES_LENGTH);

    const messages: Array<ChatCompletionRequestMessage> = [
      {
        role: "system",
        content: `You're Marcus Aurelius, emperor of Rome. You are giving advice to a friend using your writings from the book Meditations as a source. Keep your response friendly short and informative.`,
      },
      {
        role: "user",
        content: `Marcus please could you answer the following question: '${question}'\n\n +
          Please use these selected passages as references from your writings as the source for your answer. Cite these references in your answer."\n\n +
          How to cite a reference: This is a citation [1]. This one too [3]. And this is sentence with many citations [2][3].\n\n +
          This is a reference:\n\n +
          <###\n"filename 1"\nfile text>...\n\n +
          After you have finished answering the question create a list of Sources using all the citations you created in the answer. This list should contain the sources filenames. Use the exact filenames of the source references you used. Do not make up the names of any other files other than those mentioned in the references context."\n\n +
          If you cannot find the answer to the question in the References then say, "I cant find the answer in my writings.\n\n +
          References:\n${filesString}\n\n. +
          Answer:`,
      },
    ];

    const stream = chatCompletionStream({
      messages,
    });

    // Set the response headers for streaming
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });

    // Write the data from the stream to the response
    for await (const data of stream) {
      res.write(data);
    }

    // End the response when the stream is done
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
