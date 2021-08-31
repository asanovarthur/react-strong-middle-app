import { atom } from "recoil";
import { User } from "types";

export const userAtom = atom({
  key: "user",
  default: {} as User,
});
