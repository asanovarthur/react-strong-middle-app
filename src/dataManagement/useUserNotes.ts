import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { db } from "provider/auth";
import userAtom from "recoil/user";
import { notesAtom } from "recoil/note";
import { Note } from "types";

type UseUserNotesType = {
  data: Note[];
};

export const useUserNotes = (): UseUserNotesType => {
  const { id: userId } = useRecoilValue(userAtom);
  const [notes, setNotes] = useRecoilState(notesAtom);
  const [result, setResult] = useState<Note[]>([]);

  useEffect(() => {
    async function getNotes() {
      const dbNotes = await db
        .collection("notes")
        .where("userId", "==", userId)
        .get();

      const data = dbNotes.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      if (data.length !== notes.length) {
        setResult(data as Note[]);
        setNotes(data as Note[]);
      }
    }

    getNotes();
  }, [userId, notes, setNotes]);

  return { data: result };
};
