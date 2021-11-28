import { useState, useEffect } from "react";
import { db } from "provider/auth";
import { Note } from "types";

type UseUserNoteType = {
  data: Note | undefined;
};

export const useUserNote = (id: Note["id"]): UseUserNoteType => {
  const [result, setResult] = useState<Note>();

  useEffect(() => {
    async function getNote() {
      const note = (await db.collection("notes").doc(`${id}`).get()).data();

      setResult(note as Note);
    }

    getNote();
  }, [id]);

  return { data: result };
};
