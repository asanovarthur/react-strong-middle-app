import { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  faTrashAlt,
  faSave,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ContentBlock, Note } from "types";
import { useUserNotes } from "dataManagement";
import userAtom from "recoil/user";
import editContentBlockAtom from "recoil/editContentBlocks";
import contentBlocksAtom from "recoil/contentBlocks";
import { noteAtom, notesAtom } from "recoil/note";
import { db } from "provider/auth";
import { ButtonWithIcon } from "components";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
  const { data } = useUserNotes();
  const [user, setUser] = useRecoilState(userAtom);
  const editContentBlocks = useRecoilValue(editContentBlockAtom);
  const contentBlocks = useRecoilValue(contentBlocksAtom);
  const { id: noteId } = useRecoilValue(noteAtom);
  const setActiveNote = useSetRecoilState(noteAtom);
  const [notes, setNotes] = useRecoilState(notesAtom);
  const { isInEditMode } = user;

  const handleSave = useCallback(() => {
    const dbCollection = db.collection("contentBlocks");
    let order = 1;

    contentBlocks.displayed.forEach((block) =>
      dbCollection.doc(`${block.id}`).update({ order: order++ })
    );

    contentBlocks.updated.forEach((block) =>
      dbCollection.doc(`${block.id}`).update({ value: block.value })
    );

    contentBlocks.deleted.forEach((id) => dbCollection.doc(`${id}`).delete());

    editContentBlocks.forEach((contentBlock: ContentBlock) =>
      db.collection("contentBlocks").add(contentBlock)
    );
  }, [editContentBlocks, contentBlocks]);

  const handleDelete = useCallback(() => {
    db.collection("notes")
      .doc(`${noteId}`)
      .delete()
      .then(() => {
        db.collection("contentBlocks")
          .where("noteId", "==", noteId)
          .get()
          .then((snapshot) => {
            Promise.all(snapshot.docs.map((d) => d.ref.delete()));
          });
      })
      .then(() =>
        setActiveNote(
          (data as Note[])
            .filter((note) => !note.parentId)
            .sort(
              (note1, note2) => note1.creationDate - note2.creationDate
            )[0] ?? {}
        )
      )
      .then(() => setNotes(notes.filter((note) => note.id !== noteId)));
  }, [noteId, data, setActiveNote, notes, setNotes]);

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
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
