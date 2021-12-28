import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { AddNoteModal } from "./AddNoteModal";
import styles from "./AddNote.module.scss";

export const AddNote: FC = () => {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  return (
    <>
      <div className={styles.wrap} onClick={() => setShowAddNoteModal(true)}>
        <FontAwesomeIcon icon={faPlusSquare} />
        <span className={styles.name}>Add Note</span>
      </div>
      <AddNoteModal
        isOpen={showAddNoteModal}
        setShowModal={setShowAddNoteModal}
      />
    </>
  );
};
