export interface Note {
  id: number | string;
  userId: number;
  name: string;
  uri: string;
  parentId?: number;
  creationDate: number;
}
