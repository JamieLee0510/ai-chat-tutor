import { useEffect, useState } from "react";
import { create } from "zustand";

export enum ChatMode {
    Text = "Text",
    Audio = "Audio",
}

type ChatResordStore = {
    chatMessages: any[];
    setChatMessages: (chatMessages: any[]) => void;
    chatMode: ChatMode;
    setChatMode: (chatMode: ChatMode) => void;
};

// TODO: should according to tutor setting
const demoMessage = [
    { role: "system", content: "You are a helpful assistant." },
    {
        role: "assistant",
        content: "Let start today's conversation",
    },
];

export const useChatStore = create<ChatResordStore>()((set) => ({
    chatMessages: [...demoMessage],
    setChatMessages: (chatMessages: any[]) => set({ chatMessages }),
    chatMode: ChatMode.Text,
    setChatMode: (chatMode: ChatMode) => set({ chatMode }),
}));
