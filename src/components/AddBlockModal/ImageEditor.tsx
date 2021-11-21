import { FC, useCallback, useState, useEffect, useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentBlock } from "types";
import { getImage, uploadImage } from "provider/handleUpload";
import styles from "./AddBlockModal.module.scss";

type ImageEditorProps = {
  // TODO: fix types
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const ImageEditor: FC<ImageEditorProps> = ({ value, setValue }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>();

  console.log(imgUrl);

  // useEffect(() => {
  //   if (file) {
  //     console.log(file);
  //     getImage(file?.name, setImgUrl);
  //   }
  // }, [file]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (evt.target.files) {
        setFile(evt.target.files[0]);
        setValue(evt.target.files[0].name);
        uploadImage(evt.target.files[0]);
        // getImage(evt.target.files[0].name, setImgUrl);
      }
    },
    [setValue]
  );

  const image = useMemo(() => {
    if (!file) return null;
    return (
      <img src={URL.createObjectURL(file)} alt="img" className={styles.image} />
    );
  }, [file]);

  return (
    <>
      <input type="file" onChange={handleChange} />
      {image}
    </>
  );
};
