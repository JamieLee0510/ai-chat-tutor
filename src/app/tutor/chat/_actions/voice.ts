"use client";

import { elevenlabsKey, voiceId } from "@/lib/const";
import { useTutorAudioStore } from "../_store/audioStore";

/**
 * will use elevenlab api to STT. using browser audio to play voice.
 * @param text
 * @param callback
 * @param audioSrcCallback
 */
export const speakText = async (text: string, callback?: () => void) => {
    const speakingAudioRes = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": elevenlabsKey,
            },
            body: JSON.stringify({ text: text }),
        }
    );
    const result = await speakingAudioRes.blob();

    const audioUrl = URL.createObjectURL(result);

    const audio = new Audio(audioUrl);

    audio.play();

    await new Promise<void>((resolve) => {
        audio.addEventListener("ended", () => {
            resolve();

            // execute callback logic after audio play end
            if (callback) {
                callback();
            }
        });
    });
};
