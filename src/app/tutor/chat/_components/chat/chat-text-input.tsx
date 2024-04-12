"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ChatTextInput() {
    const [query, setQuery] = useState("");
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
            <Button onClick={() => {}}>
                <SendHorizonal />
            </Button>
        </div>
    );
}
