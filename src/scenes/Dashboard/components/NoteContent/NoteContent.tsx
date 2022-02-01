import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { noteAtom } from "recoil/note";
import { AddBlockModal } from "components/AddBlockModal";
import { ContentBlocksList } from "./ContentBlocksList";
import styles from "./NoteContent.module.scss";

export const NoteContent: FC = () => {
  const { name } = useRecoilValue(noteAtom);
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [addBlockOrder, setAddBlockOrder] = useState(-1);

  return (
    <div className={styles.noteWrap}>
      <h1 className={styles.header}>{name}</h1>
      <ContentBlocksList
        setAddBlockOrder={setAddBlockOrder}
        setShowAddBlockModal={setShowAddBlockModal}
      />
      <AddBlockModal
        isOpen={showAddBlockModal}
        setShowModal={setShowAddBlockModal}
        order={addBlockOrder}
      />
    </div>
  );
};
