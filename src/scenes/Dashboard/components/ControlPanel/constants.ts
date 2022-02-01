import {
  faTrashAlt,
  faSave,
  faArrowAltCircleLeft,
  faClipboard,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export const getButtonsConfig = (
  cancelAction: () => void,
  saveAction: () => void,
  deleteAction: () => void,
  editNoteAction: () => void,
  addBlockModalAction: () => void
) => {
  return [
    { icon: faArrowAltCircleLeft, text: "Cancel", onClick: cancelAction },
    { icon: faSave, text: "Save", onClick: saveAction },
    { icon: faTrashAlt, text: "Delete", onClick: deleteAction },
    { icon: faClipboard, text: "Edit Note Info", onClick: editNoteAction },
    { icon: faPlus, text: "Add content block", onClick: addBlockModalAction },
  ];
};
