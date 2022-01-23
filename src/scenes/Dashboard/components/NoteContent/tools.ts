import { ContentBlock as ContentBlockType } from "types";

export const getReorderedNotesList = (
  list: ContentBlockType[],
  startIndex: number,
  endIndex: number
) => {
  list[startIndex] = { ...list[startIndex], order: list[endIndex].order };
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);

  if (startIndex > endIndex) {
    list.forEach((item, index) => {
      if (index > endIndex && index <= startIndex) {
        list[index] = { ...item, order: item.order + 1 };
      }
    });
  } else if (startIndex < endIndex) {
    list.forEach((item, index) => {
      if (index >= startIndex && index < endIndex)
        list[index] = { ...item, order: item.order - 1 };
    });
  }

  return list;
};
