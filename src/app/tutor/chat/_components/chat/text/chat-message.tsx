"use client";
import { elevenlabsKey, voiceId } from "@/lib/const";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import FeedbackDialog from "../feedback-dialog";
import { generateGptResponse } from "../../../_actions/gpt";
import { speakText } from "../../../_actions/voice";
import { LoadingSpinner } from "@/components/spinner-loader";
import { useCurrTutorStore } from "../../../_store/tutorStore";
import { useTutorAudioStore } from "../../../_store/audioStore";

const generateFeedbackPrompt = (userText: string) => [
    {
        role: "system",
        content: `You are an expert english teacher. You correct students mistakes by giving valuable and insightful feedbacks. 
        Only give the review and no other content.
        `,
    },
    {
        role: "assistant",
        content: `Which content can I review?`,
    },
    {
        role: "user",
        content: `Review this english text: ${userText} `,
    },
];

// TODO: message should be openai response type
export default function ChatMessage({ message }: { message: any }) {
    const { currTutor } = useCurrTutorStore();
    const { tutorSpeak } = useTutorAudioStore();
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const direction = message.role == "assistant" ? "left" : "right";
    const feedbackHandler = async () => {
        if (isLoadingFeedback) {
            toast.warning("a feedback is loading");
            return;
        }
        const feedbackPrompt = generateFeedbackPrompt(message.content);
        setIsLoadingFeedback(true);
        try {
            const feedback = (await generateGptResponse(
                feedbackPrompt
            )) as string;
            setFeedbackText(feedback);
            setOpenFeedback(true);
        } catch (err) {
            toast.error("Something wrong with feedback feature");
        } finally {
            setIsLoadingFeedback(false);
        }
    };
    const voice = async () => {
        if (isPlayingAudio) {
            toast.warning("Tutor is speaking");
            return;
        }
        setIsPlayingAudio(true);
        try {
            await tutorSpeak(message.content, currTutor!.voiceId, () => {
                setIsPlayingAudio(false);
            });
            // await speakText(message.content, () => {
            //     setIsPlayingAudio(false);
            // });
        } catch (err: any) {
            console.log(err.message);
            toast.error("something wrong");
            setIsPlayingAudio(false);
        }
    };
    return (
        <>
            <FeedbackDialog
                isOpen={openFeedback}
                setIsOpen={setOpenFeedback}
                previousText={message.content}
                feedbackText={feedbackText}
            />
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
                        className="cursor-pointer flex w-max max-w-[75%] flex-row items-center gap-2 rounded-lg px-3 py-0 text-blue-800 text-[.75rem] underline"
                        onClick={voice}
                    >
                        Read outloud
                        {isPlayingAudio && <LoadingSpinner />}
                    </span>
                )}
            </div>
        </>
    );
}
