import { atom } from "recoil";
import { ContentBlock } from "types";

export const editContentBlocksAtom = atom({
  key: "editContentBlocks",
  default: [] as ContentBlock[],
});
