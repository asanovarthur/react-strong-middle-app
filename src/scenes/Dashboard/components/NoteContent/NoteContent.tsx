import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useContentBlocks } from "dataManagement";
import noteAtom from "recoil/note";
import styles from "./NoteContent.module.scss";

export const NoteContent: FC = () => {
  const { name } = useRecoilValue(noteAtom);
  const { data } = useContentBlocks();

  const contentBlocks = useMemo(
    () =>
      data
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <div className={styles.contentBlock}>{block.value}</div>
        )),
    [data]
  );

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{name}</h1>
      {contentBlocks}
    </div>
  );
};
