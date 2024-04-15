"use client";
import Lottie from "lottie-react";
import recordingJson from "./lottie-json/recording.json";
import loader from "./lottie-json/loader.json";
import { CirclePause, Mic } from "lucide-react";

export const RecordingAudio = () => (
    <Lottie animationData={recordingJson} loop={true} />
);

export const StartRecordAudio = () => (
    <Mic color="#fff" className="w-full h-full" />
);

export const VoiceLoading = () => <Lottie animationData={loader} loop={true} />;
