import { useEffect, useState } from "react";
import { create } from "zustand";

type ChatResordStore = {
    chatMessages: any[];
    setChatMessages: (chatMessages: any[]) => void;
};

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
}));
