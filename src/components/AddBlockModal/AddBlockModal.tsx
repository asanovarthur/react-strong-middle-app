import { FC, useCallback, useMemo, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ContentBlock, ContentType } from "types";
import editContentBlocksAtom from "recoil/editContentBlocks";
import noteAtom from "recoil/note";
import { ButtonWithIcon } from "components";
import { TextEditor } from "./TextEditor";
import { ImageEditor } from "./ImageEditor";
import styles from "./AddBlockModal.module.scss";

type AddBlockModalProps = {
  isOpen: boolean;
  contentBlockType: ContentType;
  setShowModal: (flag: boolean) => void;
  maxBlockOrder: number;
};

export const AddBlockModal: FC<AddBlockModalProps> = ({
  isOpen,
  contentBlockType,
  setShowModal,
  maxBlockOrder,
}) => {
  const { id: noteId } = useRecoilValue(noteAtom);
  const [editContentBlocks, setEditContentBlocks] = useRecoilState(
    editContentBlocksAtom
  );
  const [value, setValue] = useState<string | File>("");

  const handleClose = useCallback(() => setShowModal(false), [setShowModal]);

  const handleSave = useCallback(() => {
    const preparedData: ContentBlock = {
      noteId,
      order: maxBlockOrder + 1,
      type: contentBlockType,
      value,
    };

    setEditContentBlocks([...editContentBlocks, preparedData]);
    handleClose();
  }, [
    value,
    contentBlockType,
    maxBlockOrder,
    noteId,
    editContentBlocks,
    setEditContentBlocks,
    handleClose,
  ]);

  const inputElement = useMemo(() => {
    switch (contentBlockType) {
      case ContentType.TEXT:
        return <TextEditor value={value} setValue={setValue} />;
      case ContentType.IMAGE:
        return <ImageEditor value={value} setValue={setValue} />;
    }
  }, [contentBlockType, value]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className={styles.box}>
        <h3>Add block of type {contentBlockType}</h3>
        <div>{inputElement}</div>
        <ButtonWithIcon
          onClick={handleSave}
          icon={faSave}
          text="Save"
          className={styles.saveBtn}
        />
      </Box>
    </Modal>
  );
};
