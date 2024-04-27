import { demoMessage } from "@/lib/const";
import { HistoryMessage, Message } from "@/lib/types";
import { create } from "zustand";

export enum ChatMode {
    Text = "Text",
    Audio = "Audio",
}

// chat history:{tutorId: string, messages:[]}

export type ChatResordStore = {
    currChatID: string;
    setCurrChatID: (currChatID: string) => void;
    chatMessages: Message[];
    setChatMessages: (chatMessages: Message[]) => void;
    chatHistory: HistoryMessage[];
    setChatHistory: (chatHistory: HistoryMessage[]) => void;
    chatMode: ChatMode;
    setChatMode: (chatMode: ChatMode) => void;
};

export const useChatStore = create<ChatResordStore>()((set) => ({
    currChatID: "new",
    setCurrChatID: (currChatID: string) => set({ currChatID }),
    chatMessages: [...demoMessage],
    setChatMessages: (chatMessages: Message[]) => set({ chatMessages }),
    chatHistory: [],
    setChatHistory: (chatHistory: HistoryMessage[]) => set({ chatHistory }),
    chatMode: ChatMode.Text,
    setChatMode: (chatMode: ChatMode) => set({ chatMode }),
}));
