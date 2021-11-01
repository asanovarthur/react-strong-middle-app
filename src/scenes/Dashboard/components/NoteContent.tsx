import { FC, useMemo, useState } from "react";
import { handleUpload } from "provider";
import { contentBlocks as mockContentBlocks } from "../mock";
import styles from "../Dashboard.module.scss";
import { ContentType } from "types";

type NoteContentProps = {
  note: any;
};

export const NoteContent: FC<NoteContentProps> = ({ note }) => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

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
      <form onSubmit={() => handleUpload(ContentType.IMAGE, file)}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
    </div>
  );
};
