import jwtDecode from "jwt-decode";
import { User } from "types";

export const getUserByToken = (): User | null => {
  const token = window.localStorage.getItem("userToken");

  if (!token) return null;

  const { user_id: id, name, picture: photoURL, exp } = jwtDecode<any>(token);

  if (!!exp && tokenExpired(exp)) return null;

  return { id, name, photoURL, isLogged: true, isInEditMode: false };
};

const tokenExpired = (exp: number) => {
  try {
    const currentTime = Math.floor(+new Date() / 1000);

    return exp <= currentTime;
  } catch (e) {
    return true;
  }
};
