// import { IncomingForm, File, Fields, Files } from "formidable";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import OpenAI from "openai";
import type { ReadableStream } from "node:stream/web";

const openai = new OpenAI({
    apiKey: process.env.OEPNAI_API_KEY,
});
const writeFileAsync = promisify(fs.writeFile);

// export const config = {
//     api: {
//         bodyParser: false, // 必须禁用 Next.js 默认的 JSON 解析器
//     },
// };

// will using openai stt service
export const POST = async (req: Request) => {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob;

    try {
        // TODO: checking the type
        const stream = audioFile.stream() as ReadableStream;

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        // Write buffer to a temporary file
        const tempFilePath = path.join(__dirname, "tempAudioFile.mp3");
        await writeFileAsync(tempFilePath, buffer);

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: "whisper-1",
        });

        // Optionally delete the temp file after processing
        fs.unlinkSync(tempFilePath);
        return Response.json({ transcription: transcription.text });
    } catch (err) {
        console.log(err);
        return Response.error();
    }
};
