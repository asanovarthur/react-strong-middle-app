import { useState, useEffect, ReactNode, useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Note } from "types";
import { useUserNotes } from "dataManagement";
import noteAtom from "recoil/note";
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
  const { data } = useUserNotes();
  const [treeElements, setTreeElements] = useState<TreeElements>({
    data: [],
    view: [],
  });

  useEffect(() => {
    setActiveNote(
      (data as Note[])
        .filter((note) => !note.parentId)
        .sort((note1, note2) => note1.creationDate - note2.creationDate)[0] ??
        {}
    );
  }, [data, setActiveNote]);

  const updateActiveNote = useCallback(
    (note: Note) => {
      setActiveNote(note);
      setEditContentBlocks([]);
    },
    [setActiveNote, setEditContentBlocks]
  );

  useEffect(() => {
    const parentElements = data
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate);

    const parentElementsView = parentElements.map((note) => (
      <div onClick={() => updateActiveNote(note)}>
        <TreeNode
          name={note.name}
          childNodes={data.filter(
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
  }, [data, url, history, activeNote.uri, updateActiveNote]);

  return (
    <div className={styles.tree}>
      <div className={styles.header}>NOTES</div>
      {treeElements.view}
    </div>
  );
};
