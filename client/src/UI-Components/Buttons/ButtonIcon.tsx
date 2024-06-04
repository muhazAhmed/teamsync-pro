import { FC } from "react";
import "./ButtonStyle";
import { Button, Tooltip } from "@nextui-org/react";
import { Icon } from "../Icons/Icons";

interface ButtonProps {
  label: string;
  color?: "default" | "danger" | "primary" | "secondary" | "warning";
  textColor?: string;
  id?: any;
  className?: string;
  variant?: "solid" | "shadow" | "ghost" | "flat" | "faded" | "bordered";
  action?: any;
  icon: string;
  iconPosition?: string;
  tooltip?: TooltipProps;
}

interface TooltipProps {
  content: string;
  color?: "primary" | "danger";
  placement?: "top" | "bottom" | "left" | "right";
}

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
}) => {
  const buttonContent = (
    <Button
      className={className ? className : ""}
      color={color}
      variant={variant}
      style={{ color: textColor }}
      onClick={action}
      id={id ? id : undefined}
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
