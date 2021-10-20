import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tree}>notesTree</div>
      <div className={styles.buttons}>actionButtons</div>
      <div className={styles.note}>note</div>
    </div>
  );
};
