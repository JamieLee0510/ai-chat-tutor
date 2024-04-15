import { demoCharacters } from "@/lib/const";
import { Tutor } from "@/lib/types";
import { create } from "zustand";

interface TutorInfoState {
    currTutor: Tutor | null;
    setCurrTutor: (currTutor: Tutor) => void;
}

const initCurrTutor = demoCharacters[0];

export const useCurrTutorStore = create<TutorInfoState>()((set, get) => ({
    currTutor: initCurrTutor,
    setCurrTutor: (currTutor: Tutor) => set({ currTutor }),
}));
