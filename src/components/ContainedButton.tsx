import { FC } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

export const ContainedButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="contained" size="small" {...props}>
      {children}
    </Button>
  );
};
