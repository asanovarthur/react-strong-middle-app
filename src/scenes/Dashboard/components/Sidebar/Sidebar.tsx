import { FC } from "react";
import { NotesTree, User, AddNote } from "./components";
import styles from "./Sidebar.module.scss";

export const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <User />
      <NotesTree />
      <AddNote />
    </div>
  );
};
