"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateGptResponse } from "../../../_actions/gpt";
import { useChatStore } from "../../../_store/chatStore";
import { GptError } from "@/lib/error";
import { toast } from "sonner";

export default function ChatTextInput() {
    const [query, setQuery] = useState("");
    const { chatMessages, setChatMessages } = useChatStore();

    const responseHandler = async () => {
        const newMsgRecords = [
            ...chatMessages,
            { role: "user", content: query },
        ];
        setChatMessages(newMsgRecords);
        const result = (await generateGptResponse(newMsgRecords)) as string;
        if (result == GptError.responseErr) {
            toast.error(GptError.responseErr);
        } else {
            setChatMessages([
                ...newMsgRecords,
                { role: "assistant", content: result },
            ]);
        }
    };

    return (
        <div className="flex w-full gap-6  items-center">
            {/* TODO: currently use Input to control user's input;
            might need Auto-grow textarea to control
          */}
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your response"
            />
            <Button onClick={responseHandler}>
                <SendHorizonal />
            </Button>
        </div>
    );
}
