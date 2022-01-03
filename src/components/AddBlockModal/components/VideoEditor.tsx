import { FC, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ContentBlock } from "types";
import styles from "../AddBlockModal.module.scss";

type VideoEditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const VideoEditor: FC<VideoEditorProps> = ({ value, setValue }) => {
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
