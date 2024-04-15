"use client";
import React, { useState } from "react";
import ChatAudioRecorder from "./chat-audio-recorder";
import ChatAudioVisualizer from "./chat-audio-visualizer";

export default function ChatAudioPannel() {
    return (
        <div className="flex flex-col justify-between items-center">
            <div className="w-[400px] h-[400px] flex items-center justify-center">
                <ChatAudioVisualizer />
            </div>

            <ChatAudioRecorder />
        </div>
    );
}
