import { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ContentType } from "types";
import { ContainedButton as Button } from "components";
import styles from "./NoteContent.module.scss";

type ContentBlockAdderProps = {
  contentBlockType: ContentType;
  setContentBlockType: (type: any) => void;
  setShowModal: (flag: boolean) => void;
};

export const ContentBlockAdder: FC<ContentBlockAdderProps> = ({
  contentBlockType,
  setContentBlockType,
  setShowModal,
}) => {
  const handleChange = (event: any) => {
    setContentBlockType(event.target.value);
  };

  return (
    <div className={styles.contentBlockAdder}>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="contentBlockSelector">Select content block</InputLabel>
        <Select
          labelId="contentBlockSelector"
          value={contentBlockType}
          onChange={handleChange}
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
      <Button onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} />
        Add content block
      </Button>
    </div>
  );
};
