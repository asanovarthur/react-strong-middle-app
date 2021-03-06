import { FC } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContainedButton as Button } from "components";

type ByttonWithIconProps = {
  icon: IconDefinition;
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export const ButtonWithIcon: FC<ByttonWithIconProps> = ({
  disabled,
  icon,
  text,
  className,
  onClick,
}) => {
  return (
    <Button
      disabled={disabled ?? false}
      onClick={onClick}
      className={className ?? ""}
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </Button>
  );
};
