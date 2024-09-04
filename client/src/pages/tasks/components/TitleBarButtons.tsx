import { FC } from "react";
import { Tooltip } from "@nextui-org/react";
import { TitleBarButtonsProps } from "../props";

const TitleBarButtons: FC<TitleBarButtonsProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltipContent,
  tooltipColor = "primary",
  isHovered,
  iconType,
  hoverColor,
  defaultColor,
}) => {
  return (
    <Tooltip content={tooltipContent} color={tooltipColor}>
      <i
        className={`${iconType} ${
          isHovered ? hoverColor : defaultColor
        } text-sm`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      ></i>
    </Tooltip>
  );
};

export default TitleBarButtons;
