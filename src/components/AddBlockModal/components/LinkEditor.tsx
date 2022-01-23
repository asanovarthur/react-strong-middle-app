import { FC, useState, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Note } from "types";
import { useUserNote } from "dataManagement";
import { notesAtom } from "recoil/note";
import { Tree } from "../../Tree";
import { EditorProps } from "../types";

export const LinkEditor: FC<EditorProps> = ({ value, setValue }) => {
  const notes = useRecoilValue(notesAtom);
  const [link, setLink] = useState<Note>();

  const { data: note } = useUserNote(value);

  const noteName = useMemo(() => (note ?? link ?? {}).name, [note, link]);

  useEffect(() => {
    if (link?.id) {
      setValue(`${link?.id}`);
    }
  }, [link, setValue]);

  return (
    <>
      <Tree notes={notes} action={setLink} nestingLevel={0} />
      {noteName && <p>Chosen note: {noteName}</p>}
    </>
  );
};
