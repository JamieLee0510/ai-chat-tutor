"use client";
import React from "react";
import TutorCard from "./tutor/tutor-card";
import ChatModeSwicher from "./chat/chat-mode-swicher";
import { demoCharacters } from "@/lib/const";

export default function TutorListPannel() {
    return (
        <div className="flex flex-col gap-4 px-4 mt-4 -mx-2 h-full overflow-auto pb-40">
            {demoCharacters.map((character) => (
                <TutorCard key={character.voiceId} {...character} />
            ))}
        </div>
    );
}
