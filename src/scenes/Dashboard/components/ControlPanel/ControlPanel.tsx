import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSave,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ContainedButton as Button } from "components";
import styles from "./ControlPanel.module.scss";
import userAtom from "recoil/user";

export const ControlPanel = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const { isInEditMode } = user;
  const history = useHistory();

  return (
    <div className={styles.wrap}>
      <FormControlLabel
        control={
          <Switch
            checked={isInEditMode}
            onChange={() => setUser({ ...user, isInEditMode: !isInEditMode })}
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
        <Button
          disabled={!isInEditMode}
          onClick={() => history.push("/qweqweqw")}
        >
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
