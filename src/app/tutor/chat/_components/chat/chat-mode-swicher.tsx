"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { ChatMode, useChatStore } from "../../_store/chatStore";

export default function ChatModeSwicher() {
    const [data, setData] = useState(false);
    const { setChatMode } = useChatStore();

    useEffect(() => {
        if (data == true) {
            setChatMode(ChatMode.Audio);
        } else {
            setChatMode(ChatMode.Text);
        }
    }, [data]);

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Texting</Label>
            <Switch
                id="airplane-mode"
                className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-blue-500 "
                checked={data}
                onCheckedChange={() => setData((pre) => !pre)}
            />
            <Label htmlFor="airplane-mode">Audio</Label>
        </div>
    );
}
