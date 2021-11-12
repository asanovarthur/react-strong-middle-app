import { atom } from "recoil";
import { Note } from "types";

export const noteAtom = atom({
  key: "note",
  default: {} as Note,
});
