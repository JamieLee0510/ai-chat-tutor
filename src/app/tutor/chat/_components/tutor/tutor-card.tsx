"use client";
import Image from "next/image";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function TutorCard({
    profileImg,
    name,
    description,
}: {
    profileImg: string;
    name: string;
    description: string;
}) {
    return (
        <Card
            onClick={() => {}}
            className={
                "flex flex-row items-center bg-transparent  hover:bg-white dark:hover:bg-slate-600 hover:cursor-pointer rounded-sm p-2 border-b dark:border-slate-50 py-6"
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
