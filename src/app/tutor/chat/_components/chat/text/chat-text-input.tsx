"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateGptResponse } from "../../../_actions/gpt";
import { ChatResordStore, useChatStore } from "../../../_store/chatStore";
import { GptError } from "@/lib/error";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const chatSelector = (state: ChatResordStore) => ({
    chatMessages: state.chatMessages,
    setChatMessages: state.setChatMessages,
});

export default function ChatTextInput() {
    const [query, setQuery] = useState("");
    const [isChatting, setIsChatting] = useState(false);
    const { chatMessages, setChatMessages } = useChatStore(
        useShallow(chatSelector)
    );

    const responseHandler = async () => {
        if (isChatting) return;
        const newMsgRecords = [
            ...chatMessages,
            { role: "user", content: query },
        ];
        setQuery("");
        setChatMessages(newMsgRecords);
        setIsChatting(true);
        const result = (await generateGptResponse(newMsgRecords)) as string;
        if (result == GptError.responseErr) {
            toast.error(GptError.responseErr);
        } else {
            setChatMessages([
                ...newMsgRecords,
                { role: "assistant", content: result },
            ]);
        }
        setIsChatting(false);
    };

    const keydownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            responseHandler();
        }
    };

    return (
        <div className="flex w-full gap-6  items-center sticky bottom-2">
            {/* TODO: currently use Input to control user's input;
            might need Auto-grow textarea to control
          */}
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your response"
                onKeyDown={keydownHandler}
                disabled={isChatting}
            />
            <Button onClick={responseHandler} disabled={isChatting}>
                <SendHorizonal />
            </Button>
        </div>
    );
}
