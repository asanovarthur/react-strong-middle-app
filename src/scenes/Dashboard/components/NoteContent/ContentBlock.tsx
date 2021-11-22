import { FC, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import ReactPlayer from "react-player";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentBlock as ContentBlockType, ContentType } from "types";
import { getImage } from "provider/handleUpload";
import styles from "./NoteContent.module.scss";

type ContentBlockProps = {
  contentBlock: ContentBlockType;
};

export const ContentBlock: FC<ContentBlockProps> = ({ contentBlock }) => {
  const [imgUrl, setImgUrl] = useState();
  let component = null;

  useEffect(() => {
    if (contentBlock.type === ContentType.IMAGE) {
      getImage(contentBlock.value, setImgUrl);
    }
  }, [contentBlock.type, contentBlock.value]);

  switch (contentBlock.type) {
    case ContentType.IMAGE:
      component = imgUrl ? (
        <img src={imgUrl} alt="img" />
      ) : (
        <CircularProgress />
      );
      break;
    case ContentType.VIDEO:
      component = <ReactPlayer url={contentBlock.value} />;
      break;
    case ContentType.TEXT:
    default:
      component = (
        <div className={styles.contentBlock}>
          <ContentEditable
            className={styles.editable}
            html={contentBlock.value as string}
            disabled={true}
            onChange={() => {}}
          />
        </div>
      );
      break;
  }

  return <div className={styles.contentBlock}>{component}</div>;
};
