import { FC, useCallback, useMemo } from "react";
import ContentEditable, { Props } from "react-contenteditable";
import { buttonsConfig } from "./constants";
import { EditButton } from "./EditButton";
import styles from "./AddBlockModal.module.scss";

type TextEditorProps = {
  value: string;
  setValue: (value: string) => void;
};

export const TextEditor: FC<TextEditorProps> = ({ value, setValue }) => {
  const handleChange: Props["onChange"] = useCallback(
    (evt) => {
      setValue(evt.target.value);
    },
    [setValue]
  );

  const editButtons = useMemo(
    () =>
      buttonsConfig.map((btn) => (
        <EditButton cmd={btn.cmd} name={btn.name} arg={btn.arg} />
      )),
    []
  );

  return (
    <div>
      {editButtons}
      <ContentEditable
        onChange={handleChange}
        html={value}
        className={styles.editable}
      />
    </div>
  );
};
