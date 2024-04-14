"use client";
import React from "react";
import TutorInfo from "./tutor/turtor-info";
import ChatMessage from "./chat/chat-message";
import ChatTextInput from "./chat/chat-text-input";
import { ChatMode, useChatStore } from "../_store/chatStore";
import ChatTextPannel from "./chat/chat-pannel-text";
import ChatAudioPannel from "./chat/chat-pannel-audio";

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
