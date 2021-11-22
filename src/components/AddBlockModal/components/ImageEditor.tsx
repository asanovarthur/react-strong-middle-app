import { FC, useCallback, useState, useMemo } from "react";
import { ContentBlock } from "types";
import { uploadImage } from "provider/handleUpload";
import styles from "../AddBlockModal.module.scss";

type ImageEditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const ImageEditor: FC<ImageEditorProps> = ({ value, setValue }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (evt.target.files) {
        setFile(evt.target.files[0]);
        setValue(evt.target.files[0].name);
        uploadImage(evt.target.files[0]);
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
