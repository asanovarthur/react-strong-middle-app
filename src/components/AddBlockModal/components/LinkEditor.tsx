import { FC, useState, useEffect, useMemo } from "react";
import { ContentBlock, Note } from "types";
import { useUserNotes } from "dataManagement";
import { TreeNode } from "scenes/Dashboard/components/Sidebar/components/NotesTree/TreeNode";

type LinkEditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const LinkEditor: FC<LinkEditorProps> = ({ value, setValue }) => {
  const { data } = useUserNotes();
  const [link, setLink] = useState<Note>();

  const select = useMemo(() => {
    const parentElements = data
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate);

    const parentElementsView = parentElements.map((note) => (
      <TreeNode
        name={note.name}
        childNodes={data.filter((childNote) => childNote.parentId === note.id)}
        showIcon
        note={note}
        action={setLink}
      />
    ));

    return parentElementsView;
  }, [data]);

  useEffect(() => {
    if (link?.id) {
      setValue(`${link?.id}`);
    }
  }, [link, setValue]);

  return (
    <>
      {select}
      <p>{link?.name}</p>
      <p>{link?.uri}</p>
    </>
  );
};
