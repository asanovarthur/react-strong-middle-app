import { useState, useEffect, ReactNode, useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Note } from "types";
import { useContentBlocks } from "dataManagement";
import { noteAtom, notesAtom } from "recoil/note";
import userAtom from "recoil/user";
import contentBlocksAtom from "recoil/contentBlocks";
import { TreeNode } from "./TreeNode";
import styles from "./NotesTree.module.scss";

type TreeElements = {
  data: Note[];
  view: ReactNode[];
};

export const NotesTree = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [activeNote, setActiveNote] = useRecoilState(noteAtom);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const [treeElements, setTreeElements] = useState<TreeElements>({
    data: [],
    view: [],
  });
  const notes = useRecoilValue(notesAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const { data } = useContentBlocks();

  useEffect(() => {
    setActiveNote(
      (notes as Note[])
        .filter((note) => !note.parentId)
        .sort((note1, note2) => note1.creationDate - note2.creationDate)[0] ??
        {}
    );
  }, [notes, setActiveNote]);

  const switchEditMode = useCallback(
    () => setUser({ ...user, isInEditMode: false }),
    [user, setUser]
  );

  const updateActiveNote = useCallback(
    (note: Note) => {
      setActiveNote(note);
      setContentBlocks({ ...contentBlocks, edited: [], displayed: data });
      switchEditMode();
    },
    [setActiveNote, setContentBlocks, switchEditMode, contentBlocks, data]
  );

  useEffect(() => {
    const parentElements = notes
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate);

    const parentElementsView = parentElements.map((note) => (
      <TreeNode
        name={note.name}
        childNodes={notes.filter((childNote) => childNote.parentId === note.id)}
        showIcon
        note={note}
        action={updateActiveNote}
      />
    ));

    setTreeElements({ data: parentElements, view: parentElementsView });

    if (parentElements.length > 0) {
      history.push(`${activeNote.uri}`);
    }
  }, [notes, url, history, activeNote.uri, updateActiveNote]);

  return (
    <div className={styles.tree}>
      <div className={styles.header}>NOTES</div>
      {treeElements.view}
    </div>
  );
};
