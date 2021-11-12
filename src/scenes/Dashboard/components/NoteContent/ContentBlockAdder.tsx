import { FC, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ContentType } from "types";
import { ContainedButton as Button } from "components";
import styles from "./NoteContent.module.scss";

export const ContentBlockAdder: FC = () => {
  const [contentBlockType, setContentBlockType] = useState(ContentType.TEXT);

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
            <MenuItem value={contentType}>{contentType}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={() => {}}>
        <FontAwesomeIcon icon={faPlus} />
        Add content block
      </Button>
    </div>
  );
};
