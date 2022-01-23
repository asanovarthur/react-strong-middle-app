import { FC, useCallback, useMemo, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ContentBlock, ContentType } from "types";
import contentBlocksAtom from "recoil/contentBlocks";
import { noteAtom } from "recoil/note";
import { uploadImage } from "provider/handleUpload";
import { ButtonWithIcon } from "components";
import { defaultModalValue, editors } from "./constants";
import styles from "./AddBlockModal.module.scss";

type AddBlockModalProps = {
  isOpen: boolean;
  setShowModal: (flag: boolean) => void;
  order?: number;
};

export const AddBlockModal: FC<AddBlockModalProps> = ({
  isOpen,
  setShowModal,
  order,
}) => {
  const { id: noteId } = useRecoilValue(noteAtom);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);
  const [value, setValue] = useState<ContentBlock["value"]>(defaultModalValue);
  const [contentBlockType, setContentBlockType] = useState(ContentType.TEXT);

  const maxBlockOrder = useMemo(() => {
    if (contentBlocks.displayed.length < 1 && contentBlocks.edited.length < 1)
      return 0;

    return [...contentBlocks.displayed, ...contentBlocks.edited].sort(
      (a, b) => b.order - a.order
    )[0].order;
  }, [contentBlocks]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setValue(defaultModalValue);
  }, [setShowModal]);

  const handleSave = useCallback(() => {
    const displayedCopy = contentBlocks.displayed.slice();

    const preparedData: ContentBlock = {
      noteId,
      order: order === undefined ? maxBlockOrder + 1 : order,
      type: contentBlockType,
      value,
    };

    const finishSaving = () => {
      let localOrder = order;
      displayedCopy.forEach((block, index) => {
        if (localOrder !== undefined && block.order >= localOrder) {
          displayedCopy[index] = { ...block, order: localOrder++ + 1 };
        }
      });

      setContentBlocks({
        ...contentBlocks,
        displayed: [...displayedCopy, preparedData],
        edited: [...contentBlocks.edited, preparedData],
      });
      handleClose();
    };

    if (contentBlockType === ContentType.IMAGE) {
      preparedData.value = value.name;
      uploadImage(value).then(() => finishSaving());
    } else finishSaving();
  }, [
    value,
    contentBlockType,
    order,
    noteId,
    contentBlocks,
    setContentBlocks,
    handleClose,
    maxBlockOrder,
  ]);

  const inputElement = useMemo(() => {
    const Editor = editors[contentBlockType];

    return <Editor value={value} setValue={setValue} />;
  }, [contentBlockType, value]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className={styles.box}>
        <FormControl sx={{ m: 1, minWidth: 300, marginLeft: 0 }}>
          <InputLabel id="contentBlockSelector">
            Select content block
          </InputLabel>
          <Select
            labelId="contentBlockSelector"
            value={contentBlockType}
            onChange={(event: any) => setContentBlockType(event.target.value)}
            autoWidth
            label="contentBlockSelector"
          >
            {Object.keys(ContentType).map((contentType) => (
              <MenuItem key={contentType} value={contentType}>
                {contentType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
