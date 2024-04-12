import React from "react";
import ChatPannel from "./_components/chat-pannel";
import TutorListPannel from "./_components/tutor-list-pannel";

export default function Chat() {
    return (
        <>
            <TutorListPannel />
            <ChatPannel />
        </>
    );
}
