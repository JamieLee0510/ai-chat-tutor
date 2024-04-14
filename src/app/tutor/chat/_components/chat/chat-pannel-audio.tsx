"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useChatStore } from "../../_store/chatStore";
import { generateGptResponse } from "../../_actions/gpt";
import { GptError } from "@/lib/error";
import { elevenlabsKey, voiceId } from "@/lib/const";

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

export default function ChatAudioPannel() {
    const [recordingStatus, setRecording] = useState(
        btnStatus.waitingForRecording
    );
    const { chatMessages, setChatMessages } = useChatStore();

    const record = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Your browser does not support recording!");
            return;
        }
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
                // TODO: 是不是需要找STT的東西？
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
                debugger;
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
                    const speakingAudioRes = await fetch(
                        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "xi-api-key": elevenlabsKey,
                            },
                            body: JSON.stringify({ text: tutorResponse }),
                        }
                    );
                    const result = await speakingAudioRes.blob();

                    const audioUrl = URL.createObjectURL(result);
                    const audio = new Audio(audioUrl);

                    audio.play();
                    await new Promise<void>((resolve) => {
                        audio.addEventListener("ended", () => {
                            // could execute logic after audio play end
                            //setIsPlayingAudio(false);
                            resolve();
                        });
                    });
                }
            } catch (err: any) {
                alert(err.message);
            } finally {
                resetRecording();
                setRecording(btnStatus.waitingForRecording);
            }
        }, 0);
    };
    return (
        <div>
            ChatAudioPannel
            <div>
                {recordingStatus == btnStatus.waitingForRecording ? (
                    <button onClick={record}>開始錄音</button>
                ) : recordingStatus == btnStatus.isRecording ? (
                    <button onClick={stopAndSendRecord}>停止錄音並發送</button>
                ) : (
                    <div> 讓我思考一下 </div>
                )}
            </div>
        </div>
    );
}
