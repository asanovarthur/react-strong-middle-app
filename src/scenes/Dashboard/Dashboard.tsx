import { ActionButtons, NoteContent, NotesTree } from "./components";
import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <NotesTree />
      <ActionButtons />
      <NoteContent />
    </div>
  );
};
