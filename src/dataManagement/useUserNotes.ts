import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { db } from "provider/auth";
import userAtom from "recoil/user";
import { notesAtom, noteAtom } from "recoil/note";
import { Note } from "types";

type UseUserNotesType = {
  data: Note[];
};

export const useUserNotes = (): UseUserNotesType => {
  const history = useHistory();
  const { id: userId } = useRecoilValue(userAtom);
  const [notes, setNotes] = useRecoilState(notesAtom);
  const setActiveNote = useSetRecoilState(noteAtom);
  const [result, setResult] = useState<Note[]>(notes);

  useEffect(() => {
    async function getNotes() {
      const dbNotes = await db
        .collection("notes")
        .where("userId", "==", userId)
        .get();

      const data = dbNotes.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      setResult(data as Note[]);
      setNotes(data as Note[]);

      const activeNote =
        (data as Note[])
          .filter((note) => !note.parentId)
          .sort((note1, note2) => note1.creationDate - note2.creationDate)[0] ??
        {};
      setActiveNote(activeNote);
      history.push(`${activeNote.uri}`);
    }

    getNotes();
  }, [userId, setNotes, history, setActiveNote]);

  return { data: result };
};
