"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useChatStore } from "../../../_store/chatStore";
import { generateGptResponse } from "../../../_actions/gpt";
import { GptError } from "@/lib/error";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    RecordingAudio,
    StartRecordAudio,
    VoiceLoading,
} from "@/components/icons/record-relate";
import { useTutorAudioStore } from "../../../_store/audioStore";
import { useCurrTutorStore } from "../../../_store/tutorStore";

let chunks: any[] = [];
let mediaRecorder: any = null;
let audioBlob: any = null;

function mediaRecorderDataAvailable(e: any) {
    chunks.push(e.data);
}

function mediaRecorderStop() {
    audioBlob = new Blob(chunks, { type: "audio/mp3" });
    // reset to default
    mediaRecorder = null;
    chunks = [];
}

function resetRecording() {
    audioBlob = null;
}

const btnStatus = {
    waitingForRecording: "waitingForRecording",
    isRecording: "isRecording",
    isLoading: "isLoading",
};
export default function ChatAudioRecorder() {
    const [recordingStatus, setRecording] = useState(
        btnStatus.waitingForRecording
    );
    const { chatMessages, setChatMessages } = useChatStore();
    const { currTutor } = useCurrTutorStore();

    const { tutorSpeak } = useTutorAudioStore();

    const record = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Your browser does not support recording!");
            return;
        }
        if (recordingStatus == btnStatus.isRecording) return;

        setRecording(btnStatus.isRecording);
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = mediaRecorderDataAvailable;
                mediaRecorder.onstop = mediaRecorderStop;
            })
            .catch((err) => {
                alert(`The following error occurred: ${err}`);
            });
    };

    const stopAndSendRecord = () => {
        mediaRecorder.stop(); // 這原本是放在 record function中
        setTimeout(async () => {
            const formData = new FormData();
            setRecording(btnStatus.isLoading);
            formData.append("audio", audioBlob, "recording.mp3");
            try {
                const response = await fetch("/api/gpt", {
                    method: "POST",
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error("something wrong with STT service");
                }

                const { transcription } = await response.json();
                const newMsgRecords = [
                    ...chatMessages,
                    { role: "user", content: transcription },
                ];
                setChatMessages(newMsgRecords);

                const tutorResponse = (await generateGptResponse(
                    newMsgRecords
                )) as string;

                if (tutorResponse == GptError.responseErr) {
                    toast.error(GptError.responseErr);
                } else {
                    setChatMessages([
                        ...newMsgRecords,
                        { role: "assistant", content: tutorResponse },
                    ]);
                    await tutorSpeak(tutorResponse, currTutor!.voiceId, () => {
                        // TODO: 看還有沒有需要啥，在audio播放完畢後
                        resetRecording();
                        setRecording(btnStatus.waitingForRecording);
                    });
                }
            } catch (err: any) {
                alert(err.message);
            }
        }, 0);
    };
    return (
        <TooltipProvider>
            <div className="w-full min-h-[100px] flex justify-center">
                {recordingStatus == btnStatus.waitingForRecording ? (
                    <Tooltip>
                        <TooltipTrigger>
                            <button onClick={record}>
                                <div className="w-[45px] h-[45px] bg-[#0d7aefe6] rounded-full p-3">
                                    <StartRecordAudio />
                                </div>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Click and start speaking</p>
                        </TooltipContent>
                    </Tooltip>
                ) : recordingStatus == btnStatus.isRecording ? (
                    <Tooltip>
                        <TooltipTrigger>
                            <button onClick={stopAndSendRecord}>
                                <div className="w-[70px] h-[70px]">
                                    <RecordingAudio />
                                </div>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Click to stop recording and send to AI tutor</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="w-[70px] h-[70px]">
                                <VoiceLoading />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Give AI tutor some time to think</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        </TooltipProvider>
    );
}
