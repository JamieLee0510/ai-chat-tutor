"use client";

import { useChatStore } from "../../_store/chatStore";
import ChatMessage from "./chat-message";
import ChatTextInput from "./chat-text-input";

export default function ChatTextPannel() {
    const { chatMessages } = useChatStore();

    return (
        <>
            <div className="mt-2 overflow-y-scroll h-2/3">
                {chatMessages.map((message, idx) => {
                    if (message.role == "system") return null; // ignore system prompt
                    return <ChatMessage key={idx} message={message} />;
                })}
            </div>
            <ChatTextInput />
        </>
    );
}
