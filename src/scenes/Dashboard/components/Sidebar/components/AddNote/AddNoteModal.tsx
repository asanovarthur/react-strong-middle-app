import { FC, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useRecoilState } from "recoil";
import userAtom from "recoil/user";
import { notesAtom } from "recoil/note";
import { ButtonWithIcon } from "components";
import { db } from "provider/auth";
import styles from "./AddNoteModal.module.scss";

type AddNoteModalProps = {
  isOpen: boolean;
  setShowModal: (flag: boolean) => void;
};

export const AddNoteModal: FC<AddNoteModalProps> = ({
  isOpen,
  setShowModal,
}) => {
  const { id: userId } = useRecoilValue(userAtom);
  const [notes, setNotes] = useRecoilState(notesAtom);
  const [noteName, setNoteName] = useState<string>("");

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleSave = useCallback(() => {
    // TODO: change "any"
    const newNote: any = {
      name: noteName,
      uri: noteName,
      creationDate: Date.now(),
      userId: userId,
    };

    db.collection("notes")
      .add(newNote)
      .then((docRef) => setNotes([...notes, { ...newNote, id: docRef.id }]))
      .finally(() => handleClose());
  }, [handleClose, noteName, userId, setNotes, notes]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className={styles.box}>
        <h3>Add note</h3>
        <OutlinedInput
          onChange={(e: any) => setNoteName(e.target.value)}
          autoFocus
          placeholder="Please enter note title"
        />
        <br />
        <ButtonWithIcon
          onClick={handleSave}
          icon={faSave}
          text="Save"
          className={styles.saveBtn}
        />
      </Box>
    </Modal>
  );
};
