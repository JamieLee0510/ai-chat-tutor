import { HistoryMessage, Tutor, Message } from "./types";

export const demoCharacters: Tutor[] = [
    {
        id: "1",
        profileImg: "/profile1.png",
        name: "Monica",
        description:
            "An English tutor seeking vengeance after her tribe's destruction, torn by the morality of her quest.",
        prompt: "You are a renowned professor of English literature, invited to deliver a keynote speech at an international conference. As you prepare your address, you contemplate the themes of justice and revenge in classic literature.",
        voiceId: "Y0BMdh0LuP4MbJ2ns1wH",
    },
    {
        id: "2",
        profileImg: "/profile2.png",
        name: "Fabion",
        description:
            "An English tutor sets out to avenge her tribe's fate, grappling with moral dilemmas.",
        prompt: "You are a popular children's book author, known for your captivating stories and vibrant characters. Today, you're visiting an elementary school to read your latest book to a group of enthusiastic students. As you engage with the children, you ponder the complexities of morality and justice woven into your tales.",
        voiceId: "svCNp97xPUkPS1icQbvW",
    },
];

// TODO: should according to tutor setting
export const demoMessage: Message[] = [
    { role: "system", content: "You are a helpful assistant." },
    {
        role: "assistant",
        content: "Let start today's conversation",
    },
];

export const demoHistoryMsg: HistoryMessage[] = [
    {
        tutorId: "1",
        chatId: "1",
        title: "20240415",
        messages: [
            ...demoMessage,
            { role: "user", content: "what is llm" },
            {
                role: "assistant",
                content: `"LLM" can stand for different things depending on the context. Here are a few common interpretations:

        1. Master of Laws (LL.M.): This is a postgraduate academic degree in law. It's usually pursued after obtaining a first degree in law, and it allows legal professionals to specialize in a particular area of law or expand their knowledge globally.   
        2.Language Model (LLM or LLM): In the field of artificial intelligence, "LLM" refers to a "Large Language Model," like ChatGPT. These are sophisticated AI models trained on large datasets to understand and generate human-like text based on the input they receive.
        3.Lessons Learned Meeting (LLM): In project management, this term can be used to describe a meeting where a team reviews a completed project or a project phase to identify what was successful and what could be improved in the future.`,
            },
        ],
    },
    {
        tutorId: "2",
        chatId: "2",
        title: "20240412",
        messages: [
            ...demoMessage,
            { role: "user", content: "give me a joke" },
            {
                role: "assistant",
                content: `Why don't skeletons fight each other?
                
They don't have the guts!`,
            },
        ],
    },
];

export const elevenlabsKey = process.env.NEXT_PUBLIC_ELEVENLAB_KEY || "";

export const voiceId = "Y0BMdh0LuP4MbJ2ns1wH";
