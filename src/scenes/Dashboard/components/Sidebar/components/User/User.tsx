import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import userAtom from "recoil/user";
import { logout } from "provider/auth";
import styles from "./User.module.scss";

export const User = () => {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userAtom);

  const exit = useCallback(() => {
    logout();
    window.localStorage.removeItem("userToken");
    setUser({ ...user, isLogged: false });
    history.push("/login");
  }, [user, setUser, history]);

  return (
    <div className={styles.user}>
      <span>
        <img src={user.photoURL} alt="photoURL" className={styles.photo} />
        <span className={styles.name}>{user.name}</span>
      </span>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={exit} />
    </div>
  );
};
