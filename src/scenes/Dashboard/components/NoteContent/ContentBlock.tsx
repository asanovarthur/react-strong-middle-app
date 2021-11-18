import { FC } from "react";
import ContentEditable from "react-contenteditable";
import { ContentBlock as ContentBlockType, ContentType } from "types";
import styles from "./NoteContent.module.scss";

type ContentBlockProps = {
  contentBlock: ContentBlockType;
};

export const ContentBlock: FC<ContentBlockProps> = ({ contentBlock }) => {
  switch (contentBlock.type) {
    case ContentType.TEXT:
    default:
      return (
        <div className={styles.contentBlock}>
          <ContentEditable
            className={styles.editable}
            html={contentBlock.value}
            disabled={true}
            onChange={() => {}}
          />
        </div>
      );
  }
};
