import { FC, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import ReactPlayer from "react-player";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentBlock as ContentBlockType, ContentType, Note } from "types";
import { noteAtom } from "recoil/note";
import userAtom from "recoil/user";
import contentBlocksAtom from "recoil/contentBlocks";
import { getImage, getNoteById } from "provider/handleUpload";
import { EditModal } from "./EditModal";
import styles from "./NoteContent.module.scss";
type ContentBlockProps = {
  contentBlock: ContentBlockType;
};

export const ContentBlock: FC<ContentBlockProps> = ({ contentBlock }) => {
  const setActiveNote = useSetRecoilState(noteAtom);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const [imgUrl, setImgUrl] = useState();
  const [linkNote, setLinkNote] = useState<Note>({} as Note);
  const [showEditModal, setShowEditModal] = useState(false);
  const user = useRecoilValue(userAtom);
  const { isInEditMode } = user;
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

  const handleDelete = useCallback(() => {
    setContentBlocks({
      ...contentBlocks,
      displayed: contentBlocks.displayed.filter(
        (block) => block.id !== contentBlock.id
      ),
      deleted: [...contentBlocks.deleted, contentBlock.id],
    });
  }, [contentBlock.id, contentBlocks, setContentBlocks]);

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

  return (
    <>
      <div className={styles.contentBlock}>{component}</div>
      {isInEditMode && (
        <>
          <button onClick={() => setShowEditModal(true)}>edit</button>
          <button onClick={handleDelete}>delete</button>
        </>
      )}
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
