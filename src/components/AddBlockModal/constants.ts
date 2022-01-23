import { ContentType } from "types";
import { TextEditor, ImageEditor, VideoEditor, LinkEditor } from "./components";

export const buttonsConfig = [
  { cmd: "italic", name: "i" },
  { cmd: "bold", name: "b" },
  { cmd: "formatBlock", name: "h1", arg: "h1" },
  { cmd: "formatBlock", name: "h2", arg: "h2" },
  { cmd: "formatBlock", name: "h3", arg: "h3" },
  { cmd: "strikeThrough", name: "a̶b̶c" },
];

export const defaultModalValue = "";

export const editors = {
  [ContentType.TEXT]: TextEditor,
  [ContentType.IMAGE]: ImageEditor,
  [ContentType.VIDEO]: VideoEditor,
  [ContentType.LINK]: LinkEditor,
};
