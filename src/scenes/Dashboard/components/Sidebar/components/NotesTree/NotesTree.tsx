import { useState, useEffect } from "react";
import { useUserNotes } from "dataManagement";
import { mockNotes } from "mock";
import { TreeNode } from "./TreeNode";
import styles from "./NotesTree.module.scss";

export const NotesTree = () => {
  const { data } = useUserNotes();
  const [treeElements, setTreeElements] = useState<any>([]);

  useEffect(() => {
    console.log(data);

    const parentElements = data
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate)
      .map((note) => (
        <TreeNode
          name={note.name}
          childNodes={mockNotes.filter(
            (childNote) => childNote.parentId === note.id
          )}
          showIcon
        />
      ));

    console.log(parentElements);

    setTreeElements(parentElements);
  }, [data]);

  return (
    <div className={styles.tree}>
      <div className={styles.header}>NOTES</div>
      {treeElements}
    </div>
  );
};
