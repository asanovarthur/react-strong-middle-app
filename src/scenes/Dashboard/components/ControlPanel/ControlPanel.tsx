import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  faTrashAlt,
  faSave,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ContentBlock } from "types";
import userAtom from "recoil/user";
import editContentBlockAtom from "recoil/editContentBlocks";
import { db } from "provider/auth";
import { ButtonWithIcon } from "components";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const editContentBlocks = useRecoilValue(editContentBlockAtom);
  const { isInEditMode } = user;

  const handleSave = useCallback(() => {
    if (editContentBlocks.length < 1) return;

    editContentBlocks.forEach((contentBlock: ContentBlock) =>
      db.collection("contentBlocks").add(contentBlock)
    );
  }, [editContentBlocks]);

  const switchEditMode = useCallback(
    () => setUser({ ...user, isInEditMode: !isInEditMode }),
    [user, setUser, isInEditMode]
  );

  return (
    <div className={styles.wrap}>
      <FormControlLabel
        control={<Switch checked={isInEditMode} onChange={switchEditMode} />}
        label={isInEditMode ? "Edit: ON" : "Edit: OFF"}
        labelPlacement="end"
      />
      <div className={styles.buttons}>
        <ButtonWithIcon
          disabled={!isInEditMode}
          icon={faArrowAltCircleLeft}
          text="Cancel"
        />
        <ButtonWithIcon
          disabled={!isInEditMode}
          icon={faSave}
          text="Save"
          onClick={handleSave}
        />
        <ButtonWithIcon
          disabled={!isInEditMode}
          icon={faTrashAlt}
          text="Delete"
        />
      </div>
    </div>
  );
};
