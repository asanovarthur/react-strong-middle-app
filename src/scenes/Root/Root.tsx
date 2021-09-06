import { useEffect } from "react";
import { useRecoilState } from "recoil";
import userAtom from "recoil/user";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";
import { getUserByToken } from "./tools";
import styles from "./Root.module.scss";

export const Root = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const tokenUser = getUserByToken();

    if (Object.keys(user).length < 1 && !!tokenUser) {
      console.log("setting");
      setUser(tokenUser);
    }
  }, [user, setUser]);

  switch (user.isLogged) {
    case true:
      return <Dashboard />;
    case false:
    default:
      return (
        <div className={styles.loginWrapper}>
          <Login />
        </div>
      );
  }
};
