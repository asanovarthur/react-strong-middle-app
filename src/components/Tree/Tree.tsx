import { FC } from "react";
import { Note } from "types";
import { TreeNode } from "scenes/Dashboard/components/Sidebar/components/NotesTree/TreeNode";

type TreeProps = {
  notes: Note[];
  action: any;
  nestingLevel?: number;
};

export const Tree: FC<TreeProps> = ({ notes, action, nestingLevel = 1 }) => {
  const parentElements = notes
    .filter((note) => !note.parentId)
    .sort((note1, note2) => note1.creationDate - note2.creationDate);

  const parentElementsView = parentElements.map((note) => (
    <TreeNode
      key={note.id}
      name={note.name}
      childNodes={notes.filter((childNote) => childNote.parentId === note.id)}
      showIcon
      note={note}
      action={action}
      nestingLevel={nestingLevel}
    />
  ));

  return <>{parentElementsView}</>;
};
