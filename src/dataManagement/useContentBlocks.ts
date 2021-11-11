import { useState, useEffect } from "react";
import { db } from "provider/auth";
import userAtom from "recoil/user";
import { useRecoilValue } from "recoil";
import { ContentBlock } from "types";

type UseContentBlocksType = {
  data: ContentBlock[];
};

export const useContentBlocks = (): UseContentBlocksType => {
  const { id: userId } = useRecoilValue(userAtom); // тут должен быть атом с активной note
  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    async function getContentBlocks() {
      const contentBlocks = await db
        .collection("contentBlocks")
        .where("noteId", "==", 1)
        .get();

      setResult(contentBlocks.docs.map((item) => item.data()));
    }

    getContentBlocks();
  }, []);

  return { data: result };
};
