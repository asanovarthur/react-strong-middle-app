import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ContentBlock } from "types";
import { db } from "provider/auth";
import { noteAtom } from "recoil/note";
import contentBlocksAtom from "recoil/contentBlocks";

type UseContentBlocksType = {
  data: ContentBlock[];
};

export const useContentBlocks = (): UseContentBlocksType => {
  const { id: activeNoteId } = useRecoilValue(noteAtom);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const [result, setResult] = useState<ContentBlock[]>([]);

  useEffect(() => {
    async function getContentBlocks() {
      const dbContentBlocks = await db
        .collection("contentBlocks")
        .where("noteId", "==", activeNoteId ?? -1)
        .get();

      const data = dbContentBlocks.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });

      if (
        data.length !== contentBlocks.length ||
        (data.length > 0 &&
          contentBlocks.length > 0 &&
          (data as ContentBlock[])[0].noteId !==
            (contentBlocks as ContentBlock[])[0].noteId)
      ) {
        setResult((data as ContentBlock[]).sort((a, b) => a.order - b.order));
        setContentBlocks(
          (data as ContentBlock[]).sort((a, b) => a.order - b.order)
        );
      }
    }

    getContentBlocks();
  }, [activeNoteId, setContentBlocks, contentBlocks.length, contentBlocks]);

  return { data: result };
};
