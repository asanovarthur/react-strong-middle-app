import { storage } from "./firebase";
import { ContentType } from "types";

export const handleUpload = async (contentType: ContentType, value: any) => {
  // TODO: заменить свич на объект
  switch (contentType) {
    case ContentType.TEXT:
      break;

    case ContentType.IMAGE:
      uploadImage(value);
      break;

    default:
      break;
  }
};

const uploadImage = (file: File) => {
  const ref = storage.ref(`/images/${file.name}`);
  const uploadTask = ref.put(file);
  uploadTask.on("state_changed", console.log, console.error, () =>
    ref.getDownloadURL()
  );
};

export const getImage = (setImgUrl: (url: any) => void) => {
  return storage
    .ref(`/images/avatar.jpg`)
    .getDownloadURL()
    .then((url) => setImgUrl(url));
};
