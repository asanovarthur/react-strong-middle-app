import { useState } from "react";
import styles from "../Dashboard.module.scss";

export const ActionButtons = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    <div className={styles.buttons}>
      <button onClick={() => setIsInEditMode(!isInEditMode)}>
        {isInEditMode ? "Exit edit mode" : "Enter edit mode"}
      </button>
      <button>Delete note</button>
      {isInEditMode && (
        <>
          <button>Save</button>
          <button>Cancel</button>
        </>
      )}
    </div>
  );
};
