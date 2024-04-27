"use client";

import { useShallow } from "zustand/react/shallow";
import { ChatResordStore, useChatStore } from "../../../_store/chatStore";
import ChatMessage from "./chat-message";
import ChatTextInput from "./chat-text-input";
import { demoMessage } from "@/lib/const";
import { useEffect, useMemo, useRef } from "react";

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

    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            const scrollHeight = endOfMessagesRef.current.scrollHeight;
            const height = endOfMessagesRef.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            endOfMessagesRef.current.scrollTop =
                maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }, [chatMessages]); // 每當消息列表更新時，觸發滾動操作

    return (
        <>
            <div
                ref={endOfMessagesRef}
                className="mt-2 overflow-y-scroll h-[70vh] pb-20"
            >
                {chatMessages.map((message, idx) => {
                    if (message.role == "system") return null; // ignore system prompt
                    return <ChatMessage key={idx} message={message} />;
                })}
            </div>
            <ChatTextInput />
        </>
    );
}
