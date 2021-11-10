import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddNote.module.scss";

export const AddNote: FC = () => {
  return (
    <div className={styles.wrap}>
      <FontAwesomeIcon icon={faPlusSquare} onClick={() => {}} />
      <span className={styles.name}>Add Note</span>
    </div>
  );
};
