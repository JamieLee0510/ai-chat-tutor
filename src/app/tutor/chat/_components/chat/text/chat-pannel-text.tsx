"use client";

import { useShallow } from "zustand/react/shallow";
import { ChatResordStore, useChatStore } from "../../../_store/chatStore";
import ChatMessage from "./chat-message";
import ChatTextInput from "./chat-text-input";
import { demoMessage } from "@/lib/const";
import { useMemo } from "react";

const chatSelector = (state: ChatResordStore) => ({
    currChatID: state.currChatID,
    chatMessages: state.chatMessages,
    setChatMessages: state.setChatMessages,
    chatHistory: state.chatHistory,
    setChatHistory: state.setChatHistory,
});

export default function ChatTextPannel() {
    const { currChatID, chatHistory, chatMessages } = useChatStore(
        useShallow(chatSelector)
    );

    // TODO: history
    // const chatMessages = useMemo(() => {
    //     if (currChatID == "new") return demoMessage;
    //     console.log("chatHistory:", chatHistory);
    //     console.log("currChatID:", currChatID);
    //     console.log(chatHistory.filter((chat) => chat.chatId == currChatID));
    //     return chatHistory.filter((chat) => chat.chatId == currChatID)[0]
    //         .messages;
    // }, [chatHistory, currChatID]);

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
