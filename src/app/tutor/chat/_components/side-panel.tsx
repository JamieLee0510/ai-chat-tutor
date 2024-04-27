"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TutorListPannel from "./tutor-list-pannel";
import ChatHistoryList from "./chat/text/chat-history-list";

export default function SidePanel() {
    return (
        <div className="w-[350px] py-5 h-full flex flex-col items-center shadow  dark:shadow-2xl">
            <Tabs defaultValue="Tutors" className="w-full">
                <TabsList className="w-full  dark:bg-slate-600 bg-slate-300">
                    <TabsTrigger value="Tutors">Tutors</TabsTrigger>
                    <TabsTrigger disabled={true} value="Records">
                        Records
                    </TabsTrigger>
                    <TabsTrigger
                        value="Uploads"
                        disabled={true}
                        className="hover:cursor-not-allowed"
                    >
                        Uploads
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Tutors" className="pt-5">
                    <TutorListPannel />
                </TabsContent>
                <TabsContent value="Records">
                    <ChatHistoryList />
                </TabsContent>
                <TabsContent value="Uploads">will upload file</TabsContent>
            </Tabs>
        </div>
    );
}
