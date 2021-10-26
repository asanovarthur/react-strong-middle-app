import { ControlPanel, NoteContent, Sidebar } from "./components";
import { mockNotes } from "./mock";
import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <ControlPanel />
      <NoteContent note={mockNotes[0]} />
    </div>
  );
};
