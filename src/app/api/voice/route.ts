import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const elevenlabsKey = process.env.ELEVENLAB_KEY as string;

export const POST = async (req: NextRequest) => {
    const { text, voiceId } = await req.json();
    const speakingAudioRes = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": elevenlabsKey,
            },
            body: JSON.stringify({ text }),
        }
    );

    const blob = await speakingAudioRes.blob();

    const headers = new Headers();

    headers.set("Content-Type", "audio/mpeg");

    // or just use new Response ❗️
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
};
