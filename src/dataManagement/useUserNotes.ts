import { useState, useEffect } from "react";
import { db } from "provider/auth";
import userAtom from "recoil/user";
import { useRecoilValue } from "recoil";
import { Note } from "types";

type UseUserNotesType = {
  data: Note[];
};

export const useUserNotes = (): UseUserNotesType => {
  const { id: userId } = useRecoilValue(userAtom);
  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    async function getNotes() {
      const notes = await db.collection("notes").where("userId", "==", 1).get();

      setResult(notes.docs.map((item) => item.data()));
    }

    getNotes();
  }, []);

  return { data: result };
};
