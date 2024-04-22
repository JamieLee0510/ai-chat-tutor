import { demoCharacters } from "@/lib/const";
import { Tutor } from "@/lib/types";
import { create } from "zustand";
export interface TutorInfoState {
    currTutor: Tutor | null;
    setCurrTutor: (currTutor: Tutor) => void;
    tutorList: Tutor[];
    setTutorList: (tutorList: Tutor[]) => void;
    setCurrTutorById: (id: string) => void;
}

const initCurrTutor = demoCharacters[0];

export const useCurrTutorStore = create<TutorInfoState>()((set, get) => ({
    currTutor: initCurrTutor,
    setCurrTutor: (currTutor: Tutor) => set({ currTutor }),
    tutorList: [],
    setTutorList: (tutorList: Tutor[]) => set({ tutorList }),
    setCurrTutorById: (id: string) => {
        const tutor = get().tutorList.filter((tutor) => tutor.id == id)[0];
        return set({ currTutor: tutor });
    },
}));
