"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { ChatResordStore, useChatStore } from "../../../_store/chatStore";
import { demoHistoryMsg } from "@/lib/const";
import { HistoryMessage } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TutorInfoState, useCurrTutorStore } from "../../../_store/tutorStore";

const chatSelector = (state: ChatResordStore) => ({
    currChatID: state.currChatID,
    setCurrChatID: state.setCurrChatID,
    setChatMessages: state.setChatMessages,
    chatHistory: state.chatHistory,
    setChatHistory: state.setChatHistory,
});
const tutorSelector = (state: TutorInfoState) => ({
    setCurrTutorById: state.setCurrTutorById,
});

const HistoryCard = ({ chatId, tutorId, title, messages }: HistoryMessage) => {
    const { currChatID, setCurrChatID } = useChatStore(
        useShallow(chatSelector)
    );
    const { setCurrTutorById } = useCurrTutorStore(useShallow(tutorSelector));
    const isSelected = currChatID == chatId;
    return (
        <Card
            className={`${
                isSelected ? "bg-slate-500" : ""
            }  w-full hover:cursor-pointer hover:bg-slate-500`}
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
    const { setChatHistory, chatHistory } = useChatStore(
        useShallow(chatSelector)
    );
    // init chatHistory
    useEffect(() => {
        setChatHistory(demoHistoryMsg);
    }, []);
    return (
        <div className="flex flex-col justify-start items-center px-8 gap-2">
            <Card
                className="w-full hover:cursor-pointer hover:bg-slate-500"
                onClick={() => {}}
            >
                <CardHeader>
                    <CardTitle>New Chat</CardTitle>
                </CardHeader>
            </Card>
            {chatHistory.map((hisMsg) => (
                <HistoryCard key={hisMsg.chatId} {...hisMsg} />
            ))}
        </div>
    );
}
