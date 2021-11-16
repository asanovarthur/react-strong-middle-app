import { atom } from "recoil";
import { ContentBlock } from "types";

export const editContentBlockAtom = atom({
  key: "editContentBlock",
  default: [] as ContentBlock[],
});
