import { FC } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContainedButton as Button } from "components";

type ByttonWithIconProps = {
  disabled?: boolean;
  icon: IconDefinition;
  text: string;
  onClick?: () => void;
};

export const ButtonWithIcon: FC<ByttonWithIconProps> = ({
  disabled,
  icon,
  text,
  onClick,
}) => {
  return (
    <Button disabled={disabled ?? false} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {text}
    </Button>
  );
};
