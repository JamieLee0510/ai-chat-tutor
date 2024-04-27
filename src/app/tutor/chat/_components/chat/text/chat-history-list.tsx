"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { ChatResordStore, useChatStore } from "../../../_store/chatStore";
import { demoHistoryMsg } from "@/lib/const";
import { HistoryMessage } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TutorInfoState, useCurrTutorStore } from "../../../_store/tutorStore";
import { CirclePlus } from "lucide-react";

const chatSelector = (state: ChatResordStore) => ({
    currChatID: state.currChatID,
    setCurrChatID: state.setCurrChatID,
    setChatMessages: state.setChatMessages,
    chatHistory: state.chatHistory,
    setChatHistory: state.setChatHistory,
});
const tutorSelector = (state: TutorInfoState) => ({
    setCurrTutorById: state.setCurrTutorById,
    currTutor: state.currTutor,
});

const HistoryCard = ({ chatId, tutorId, title }: HistoryMessage) => {
    const { currChatID, setCurrChatID } = useChatStore(
        useShallow(chatSelector)
    );
    const { setCurrTutorById } = useCurrTutorStore(useShallow(tutorSelector));
    const isSelected = currChatID == chatId;
    return (
        <Card
            className={`${
                isSelected ? "bg-white dark:bg-slate-600 " : "bg-transparent "
            }  w-full hover:bg-white dark:hover:bg-slate-600 hover:cursor-pointer`}
            onClick={() => {
                if (isSelected) return;
                setCurrChatID(chatId);
                setCurrTutorById(tutorId);
            }}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
        </Card>
    );
};

export default function ChatHistoryList() {
    const { setChatHistory, chatHistory, setCurrChatID } = useChatStore(
        useShallow(chatSelector)
    );
    const { currTutor } = useCurrTutorStore(useShallow(tutorSelector));

    // init chatHistory
    useEffect(() => {
        setChatHistory(demoHistoryMsg);
    }, []);

    const newChat = () => {
        const newChatMsg = {
            tutorId: currTutor!.id,
            chatId: "new",
            title: "",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "assistant",
                    content: "Let start today's conversation",
                },
            ],
        };
        setChatHistory([newChatMsg, ...chatHistory]);
        setCurrChatID("new");
    };
    return (
        <div className="flex flex-col justify-start items-center px-8 gap-2">
            <Card
                className="w-full bg-transparent hover:bg-white dark:hover:bg-slate-600 dark:border-slate-50 hover:cursor-pointer"
                onClick={newChat}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CirclePlus />
                        New Chat
                    </CardTitle>
                </CardHeader>
            </Card>
            {chatHistory.map((hisMsg) => {
                if (hisMsg.chatId == "new") return null;
                return <HistoryCard key={hisMsg.chatId} {...hisMsg} />;
            })}
        </div>
    );
}
