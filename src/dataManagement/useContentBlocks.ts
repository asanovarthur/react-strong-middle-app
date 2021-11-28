import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ContentBlock } from "types";
import { db } from "provider/auth";
import noteAtom from "recoil/note";

type UseContentBlocksType = {
  data: ContentBlock[];
};

export const useContentBlocks = (): UseContentBlocksType => {
  const { id: activeNoteId } = useRecoilValue(noteAtom);
  console.log(activeNoteId);
  const [result, setResult] = useState<ContentBlock[]>([]);

  useEffect(() => {
    async function getContentBlocks() {
      const contentBlocks = await db
        .collection("contentBlocks")
        .where("noteId", "==", activeNoteId ?? -1)
        .get();

      const data = contentBlocks.docs.map((item) => item.data());

      setResult(data as ContentBlock[]);
    }

    getContentBlocks();
  }, [activeNoteId]);

  return { data: result };
};
