import { FC } from "react";
import { NotesTree, User } from ".";
import styles from "../Dashboard.module.scss";

export const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <User />
      <NotesTree />
    </div>
  );
};
