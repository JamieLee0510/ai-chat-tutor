"use server";

import { GptError } from "@/lib/error";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OEPNAI_API_KEY,
});

export const generateGptResponse = async (messages: any) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [...messages],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    } catch (err) {
        return GptError.responseErr;
    }
};
