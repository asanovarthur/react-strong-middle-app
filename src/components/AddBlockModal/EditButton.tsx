import { FC } from "react";

type EditButtonProps = {
  cmd: string;
  arg?: string;
  name: string;
};

export const EditButton: FC<EditButtonProps> = ({ cmd, arg, name }) => {
  return (
    <button
      onMouseDown={(evt) => {
        evt.preventDefault();
        document.execCommand(cmd, false, arg); // TODO: Look for alternative
      }}
    >
      {name}
    </button>
  );
};
