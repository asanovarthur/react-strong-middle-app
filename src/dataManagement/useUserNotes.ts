import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { db } from "provider/auth";
import userAtom from "recoil/user";
import noteAtom from "recoil/note";
import { Note } from "types";

type UseUserNotesType = {
  data: Note[];
};

export const useUserNotes = (): UseUserNotesType => {
  const { id: userId } = useRecoilValue(userAtom);
  const setActiveNote = useSetRecoilState(noteAtom);
  const [result, setResult] = useState<Note[]>([]);

  useEffect(() => {
    async function getNotes() {
      const notes = await db
        .collection("notes")
        .where("userId", "==", userId)
        .get();

      const data = notes.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      setResult(data as Note[]);
    }

    getNotes();
  }, [setActiveNote, userId]);

  return { data: result };
};
