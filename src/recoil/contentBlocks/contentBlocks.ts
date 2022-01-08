import { atom } from "recoil";
import { ContentBlock } from "types";

type UpdatedBlock = Pick<ContentBlock, "id" | "value">;

export const contentBlocksAtom = atom({
  key: "contentBlocks",
  default: {
    displayed: [] as ContentBlock[],
    updated: [] as UpdatedBlock[],
    deleted: [] as ContentBlock["id"][],
    edited: [] as ContentBlock[],
  },
});
