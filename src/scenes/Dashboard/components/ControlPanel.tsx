import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSave,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ContainedButton as Button } from "components";
import styles from "../Dashboard.module.scss";

export const ControlPanel = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    <div className={styles.controlPanelWrapper}>
      <FormControlLabel
        control={
          <Switch
            checked={isInEditMode}
            onChange={() => setIsInEditMode(!isInEditMode)}
          />
        }
        label={isInEditMode ? "Edit: ON" : "Edit: OFF"}
        labelPlacement="end"
      />
      <div className={styles.buttons}>
        <Button disabled={!isInEditMode}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          Cancel
        </Button>
        <Button disabled={!isInEditMode}>
          <FontAwesomeIcon icon={faSave} />
          Save
        </Button>
        <Button disabled={!isInEditMode}>
          <FontAwesomeIcon icon={faTrashAlt} />
          Delete
        </Button>
      </div>
    </div>
  );
};
