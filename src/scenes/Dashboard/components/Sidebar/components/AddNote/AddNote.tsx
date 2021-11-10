import { FC } from "react";
import styles from "./AddNote.module.scss";

export const AddNote: FC = () => {
  return (
    <div className={styles.user}>
      <span className={styles.name}>Add Note</span>
    </div>
  );
};
