import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../Dashboard.module.scss";

export const User: FC = () => {
  return (
    <div className={styles.user}>
      <span className={styles.name}>Артурик</span>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </div>
  );
};
