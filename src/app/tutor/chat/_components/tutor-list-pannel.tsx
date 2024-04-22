"use client";
import React, { useEffect } from "react";
import TutorCard from "./tutor/tutor-card";
import ChatModeSwicher from "./chat/chat-mode-swicher";
import { demoCharacters } from "@/lib/const";
import { TutorInfoState, useCurrTutorStore } from "../_store/tutorStore";
import { useShallow } from "zustand/react/shallow";

const tutorSelector = (state: TutorInfoState) => ({
    currTutor: state.currTutor,
    setCurrTutor: state.setCurrTutor,
    tutorList: state.tutorList,
    setTutorList: state.setTutorList,
});

export default function TutorListPannel() {
    const { setCurrTutor, tutorList, setTutorList } = useCurrTutorStore(
        useShallow(tutorSelector)
    );

    useEffect(() => {
        setTutorList(demoCharacters);
        setCurrTutor(demoCharacters[0]);
    }, []);

    return (
        <div className="flex flex-col gap-4 px-4 mt-4 -mx-2 h-full overflow-auto pb-40">
            {tutorList.map((tutor) => (
                <TutorCard key={tutor.voiceId} {...tutor} />
            ))}
        </div>
    );
}
