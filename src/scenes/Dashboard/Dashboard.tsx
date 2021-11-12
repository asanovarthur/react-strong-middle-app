import { ControlPanel, NoteContent, Sidebar } from "./components";
import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <ControlPanel />
      <NoteContent />
    </div>
  );
};
