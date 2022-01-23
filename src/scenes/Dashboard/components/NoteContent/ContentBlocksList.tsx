import React, { FC, useMemo, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilValue, useRecoilState } from "recoil";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentBlock as ContentBlockType } from "types";
import userAtom from "recoil/user";
import contentBlocksAtom from "recoil/contentBlocks";
import { ContentBlock } from "./ContentBlock";
import { getReorderedNotesList } from "./tools";
import styles from "./NoteContent.module.scss";

type ContentBlocksListProps = {
  setShowAddBlockModal: (flag: boolean) => void;
  setAddBlockOrder: (order: number) => void;
};

export const ContentBlocksList: FC<ContentBlocksListProps> = ({
  setShowAddBlockModal,
  setAddBlockOrder,
}) => {
  const { isInEditMode } = useRecoilValue(userAtom);
  const [showEditModal, setShowEditModal] =
    useState<ContentBlockType["order"]>(-1);
  const [contentBlocks, setContentBlocks] = useRecoilState(contentBlocksAtom);

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;

      const newBlocks = getReorderedNotesList(
        contentBlocks.displayed.slice(),
        result.source.index,
        result.destination.index
      );
      setContentBlocks({ ...contentBlocks, displayed: newBlocks });
    },
    [contentBlocks, setContentBlocks]
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

  const orderedBlocks = useMemo(
    () => [...contentBlocks.displayed].sort((a, b) => a.order - b.order),
    [contentBlocks.displayed]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {orderedBlocks.map((item, index) => (
              <React.Fragment key={item.order}>
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
                          showEditModal={showEditModal === item.order}
                          setShowEditModal={setShowEditModal}
                        />
                      </div>
                    )}
                  </Draggable>
                  {isInEditMode && (
                    <>
                      <FontAwesomeIcon
                        onClick={() => setShowEditModal(item.order)}
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
                {isInEditMode && (
                  <FontAwesomeIcon
                    onClick={() => {
                      setShowAddBlockModal(true);
                      setAddBlockOrder(item.order + 1);
                    }}
                    icon={faPlus}
                    color="#1976D2"
                    className={styles.addBlockIcon}
                  />
                )}
              </React.Fragment>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
