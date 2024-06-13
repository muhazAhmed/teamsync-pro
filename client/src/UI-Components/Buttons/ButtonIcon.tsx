import { FC } from "react";
import "./ButtonStyle";
import { Button, Tooltip } from "@nextui-org/react";
import { Icon } from "../Icons/Icons";
import { ButtonProps } from "./ButtonStyle";

const ButtonIcon: FC<ButtonProps> = ({
  label,
  icon,
  iconPosition = "left",
  color = "default",
  textColor = "#fff",
  className,
  variant = "solid",
  action,
  id,
  tooltip,
  disabled = false,
}) => {
  const buttonContent = (
    <Button
      className={className ? className : ""}
      color={color}
      variant={variant}
      style={{ color: textColor }}
      onClick={action}
      id={id ? id : undefined}
      disabled={disabled}
    >
      {iconPosition === "left" && Icon(icon)} {label}
      {iconPosition === "right" && Icon(icon)}
    </Button>
  );

  return tooltip ? (
    <Tooltip
      content={tooltip.content}
      color={tooltip.color || "primary"}
      placement={tooltip.placement || "top"}
    >
      {buttonContent}
    </Tooltip>
  ) : (
    buttonContent
  );
};

export default ButtonIcon;
