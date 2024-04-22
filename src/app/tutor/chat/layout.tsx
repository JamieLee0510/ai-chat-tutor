import ModeToggle from "@/components/mode-toggle";
import React from "react";
import ChatModeSwicher from "./_components/chat/chat-mode-swicher";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-screen flex flex-col bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <header className="shadow w-full flex items-center py-4 justify-center">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">AI Tutor</div>
                <div className="absolute right-4 flex p-2 space-x-6">
                    <ChatModeSwicher />
                    <ModeToggle />
                </div>
            </header>
            <div className="w-full h-full flex flex-row">{children}</div>
        </main>
    );
}
