import { useCallback, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ContentBlock, Note } from "types";
import { useContentBlocks } from "dataManagement";
import userAtom from "recoil/user";
import contentBlocksAtom from "recoil/contentBlocks";
import { noteAtom, notesAtom } from "recoil/note";
import { db } from "provider/auth";
import { ButtonWithIcon } from "components";
import { AddBlockModal } from "components/AddBlockModal";
import { EditNoteModal } from "./EditNoteModal";
import styles from "./ControlPanel.module.scss";
import { getButtonsConfig } from "./constants";

export const ControlPanel = () => {
  const { data: dbContentBlocks } = useContentBlocks();
  const data = useRecoilValue(notesAtom);
  const [note, setNote] = useRecoilState(noteAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const [notes, setNotes] = useRecoilState(notesAtom);
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
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

    let editContentBlocksProcessed = 0;
    contentBlocks.edited.forEach((contentBlock: ContentBlock) => {
      db.collection("contentBlocks")
        .add(contentBlock)
        .then(async () => {
          const newBlocks = await db
            .collection("contentBlocks")
            .where("noteId", "==", note.id ?? -1)
            .get();

          const newData = newBlocks.docs.map((item) => {
            return { id: item.id, ...item.data() };
          }) as ContentBlock[];

          editContentBlocksProcessed++;

          if (editContentBlocksProcessed === contentBlocks.edited.length) {
            setContentBlocks({
              ...contentBlocks,
              displayed: newData.sort((a, b) => a.order - b.order),
              edited: [],
            });
          }
        });
    });
  }, [contentBlocks, setContentBlocks, note.id]);

  const handleDelete = useCallback(() => {
    db.collection("notes")
      .doc(`${note.id}`)
      .delete()
      .then(() => {
        db.collection("contentBlocks")
          .where("noteId", "==", note.id)
          .get()
          .then((snapshot) => {
            Promise.all(snapshot.docs.map((d) => d.ref.delete()));
          });
      })
      .then(() =>
        setNote(
          (data as Note[])
            .filter((note) => !note.parentId)
            .sort(
              (note1, note2) => note1.creationDate - note2.creationDate
            )[0] ?? {}
        )
      )
      .then(() => setNotes(notes.filter((n) => n.id !== note.id)));
  }, [note.id, data, setNote, notes, setNotes]);

  const handleCancel = useCallback(() => {
    setContentBlocks({
      displayed: dbContentBlocks,
      deleted: [],
      updated: [],
      edited: [],
    });
  }, [dbContentBlocks, setContentBlocks]);

  const switchEditMode = useCallback(
    () => setUser({ ...user, isInEditMode: !isInEditMode }),
    [user, setUser, isInEditMode]
  );

  const buttons = useMemo(() => {
    const buttonsConfig = getButtonsConfig(
      handleCancel,
      handleSave,
      handleDelete,
      () => setShowEditNoteModal(true),
      () => setShowAddBlockModal(true)
    );

    return buttonsConfig.map((button) => (
      <ButtonWithIcon
        disabled={!isInEditMode}
        icon={button.icon}
        text={button.text}
        onClick={button.onClick}
      />
    ));
  }, [handleCancel, handleSave, handleDelete, isInEditMode]);

  return (
    <>
      <div className={styles.wrap}>
        <FormControlLabel
          control={<Switch checked={isInEditMode} onChange={switchEditMode} />}
          label={isInEditMode ? "Edit: ON" : "Edit: OFF"}
          labelPlacement="end"
        />
        <div className={styles.buttons}>{buttons}</div>
      </div>
      {showEditNoteModal && (
        <EditNoteModal
          isOpen={showEditNoteModal}
          setShowModal={setShowEditNoteModal}
        />
      )}
      {showAddBlockModal && (
        <AddBlockModal
          isOpen={showAddBlockModal}
          setShowModal={setShowAddBlockModal}
        />
      )}
    </>
  );
};
