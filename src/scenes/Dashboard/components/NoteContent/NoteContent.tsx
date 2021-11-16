import { FC, useEffect, useMemo, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContentType } from "types";
import { useContentBlocks } from "dataManagement";
import noteAtom from "recoil/note";
import userAtom from "recoil/user";
import editContentBlockAtom from "recoil/editContentBlock";
import { AddBlockModal } from "components/AddBlockModal";
import { ContentBlockAdder } from "./ContentBlockAdder";
import styles from "./NoteContent.module.scss";

export const NoteContent: FC = () => {
  const { name, id: noteId } = useRecoilValue(noteAtom);
  const { isInEditMode } = useRecoilValue(userAtom);
  const setEditContentBlock = useSetRecoilState(editContentBlockAtom);
  const { data } = useContentBlocks();
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [contentBlockType, setContentBlockType] = useState(ContentType.TEXT);
  const [editContentData, setEditContentData] = useState<any>([]);

  const maxBlockOrder = useMemo(
    () =>
      data.length > 0 ? data.sort((a, b) => b.order - a.order)[0].order : 0,
    [data]
  );

  const contentBlocks = useMemo(
    () =>
      data
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <div className={styles.contentBlock}>
            <ContentEditable
              className={styles.editable}
              tagName="pre"
              html={block.value} // innerHTML of the editable div
              disabled={true} // use true to disable edition
              onChange={() => {}} // handle innerHTML change
              // onBlur={sanitize}
            />
          </div>
        )),
    [data]
  );

  const editContentBlocks = useMemo(
    () =>
      editContentData.map((contentData: any) => {
        return {
          noteId,
          order: maxBlockOrder,
          type: contentBlockType,
          value: contentData,
        };
      }),
    [editContentData, contentBlockType, maxBlockOrder, noteId]
  );

  useEffect(() => {
    console.log("USEEFFECT");
    setEditContentBlock(editContentBlocks);
  }, [editContentBlocks, setEditContentBlock]);

  const editContentBlocksView = useMemo(
    () =>
      editContentBlocks.map((block: any) => (
        <div className={styles.contentBlock}>
          <ContentEditable
            className={styles.editable}
            tagName="pre"
            html={block.value} // innerHTML of the editable div
            disabled={true} // use true to disable edition
            onChange={() => {}} // handle innerHTML change
            // onBlur={sanitize}
          />
        </div>
      )),
    [editContentBlocks]
  );

  const updateContentData = (someContentData: any) => {
    setEditContentData([...editContentData, someContentData]);
  };

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
        updateContentData={updateContentData}
      />
    </div>
  );
};
