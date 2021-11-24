import { Route, useRouteMatch } from "react-router-dom";
import { ControlPanel, NoteContent, Sidebar } from "./components";
import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <div className={styles.container}>
      <Sidebar />
      <ControlPanel />
      <Route path={`${path}:uri`} component={NoteContent} />
    </div>
  );
};
