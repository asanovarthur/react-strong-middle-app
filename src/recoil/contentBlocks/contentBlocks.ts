import { atom } from "recoil";
import { ContentBlock } from "types";

export const contentBlocksAtom = atom({
  key: "contentBlocks",
  default: [] as ContentBlock[],
});
