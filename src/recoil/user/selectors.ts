import { selector } from "recoil";
import { userAtom } from "./atom";

export const withIsLogged = selector({
  key: "isLoggedIn",
  get: ({ get }) => {
    const user = get(userAtom);

    return user.isLogged;
  },
});
