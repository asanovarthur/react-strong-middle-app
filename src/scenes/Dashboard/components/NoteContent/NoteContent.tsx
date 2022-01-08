import { FC, useMemo, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilValue, useRecoilState } from "recoil";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentType, ContentBlock as ContentBlockType } from "types";
import { noteAtom } from "recoil/note";
import userAtom from "recoil/user";
import contentBlocksAtom from "recoil/contentBlocks";
import { AddBlockModal } from "components/AddBlockModal";
import { ContentBlockAdder } from "./ContentBlockAdder";
import { ContentBlock } from "./ContentBlock";
import styles from "./NoteContent.module.scss";

export const NoteContent: FC = () => {
  const { name } = useRecoilValue(noteAtom);
  const { isInEditMode } = useRecoilValue(userAtom);
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [contentBlockType, setContentBlockType] = useState(ContentType.TEXT);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);

  const maxBlockOrder = useMemo(() => {
    if (contentBlocks.displayed.length < 1 && contentBlocks.edited.length < 1)
      return 0;

    return [...contentBlocks.displayed, ...contentBlocks.edited].sort(
      (a, b) => b.order - a.order
    )[0].order;
  }, [contentBlocks]);

  const reorder = useCallback(
    (list: ContentBlockType[], startIndex: any, endIndex: any) => {
      list[startIndex] = { ...list[startIndex], order: list[endIndex].order };
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);

      if (startIndex > endIndex) {
        list.forEach((item, index) => {
          if (index > endIndex && index <= startIndex) {
            list[index] = { ...item, order: item.order + 1 };
          }
        });
      } else if (startIndex < endIndex) {
        list.forEach((item, index) => {
          if (index >= startIndex && index < endIndex)
            list[index] = { ...item, order: item.order - 1 };
        });
      }

      return list;
    },
    []
  );

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) {
        return;
      }

      const newBlocks = reorder(
        contentBlocks.displayed.slice(),
        result.source.index,
        result.destination.index
      );
      setContentBlocks({ ...contentBlocks, displayed: newBlocks });
    },
    [contentBlocks, setContentBlocks, reorder]
  );

  const handleDelete = useCallback(
    (item: ContentBlockType) => {
      setContentBlocks({
        ...contentBlocks,
        displayed: contentBlocks.displayed.filter(
          (block) => block.order !== item.order
        ),
        edited: contentBlocks.edited.filter(
          (block) => block.order !== item.order
        ),
        deleted: [...contentBlocks.deleted, item.id],
      });
    },
    [contentBlocks, setContentBlocks]
  );

  const contentBlocksView = useMemo(() => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {contentBlocks.displayed.map((item, index) => (
                <span className={styles.draggableWrap}>
                  <Draggable
                    key={item.id}
                    draggableId={`${item.order}`}
                    index={index}
                    isDragDisabled={!isInEditMode}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ContentBlock
                          key={item.order}
                          contentBlock={item}
                          showEditModal={showEditModal}
                          setShowEditModal={setShowEditModal}
                        />
                      </div>
                    )}
                  </Draggable>
                  {isInEditMode && (
                    <>
                      <FontAwesomeIcon
                        onClick={() => setShowEditModal(true)}
                        icon={faEdit}
                        color="#1976D2"
                      />
                      <FontAwesomeIcon
                        onClick={() => handleDelete(item)}
                        icon={faTrashAlt}
                        color="#1976D2"
                      />
                    </>
                  )}
                </span>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }, [contentBlocks, onDragEnd, isInEditMode, handleDelete, showEditModal]);

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{name}</h1>
      {contentBlocksView}
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
