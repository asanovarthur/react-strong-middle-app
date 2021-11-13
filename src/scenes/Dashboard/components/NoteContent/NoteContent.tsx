import { FC, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { ContentType } from "types";
import { useContentBlocks } from "dataManagement";
import noteAtom from "recoil/note";
import userAtom from "recoil/user";
import { AddBlockModal } from "components/AddBlockModal";
import { ContentBlockAdder } from "./ContentBlockAdder";
import styles from "./NoteContent.module.scss";

export const NoteContent: FC = () => {
  const { name } = useRecoilValue(noteAtom);
  const { isInEditMode } = useRecoilValue(userAtom);
  const { data } = useContentBlocks();
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [contentBlockType, setContentBlockType] = useState(ContentType.TEXT);

  const contentBlocks = useMemo(
    () =>
      data
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <div className={styles.contentBlock}>{block.value}</div>
        )),
    [data]
  );

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{name}</h1>
      {contentBlocks}
      {isInEditMode && (
        <ContentBlockAdder
          contentBlockType={contentBlockType}
          setContentBlockType={setContentBlockType}
          setShowModal={setShowAddBlockModal}
        />
      )}
      <AddBlockModal
        isOpen={showAddBlockModal}
        contentBlockType={contentBlockType}
        setShowModal={setShowAddBlockModal}
      />
    </div>
  );
};
