"use client";
import React from "react";
import TutorInfo from "./tutur/turtor-info";
import ChatMessage from "./chat/chat-message";
import ChatTextInput from "./chat/chat-text-input";

const demoMessage = [
    { role: "system", content: "You are a helpful assistant." },
    {
        role: "assistant",
        content: "Let start today's conversation",
    },
    { role: "user", content: "Who won the world series in 2020?" },
    {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
    },
    { role: "user", content: "Where was it played?" },
];

export default function ChatPannel() {
    return (
        <div className="w-full h-full flex flex-col  p-6 border shadow-md relative">
            <TutorInfo />

            <div className="mt-2 overflow-y-scroll h-2/3">
                {demoMessage.map((message, idx) => {
                    if (message.role == "system") return null; // ignore system prompt
                    return <ChatMessage key={idx} message={message} />;
                })}
            </div>

            <ChatTextInput />
        </div>
    );
}
