import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Note } from "types";
import { useContentBlocks, useUserNotes } from "dataManagement";
import { noteAtom } from "recoil/note";
import userAtom from "recoil/user";
import contentBlocksAtom from "recoil/contentBlocks";
import { Tree } from "components/Tree";
import styles from "./NotesTree.module.scss";

export const NotesTree = () => {
  const history = useHistory();
  const setActiveNote = useSetRecoilState(noteAtom);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const { data: notes } = useUserNotes();
  const [user, setUser] = useRecoilState(userAtom);
  const { data } = useContentBlocks();

  const switchEditMode = useCallback(
    () => setUser({ ...user, isInEditMode: false }),
    [user, setUser]
  );

  const updateActiveNote = useCallback(
    (note: Note) => {
      setActiveNote(note);
      setContentBlocks({ ...contentBlocks, edited: [], displayed: data });
      switchEditMode();
      history.push(`${note.uri}`);
    },
    [
      setActiveNote,
      setContentBlocks,
      switchEditMode,
      contentBlocks,
      data,
      history,
    ]
  );

  return (
    <div className={styles.tree}>
      <div className={styles.header}>NOTES</div>
      <Tree notes={notes} action={updateActiveNote} />
    </div>
  );
};
