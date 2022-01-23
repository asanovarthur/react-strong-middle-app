import { FC, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import OutlinedInput from "@mui/material/OutlinedInput";
import { EditorProps } from "../types";
import styles from "../AddBlockModal.module.scss";

export const VideoEditor: FC<EditorProps> = ({ value, setValue }) => {
  const [uri, setUri] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (evt.target.value) {
        setValue(evt.target.value);
        setUri(evt.target.value);
      }
    },
    [setValue]
  );

  return (
    <>
      <OutlinedInput
        autoFocus
        placeholder="Please enter uri"
        value={value ?? uri}
        onChange={handleChange}
      />
      {(!!value || !!uri) && (
        <ReactPlayer
          url={value ?? uri}
          className={styles.player}
          height="250px"
          width="400px"
        />
      )}
    </>
  );
};
