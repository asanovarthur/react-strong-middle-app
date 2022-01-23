import { FC, useCallback, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { getImage } from "provider/handleUpload";
import { EditorProps } from "../types";
import styles from "../AddBlockModal.module.scss";

const Input = styled("input")({
  display: "none",
});

export const ImageEditor: FC<EditorProps> = ({ value, setValue }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (evt.target.files) {
        setFile(evt.target.files[0]);
        setValue(evt.target.files[0]);
      }
    },
    [setValue]
  );

  const image = useMemo(() => {
    let url = "";

    if (!!file) url = URL.createObjectURL(file);
    else if (!!value) {
      getImage(value, setImgUrl);
      url = imgUrl;
    }

    return <img src={url} alt="" className={styles.image} />;
  }, [file, value, imgUrl]);

  return (
    <>
      <label htmlFor="contained-button-file">
        <Input id="contained-button-file" type="file" onChange={handleChange} />
        <Button variant="outlined" component="span">
          Upload
        </Button>
      </label>
      {image}
    </>
  );
};
