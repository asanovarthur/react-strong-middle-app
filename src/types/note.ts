export interface Note {
  id: number | string;
  userId: number | string;
  name: string;
  uri: string;
  parentId?: number | string;
  creationDate: number;
}
