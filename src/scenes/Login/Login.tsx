import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "recoil/user";
import Google from "assets/images/google.png";
import { signInWithGoogle } from "../../provider/auth";
import styles from "./Login.module.scss";

export const Login = () => {
  const history = useHistory();
  const [recoilUser, setRecoilUser] = useRecoilState(userAtom);

  const signIn = useCallback(() => {
    signInWithGoogle()
      .then((user) => {
        user &&
          setRecoilUser({
            ...recoilUser,
            id: user.uid,
            name: user.displayName ?? "",
            photoURL: user.photoURL ?? "",
            isLogged: true,
          });
      })
      .then(() => history.push("/"));
  }, [recoilUser, setRecoilUser, history]);

  return (
    <div className={styles.wrapper}>
      <h1>Sign in</h1>
      <p>Sign in via Google account to start working with notes</p>
      <img src={Google} alt="Google" onClick={signIn} />
    </div>
  );
};
