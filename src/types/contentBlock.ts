import { ContentType } from "./contentType";

export interface ContentBlock {
  id?: number | string;
  noteId: number | string;
  type: ContentType;
  value: any;
  order: number;
}
