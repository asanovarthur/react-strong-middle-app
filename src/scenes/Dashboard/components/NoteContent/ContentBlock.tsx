import { FC, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import ReactPlayer from "react-player";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentBlock as ContentBlockType, ContentType, Note } from "types";
import { noteAtom } from "recoil/note";
import userAtom from "recoil/user";
import { getImage, getNoteById } from "provider/handleUpload";
import { EditModal } from "./EditModal";
import { videoPlayerEditModeStyle } from "./constants";
import styles from "./NoteContent.module.scss";

type ContentBlockProps = {
  contentBlock: ContentBlockType;
  showEditModal: boolean;
  setShowEditModal: (blockOrder: ContentBlockType["order"]) => void;
};

export const ContentBlock: FC<ContentBlockProps> = ({
  contentBlock,
  showEditModal,
  setShowEditModal,
}) => {
  const user = useRecoilValue(userAtom);
  const setActiveNote = useSetRecoilState(noteAtom);
  const [imgUrl, setImgUrl] = useState();
  const [linkNote, setLinkNote] = useState<Note>({} as Note);
  
  const { isInEditMode } = user;
  let component = null;

  const videoBlockStyle = useMemo(
    () => (isInEditMode ? videoPlayerEditModeStyle : undefined),
    [isInEditMode]
  );

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
      component = (
        <ReactPlayer
          url={contentBlock.value}
          style={videoBlockStyle}
          controls
        />
      );
      break;
    case ContentType.TEXT:
    default:
      component = (
        <ContentEditable
          className={styles.editable}
          html={contentBlock.value as string}
          disabled={true}
          onChange={() => {}}
        />
      );
      break;
  }

  return (
    <>
      <div className={styles.contentBlock}>{component}</div>
      {showEditModal && (
        <EditModal
          contentBlock={contentBlock}
          isOpen={showEditModal}
          setShowModal={setShowEditModal}
        />
      )}
    </>
  );
};
