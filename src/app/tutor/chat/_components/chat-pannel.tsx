"use client";
import React from "react";
import TutorInfo from "./tutor/turtor-info";
import { ChatMode, useChatStore } from "../_store/chatStore";
import ChatTextPannel from "./chat/text/chat-pannel-text";
import ChatAudioPannel from "./chat/audio/chat-pannel-audio";

export default function ChatPannel() {
    const { chatMode } = useChatStore();
    return (
        <div className="w-full h-full flex flex-col  p-6 border shadow-md relative">
            <TutorInfo />

            {chatMode == ChatMode.Text && <ChatTextPannel />}
            {chatMode == ChatMode.Audio && <ChatAudioPannel />}
        </div>
    );
}
