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
      }) as ContentBlock[];

      if (contentBlocks.updated.length > 0 || contentBlocks.deleted.length > 0)
        return;

      if (
        (data.length > 0 && contentBlocks.displayed.length < 1) ||
        (data.length > 0 &&
          contentBlocks.displayed.length > 0 &&
          data[0].noteId !== contentBlocks.displayed[0].noteId)
      ) {
        setResult(data.sort((a, b) => a.order - b.order));
        setContentBlocks({
          ...contentBlocks,
          displayed: data.sort((a, b) => a.order - b.order),
        });
      }
    }

    getContentBlocks();
  }, [
    activeNoteId,
    setContentBlocks,
    contentBlocks.displayed.length,
    contentBlocks,
  ]);

  return { data: result };
};
