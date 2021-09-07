import jwtDecode from "jwt-decode";
import { User } from "types";

export const getUserByToken = (): User | null => {
  const token = window.localStorage.getItem("userToken");

  if (!token) return null;

  const { user_id: id, name, exp } = jwtDecode<any>(token);

  if (!!exp && tokenExpired(exp)) return null;

  return { id, name, isLogged: true };
};

const tokenExpired = (exp: number) => {
  try {
    const currentTime = Math.floor(+new Date() / 1000);

    return exp <= currentTime;
  } catch (e) {
    return true;
  }
};