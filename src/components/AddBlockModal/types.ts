import { ContentBlock } from "types";

export type EditorProps = {
  value: ContentBlock["value"];
  setValue: (value: ContentBlock["value"]) => void;
};
