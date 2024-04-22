"use client";
import { create } from "zustand";
import { elevenlabsKey } from "@/lib/const";
interface TutorAudioState {
    tutorAudio: HTMLAudioElement | null;
    mediaSource: MediaElementAudioSourceNode | null;
    audioContext: AudioContext | null;
    cleanup: () => void;
    tutorSpeak: (
        text: string,
        voiceId: string,
        callback?: () => void
    ) => Promise<void>;
}

// due to Next SSR, window is undefined while using outside the component
const createAudioContext = () => {
    if (typeof window !== "undefined") {
        return new window.AudioContext();
    }
    // 返回 null 或者其他处理方式，因为在服务器端这不会被调用
    return null;
};

export const useTutorAudioStore = create<TutorAudioState>()((set, get) => ({
    tutorAudio: null,
    mediaSource: null,
    audioContext: createAudioContext(),
    cleanup: () => {
        const { tutorAudio, mediaSource, audioContext } = get();
        if (tutorAudio && !tutorAudio.paused) {
            tutorAudio.pause();
            tutorAudio.src = ""; // Clean up the current source
            get().mediaSource?.disconnect(); // Disconnect the media source node
        }
        if (mediaSource) {
            mediaSource.disconnect();
        }
        set({ tutorAudio: null, mediaSource: null });
    },
    tutorSpeak: async (
        text: string,
        voiceId: string,
        callback?: () => void
    ) => {
        const speakingAudioRes = await fetch("/api/voice", {
            method: "POST",
            body: JSON.stringify({ text, voiceId }),
        });
        const result = await speakingAudioRes.blob();
        const audioUrl = URL.createObjectURL(result);
        const { tutorAudio } = get();
        if (tutorAudio) {
            // tutorAudio.pause();
            URL.revokeObjectURL(tutorAudio.src); // Free up the blob URL
        }
        // Create new audio and connect to the existing AudioContext
        const newAudio = new Audio(audioUrl);
        if (get().audioContext) {
            get().audioContext = createAudioContext();
        }

        const newMediaSource =
            get().audioContext!.createMediaElementSource(newAudio);

        // Connect to destination (speakers)
        newMediaSource.connect(get().audioContext!.destination);
        set({ tutorAudio: newAudio, mediaSource: newMediaSource });

        await get().tutorAudio?.play();

        get().tutorAudio!.onended = () => {
            // execute callbacke function while audio finished
            if (callback) {
                callback();
            }
        };
    },
}));
