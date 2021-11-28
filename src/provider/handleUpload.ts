import { ContentType, Note } from "types";
import { db } from "provider/auth";
import { storage } from "./firebase";

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

export const uploadImage = (file: File) => {
  const ref = storage.ref(`/images/${file.name}`);
  const uploadTask = ref.put(file);
  uploadTask.on("state_changed", console.log, console.error, () =>
    ref.getDownloadURL()
  );
};

export const getImage = (imageName: string, setImgUrl: (url: any) => void) => {
  storage
    .ref(`/images/${imageName}`)
    .getDownloadURL()
    .then((url) => setImgUrl(url));
};

export const getNoteById = async (
  id: Note["id"],
  setNote: (data: any) => void
) => {
  console.log(id);

  return await db
    .collection("notes")
    .doc(`${id}`)
    .get()
    .then((result) => setNote({ id, ...result.data() }));
};
