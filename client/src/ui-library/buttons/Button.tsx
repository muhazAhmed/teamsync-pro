import { FC } from "react";
import { ButtonProps } from "../props";
import { animatedIcon, Icon } from "../Icons";
import { Button, Tooltip } from "@nextui-org/react";
import clsx from "clsx";

const Buttons: FC<ButtonProps> = ({
  label,
  variant = "solid",
  icon,
  iconPosition = "left",
  tooltip,
  selected,
  iconStyles,
  loading = false,
  ...props
}) => {
  const ButtonContent = (
    <Button
      variant={variant}
      disabled={loading}
      {...props}
      classNames={{
        base: clsx("custom-button", props.className),
      }}
    >
      {loading && animatedIcon("spinner", "spin")}
      {icon && iconPosition === "left" && Icon(icon, iconStyles)}
      {loading ? "Please wait" : label}
      {icon && iconPosition === "right" && Icon(icon, iconStyles)}
    </Button>
  );

  return tooltip ? (
    <Tooltip
      content={tooltip.content}
      color={tooltip.color || "primary"}
      placement={tooltip.placement || "top"}
      className="round"
    >
      {ButtonContent}
    </Tooltip>
  ) : (
    ButtonContent
  );
};

export default Buttons;
