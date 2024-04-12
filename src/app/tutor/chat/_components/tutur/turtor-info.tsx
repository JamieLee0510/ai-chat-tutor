"use client";
import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { demoCharacters } from "@/lib/const";

export default function TutorInfo() {
    return (
        <>
            <div className="space-y-1 p-4 flex flex-row items-center">
                <div className="flex items-center space-x-4">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                            width={50}
                            height={50}
                            className="aspect-square h-full w-full"
                            alt="Image"
                            src={demoCharacters[0].profileImg}
                        />
                    </span>
                    <div>
                        <p className="text-md font-medium leading-none">
                            {demoCharacters[0].name}
                        </p>
                        <p className="text-[.8rem] text-gray-500 mt-2">
                            {demoCharacters[0].description}
                        </p>
                    </div>
                </div>
            </div>
            <Separator className="dark:bg-slate-500" />
        </>
    );
}
