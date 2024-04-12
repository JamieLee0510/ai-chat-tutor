"use client";
import React from "react";
import TutorInfo from "./tutur/turtor-info";
import ChatMessage from "./chat/chat-message";
import ChatTextInput from "./chat/chat-text-input";
import { useChatStore } from "../_store/chatStore";

export default function ChatPannel() {
    const { chatMessages } = useChatStore();
    return (
        <div className="w-full h-full flex flex-col  p-6 border shadow-md relative">
            <TutorInfo />

            <div className="mt-2 overflow-y-scroll h-2/3">
                {chatMessages.map((message, idx) => {
                    if (message.role == "system") return null; // ignore system prompt
                    return <ChatMessage key={idx} message={message} />;
                })}
            </div>

            <ChatTextInput />
        </div>
    );
}
