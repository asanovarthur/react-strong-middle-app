import { useCallback } from "react";
import { useRecoilState } from "recoil";
import userAtom from "recoil/user";
import { Login } from "../Login";
import styles from "./Root.module.scss";

export const Root = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogin = useCallback(() => {
    setUser({ ...user, isLogged: true });
  }, [user, setUser]);

  switch (user.isLogged) {
    case true:
      return <>TRUE</>;
    case false:
    default:
      return (
        <div className={styles.loginWrapper}>
          <Login />
        </div>
      );
  }
};
