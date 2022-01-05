import { FC, useState, useEffect, useMemo } from "react";
import { ContentBlock, Note } from "types";
import { useUserNotes, useUserNote } from "dataManagement";
import { TreeNode } from "scenes/Dashboard/components/Sidebar/components/NotesTree/TreeNode";

type LinkEditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const LinkEditor: FC<LinkEditorProps> = ({ value, setValue }) => {
  const { data } = useUserNotes();
  const [link, setLink] = useState<Note>();

  const { data: note } = useUserNote(value);

  const select = useMemo(() => {
    const parentElements = data
      .filter((note) => !note.parentId)
      .sort((note1, note2) => note1.creationDate - note2.creationDate);

    const parentElementsView = parentElements.map((note) => (
      <TreeNode
        key={note.id}
        name={note.name}
        childNodes={data.filter((childNote) => childNote.parentId === note.id)}
        showIcon
        note={note}
        action={setLink}
        nestingLevel={0}
      />
    ));

    return parentElementsView;
  }, [data]);

  const noteName = useMemo(() => (note ?? link ?? {}).name, [note, link]);

  useEffect(() => {
    if (link?.id) {
      setValue(`${link?.id}`);
    }
  }, [link, setValue]);

  return (
    <>
      {select}
      {noteName && <p>Chosen note: {noteName}</p>}
    </>
  );
};
