"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TutorListPannel from "./tutor-list-pannel";

export default function SidePanel() {
    return (
        <div className="w-[350px] py-5 h-full flex flex-col items-center shadow  dark:shadow-2xl">
            <Tabs defaultValue="Tutors">
                <TabsList className="w-full ">
                    <TabsTrigger value="Tutors">Tutors</TabsTrigger>
                    <TabsTrigger value="Records">Records</TabsTrigger>
                    <TabsTrigger value="Uploads" disabled={true}>
                        Uploads
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Tutors" className="pt-5">
                    <TutorListPannel />
                </TabsContent>
                <TabsContent value="Records">
                    Change your password here.
                </TabsContent>
                <TabsContent value="Uploads">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
}
