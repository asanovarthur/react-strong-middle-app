import { useState, useEffect, ReactNode, useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { Note } from "types";
import { noteAtom, notesAtom } from "recoil/note";
import userAtom from "recoil/user";
import editContentBlockAtom from "recoil/editContentBlocks";
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
  const setEditContentBlocks = useSetRecoilState(editContentBlockAtom);
  const [treeElements, setTreeElements] = useState<TreeElements>({
    data: [],
    view: [],
  });
  const notes = useRecoilValue(notesAtom);
  const [user, setUser] = useRecoilState(userAtom);

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
      setEditContentBlocks([]);
      switchEditMode();
    },
    [setActiveNote, setEditContentBlocks, switchEditMode]
  );

  useEffect(() => {
    const parentElements = notes
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate);

    const parentElementsView = parentElements.map((note) => (
      <div key={note.id} onClick={() => updateActiveNote(note)}>
        <TreeNode
          name={note.name}
          childNodes={notes.filter(
            (childNote) => childNote.parentId === note.id
          )}
          showIcon
        />
      </div>
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
