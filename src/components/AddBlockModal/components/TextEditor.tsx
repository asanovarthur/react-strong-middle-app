import { FC, useCallback, useMemo, useRef, useEffect } from "react";
import ContentEditable, { Props } from "react-contenteditable";
import { ContentBlock } from "types";
import { buttonsConfig } from "../constants";
import { EditButton } from "../EditButton";
import styles from "../AddBlockModal.module.scss";

type TextEditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};

export const TextEditor: FC<TextEditorProps> = ({ value, setValue }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (ref.current as HTMLInputElement).focus();
  }, [ref]);

  const handleChange: Props["onChange"] = useCallback(
    (evt) => {
      setValue(evt.target.value);
    },
    [setValue]
  );

  const editButtons = useMemo(
    () =>
      buttonsConfig.map((btn) => (
        <EditButton
          key={btn.name}
          cmd={btn.cmd}
          name={btn.name}
          arg={btn.arg}
        />
      )),
    []
  );

  return (
    <>
      {editButtons}
      <ContentEditable
        innerRef={ref}
        onChange={handleChange}
        html={value}
        className={styles.editable}
      />
    </>
  );
};
