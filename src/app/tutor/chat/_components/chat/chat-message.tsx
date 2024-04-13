"use client";
import { elevenlabsKey, voiceId } from "@/lib/const";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";

// TODO: message should be openai response type
export default function ChatMessage({ message }: { message: any }) {
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const direction = message.role == "assistant" ? "left" : "right";
    const feedbackHandler = () => {};
    const voice = async () => {
        if (isPlayingAudio) {
            toast.warning("Tutor is speaking");
            return;
        }
        setIsPlayingAudio(true);
        try {
            const response = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "xi-api-key": elevenlabsKey,
                    },
                    body: JSON.stringify({ text: message.content }),
                }
            );
            const result = await response.blob();

            const audioUrl = URL.createObjectURL(result);
            const audio = new Audio(audioUrl);

            audio.play();
            await new Promise<void>((resolve) => {
                audio.addEventListener("ended", () => {
                    // could execute logic after audio play end
                    setIsPlayingAudio(false);
                    resolve();
                });
            });
        } catch (err: any) {
            console.log(err.message);
            toast.error("something wrong");
        }
    };
    return (
        <div>
            <div
                className={
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm  " +
                    (direction == "left"
                        ? "bg-gray-300 dark:bg-gray-900"
                        : " ml-auto bg-blue-600 text-white")
                }
            >
                <Markdown>{message.content}</Markdown>
            </div>
            {direction == "right" ? (
                <span
                    className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-0 text-cyan-800 text-[.75rem] ml-auto underline cursor-pointer"
                    onClick={feedbackHandler}
                >
                    Feedback
                </span>
            ) : (
                <span
                    className="cursor-pointer flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-0 text-blue-800 text-[.75rem] underline"
                    onClick={voice}
                >
                    Read outloud
                </span>
            )}
        </div>

        // <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm">
        //     Hey, Im having trouble with my account.
        // </div>
    );
}
