import { ContentType } from "./contentType";

export interface ContentBlock {
  id?: number | string;
  noteId: number | string;
  type: ContentType;
  value: string | File;
  order: number;
}
