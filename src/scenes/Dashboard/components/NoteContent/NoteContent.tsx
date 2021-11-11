import { FC, useEffect, useMemo, useState } from "react";
import { useContentBlocks } from "dataManagement";
import { handleUpload, getImage } from "provider";
import { contentBlocks as mockContentBlocks } from "mock";
import styles from "./NoteContent.module.scss";
import { ContentType } from "types";

type NoteContentProps = {
  note: any;
};

export const NoteContent: FC<NoteContentProps> = ({ note }) => {
  const { data } = useContentBlocks();
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    getImage(setImgUrl);
  }, []);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  const contentBlocks = useMemo(() => {
    return data
      .filter((contentBlock) => contentBlock.noteId === 1)
      .sort((a, b) => a.order - b.order)
      .map((block) => <div className={styles.contentBlock}>{block.value}</div>);
  }, [data, note.id]);

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{note.name}</h1>
      {contentBlocks}
      <form onSubmit={() => handleUpload(ContentType.IMAGE, file)}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={imgUrl} alt="" />
    </div>
  );
};
