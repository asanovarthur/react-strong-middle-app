import { ContentType } from "types";
// some note

export const mockNote0 = {
  id: 0,
  name: "Adventures of Michael Jackson",
  uri: "adventures-of-michael-jackson", // сделать функцию, которая будет генерировать uri по name?
  parentId: null,
  creationDate: 0, // количество миллисекунд (moment.valueOf())
};

export const mockNote1 = {
  id: 1,
  name: "Adventures of Kobe Bryant",
  uri: "adventures-of-kobe-bryant",
  parentId: null,
  creationDate: 1,
};

export const mockNote2 = {
  id: 2,
  name: "Adventures of Ed Sheeran",
  uri: "adventures-of-ed-sheeran",
  parentId: null,
  creationDate: 2,
};

export const mockNote3 = {
  id: 3,
  name: "Ed Sheeran about music",
  uri: "ed-sheeran-about-music",
  parentId: 2,
  creationDate: 3,
};

export const mockNote4 = {
  id: 4,
  name: "Ed Sheeran's school years",
  uri: "ed-sheerans-school-years",
  parentId: 2,
  creationDate: 4,
};

export const mockNote5 = {
  id: 5,
  name: "First school year",
  uri: "first-school-year",
  parentId: 4,
  creationDate: 5,
};

export const mockNotes = [
  mockNote0,
  mockNote1,
  mockNote2,
  mockNote3,
  mockNote4,
  mockNote5,
];

// some content block

export const contentBlock0 = {
  id: 0,
  noteId: 0,
  type: ContentType.TEXT,
  value: "Some text about Michael Jackson",
  order: 0,
};

export const contentBlock1 = {
  id: 1,
  noteId: 0,
  type: ContentType.TEXT,
  value: "Some additional text about Michael Jackson",
  order: 1,
};

export const contentBlock2 = {
  id: 2,
  noteId: 1,
  type: ContentType.TEXT,
  value: "Some text about Kobe Bryant",
  order: 2,
};

export const contentBlocks = [contentBlock0, contentBlock1, contentBlock2];
