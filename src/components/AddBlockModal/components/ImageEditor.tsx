import { FC, useCallback, useState, useMemo } from "react";
import { ContentBlock } from "types";
import { getImage } from "provider/handleUpload";
import styles from "../AddBlockModal.module.scss";

type ImageEditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const ImageEditor: FC<ImageEditorProps> = ({ value, setValue }) => {
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
      <input type="file" onChange={handleChange} />
      {image}
    </>
  );
};
