import { useState, useEffect } from "react";
import styles from "../Dashboard.module.scss";
import { mockNotes } from "../mock";
import { TreeNode } from "./TreeNode";

export const NotesTree = () => {
  const [treeElements, setTreeElements] = useState<any>([]);

  useEffect(() => {
    const parentElements = mockNotes
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate)
      .map((note) => (
        <TreeNode
          name={note.name}
          childNodes={mockNotes.filter(
            (childNote) => childNote.parentId === note.id
          )}
        />
      ));

    setTreeElements(parentElements);
  }, []);

  return <div className={styles.tree}>{treeElements}</div>;
};
