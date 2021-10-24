import { FC, useMemo } from "react";
import { contentBlocks as mockContentBlocks } from "../mock";
import styles from "../Dashboard.module.scss";

type NoteContentProps = {
  note: any;
};

export const NoteContent: FC<NoteContentProps> = ({ note }) => {
  const contentBlocks = useMemo(() => {
    return mockContentBlocks
      .filter((contentBlock) => contentBlock.noteId === note.id)
      .sort((a, b) => a.order - b.order)
      .map((block) => <div className={styles.contentBlock}>{block.value}</div>);
  }, [note.id]);

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{note.name}</h1>
      {contentBlocks}
    </div>
  );
};
