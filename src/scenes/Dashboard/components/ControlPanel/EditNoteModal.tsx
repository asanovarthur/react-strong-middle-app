import { FC, useCallback, useState, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Note } from "types";
import { useUserNotes, useUserNote } from "dataManagement";
import { db } from "provider/auth";
import { noteAtom, notesAtom } from "recoil/note";
import { TreeNode } from "scenes/Dashboard/components/Sidebar/components/NotesTree/TreeNode";
import { ButtonWithIcon } from "components";
import styles from "./EditNoteModal.module.scss";

type EditNoteModalProps = {
  isOpen: boolean;
  setShowModal: (flag: boolean) => void;
};

export const EditNoteModal: FC<EditNoteModalProps> = ({
  isOpen,
  setShowModal,
}) => {
  const { data } = useUserNotes();
  const { id, name, uri, parentId } = useRecoilValue(noteAtom);
  const setNotes = useSetRecoilState(notesAtom);
  const [noteInfo, setNoteInfo] = useState({
    name,
    uri,
    parentId: parentId ?? null,
  });
  const { data: note } = useUserNote(noteInfo.parentId ?? -1);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleSave = useCallback(() => {
    db.collection("notes")
      .doc(`${id}`)
      .update(noteInfo)
      .then(async () => {
        const newNotes = await db.collection("notes").get();

        const newData = newNotes.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }) as Note[];
        setNotes(newData);

        handleClose();
      });
  }, [id, noteInfo, handleClose, setNotes]);

  const updateParent = useCallback(
    (note: any) => {
      setNoteInfo({ ...noteInfo, parentId: note.id });
    },
    [noteInfo]
  );

  const select = useMemo(() => {
    const parentElements = data
      .filter((parentNote) => !parentNote.parentId && parentNote.id !== id)
      .sort((note1, note2) => note1.creationDate - note2.creationDate);

    const parentElementsView = parentElements.map((note) => (
      <TreeNode
        key={note.id}
        name={note.name}
        childNodes={data.filter((childNote) => childNote.parentId === note.id)}
        showIcon
        note={note}
        action={updateParent}
        nestingLevel={0}
      />
    ));

    return parentElementsView;
  }, [data, updateParent, id]);

  return (
    <Modal open={isOpen} onClose={handleClose} onBackdropClick={handleClose}>
      <Box className={styles.box}>
        <h3>Edit note</h3>
        <TextField
          value={noteInfo.name}
          onChange={(e: any) =>
            setNoteInfo({ ...noteInfo, name: e.target.value })
          }
          label="Title"
          autoFocus
          placeholder="Please enter note title"
          className={styles.outlinedInput}
        />
        <TextField
          value={noteInfo.uri}
          onChange={(e: any) =>
            setNoteInfo({ ...noteInfo, uri: e.target.value })
          }
          label="URI"
          placeholder="Please enter note uri"
          className={styles.outlinedInput}
        />
        <p>Parent: {note?.name ? note.name : "none"}</p>
        {select}
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
