export type Tutor = {
    id: string;
    profileImg: string;
    name: string;
    description: string;
    prompt: string;
    voiceId: string;
};

export type Message = {
    role: string;
    content: string;
};

export type HistoryMessage = {
    tutorId: string;
    chatId: string;
    title: string;
    messages: Message[];
};
