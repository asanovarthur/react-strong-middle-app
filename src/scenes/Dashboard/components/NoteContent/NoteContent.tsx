import { FC, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { ContentType } from "types";
import { useContentBlocks } from "dataManagement";
import { noteAtom } from "recoil/note";
import userAtom from "recoil/user";
import editContentBlockAtom from "recoil/editContentBlocks";
import { AddBlockModal } from "components/AddBlockModal";
import { ContentBlockAdder } from "./ContentBlockAdder";
import { ContentBlock } from "./ContentBlock";
import styles from "./NoteContent.module.scss";

export const NoteContent: FC = () => {
  const editContentBlocks = useRecoilValue(editContentBlockAtom);
  const { name } = useRecoilValue(noteAtom);
  const { isInEditMode } = useRecoilValue(userAtom);
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [contentBlockType, setContentBlockType] = useState(ContentType.TEXT);
  const { data } = useContentBlocks();

  const maxBlockOrder = useMemo(
    () =>
      data.length > 0 ? data.sort((a, b) => b.order - a.order)[0].order : 0,
    [data]
  );

  const contentBlocks = useMemo(
    () =>
      data
        .sort((a, b) => a.order - b.order)
        .map((block) => <ContentBlock contentBlock={block} />),
    [data]
  );

  const editContentBlocksView = useMemo(
    () =>
      editContentBlocks.map((block) => <ContentBlock contentBlock={block} />),
    [editContentBlocks]
  );

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{name}</h1>
      {contentBlocks}
      {editContentBlocksView}
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
        maxBlockOrder={maxBlockOrder}
      />
    </div>
  );
};
