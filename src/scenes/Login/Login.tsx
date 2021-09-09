import { useCallback } from "react";
import { useRecoilState } from "recoil";
import userAtom from "recoil/user";
import { signInWithGoogle } from "../../provider/auth";
import styles from "./Login.module.scss";

export const Login = () => {
  const [recoilUser, setRecoilUser] = useRecoilState(userAtom);

  const signIn = useCallback(() => {
    signInWithGoogle().then(
      (user) =>
        user &&
        setRecoilUser({
          ...recoilUser,
          id: user.uid,
          name: user.displayName ?? "",
          isLogged: true,
        })
    );
  }, [recoilUser, setRecoilUser]);

  return (
    <div className={styles.wrapper}>
      <button onClick={signIn}>Login with Google</button>
    </div>
  );
};
