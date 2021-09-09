import { useEffect, FC } from "react";
import { useRecoilState } from "recoil";
import userAtom from "recoil/user";
import { getUserByToken } from "./tools";

export const Auth: FC = ({ children }) => {
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    const tokenUser = getUserByToken();

    if (Object.keys(user).length < 1 && !!tokenUser) {
      setUser(tokenUser);
    }
  }, [user, setUser]);

  return <>{children}</>;
};
