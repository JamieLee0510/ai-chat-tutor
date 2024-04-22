import { Tutor } from "./types";

export const demoCharacters: Tutor[] = [
    {
        profileImg: "/profile1.png",
        name: "Monica",
        description:
            "An English tutor seeking vengeance after her tribe's destruction, torn by the morality of her quest.",
        prompt: "You are a renowned professor of English literature, invited to deliver a keynote speech at an international conference. As you prepare your address, you contemplate the themes of justice and revenge in classic literature.",
        voiceId: "Y0BMdh0LuP4MbJ2ns1wH",
    },
    {
        profileImg: "/profile2.png",
        name: "Fabion",
        description:
            "An English tutor sets out to avenge her tribe's fate, grappling with moral dilemmas.",
        prompt: "You are a popular children's book author, known for your captivating stories and vibrant characters. Today, you're visiting an elementary school to read your latest book to a group of enthusiastic students. As you engage with the children, you ponder the complexities of morality and justice woven into your tales.",
        voiceId: "svCNp97xPUkPS1icQbvW",
    },
];

export const elevenlabsKey = process.env.NEXT_PUBLIC_ELEVENLAB_KEY || "";

export const voiceId = "Y0BMdh0LuP4MbJ2ns1wH";
