import { FC, useCallback, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ContentType, ContentBlock as ContentBlockType } from "types";
import { uploadImage } from "provider/handleUpload";
import contentBlocksAtom from "recoil/contentBlocks";
import { ButtonWithIcon } from "components";
import {
  TextEditor,
  ImageEditor,
  VideoEditor,
  LinkEditor,
} from "components/AddBlockModal/components";
import styles from "./EditModal.module.scss";

type EditModalProps = {
  contentBlock: ContentBlockType;
  isOpen: boolean;
  setShowModal: (blockOrder: ContentBlockType["order"]) => void;
};

export const EditModal: FC<EditModalProps> = ({
  contentBlock,
  isOpen,
  setShowModal,
}) => {
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const [value, setValue] = useState<ContentBlockType["value"]>(
    contentBlock.value
  );

  const handleClose = useCallback(() => {
    setShowModal(-1);
    setValue(contentBlock.value);
  }, [setShowModal, contentBlock.value]);

  const handleSave = useCallback(() => {
    const index = contentBlocks.displayed.findIndex(
      (block) => block.order === contentBlock.order
    );
    const updatedContentBlocks = contentBlocks.displayed.slice();
    const newValue =
      contentBlock.type === ContentType.IMAGE ? value.name : value;

    const finishSaving = () => {
      setContentBlocks({
        ...contentBlocks,
        displayed: updatedContentBlocks,
        updated: [
          ...contentBlocks.updated,
          { id: contentBlock.id, value: newValue },
        ],
      });
      handleClose();
    };

    updatedContentBlocks[index] = {
      ...contentBlocks.displayed[index],
      value: newValue,
    };

    if (contentBlock.type === ContentType.IMAGE) {
      uploadImage(value).then(() => finishSaving());
    } else {
      finishSaving();
    }
  }, [
    handleClose,
    value,
    contentBlock.type,
    contentBlocks,
    setContentBlocks,
    contentBlock.order,
    contentBlock.id,
  ]);

  const inputElement = useMemo(() => {
    switch (contentBlock.type) {
      case ContentType.TEXT:
      default:
        return <TextEditor value={value} setValue={setValue} />;
      case ContentType.IMAGE:
        return <ImageEditor value={value} setValue={setValue} />;
      case ContentType.VIDEO:
        return <VideoEditor value={value} setValue={setValue} />;
      case ContentType.LINK:
        return <LinkEditor value={value} setValue={setValue} />;
    }
  }, [contentBlock.type, value]);

  return (
    <Modal open={isOpen} onClose={handleClose} onBackdropClick={handleClose}>
      <Box className={styles.box}>
        <h3>Edit block</h3>
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
