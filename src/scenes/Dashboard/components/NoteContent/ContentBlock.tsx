import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import ReactPlayer from "react-player";
import { useSetRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentBlock as ContentBlockType, ContentType, Note } from "types";
import noteAtom from "recoil/note";
import { getImage, getNoteById } from "provider/handleUpload";
import styles from "./NoteContent.module.scss";

type ContentBlockProps = {
  contentBlock: ContentBlockType;
};

export const ContentBlock: FC<ContentBlockProps> = ({ contentBlock }) => {
  const setActiveNote = useSetRecoilState(noteAtom);
  const [imgUrl, setImgUrl] = useState();
  const [linkNote, setLinkNote] = useState<Note>({} as Note);
  let component = null;

  useEffect(() => {
    switch (contentBlock.type) {
      case ContentType.LINK:
        getNoteById(contentBlock.value, setLinkNote);
        break;
      case ContentType.IMAGE:
        getImage(contentBlock.value, setImgUrl);
        break;
      default:
        break;
    }
  }, [contentBlock.type, contentBlock.value]);

  switch (contentBlock.type) {
    case ContentType.LINK:
      component = (
        <Link
          to={`/${linkNote?.uri}`}
          onClick={() => {
            console.log(linkNote.id);
            console.log(linkNote.name);
            setActiveNote(linkNote);
          }}
        >
          {linkNote?.name}
        </Link>
      );
      break;
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
