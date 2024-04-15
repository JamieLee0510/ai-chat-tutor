"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCurrTutorStore } from "../../_store/tutorStore";
import { Tutor } from "@/lib/types";

export default function TutorCard(props: Tutor) {
    const { setCurrTutor, currTutor } = useCurrTutorStore();
    const { profileImg, name, description, voiceId } = props;
    useEffect(() => {
        console.log("voiceId:", voiceId === currTutor?.voiceId);
    }, []);
    return (
        <Card
            onClick={() => {
                setCurrTutor(props);
            }}
            className={
                (currTutor?.voiceId == voiceId
                    ? "bg-white dark:bg-slate-600 "
                    : "bg-transparent ") +
                "flex flex-row items-center  hover:bg-white dark:hover:bg-slate-600 hover:cursor-pointer rounded-sm p-2 border-b dark:border-slate-50 py-6"
            }
        >
            <Image
                src={profileImg}
                width={40}
                height={40}
                alt="tutor avator"
                className="flex items-center justify-center h-12 w-12 bg-cyan-200 rounded-full"
            />
            <div className="w-4/5 text-left ml-4">
                <CardTitle className="text-sm font-semibold">{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
        </Card>
    );
}
