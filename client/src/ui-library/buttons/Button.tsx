import { FC } from "react";
import { ButtonProps } from "../props";
import { animatedIcon, Icon } from "../Icons";
import { Button, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import HoverAnimation from "../HoverAnimation";

const Buttons: FC<ButtonProps> = ({
  label,
  variant = "solid",
  icon,
  iconPosition = "left",
  tooltip,
  selected,
  iconStyles,
  loading = false,
  hoverAnimation = false,
  ...props
}) => {
  const ButtonContent = () => (
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

  const Main = hoverAnimation ? (
    <HoverAnimation>{ButtonContent()}</HoverAnimation>
  ) : (
    ButtonContent()
  );

  return tooltip ? (
    <Tooltip
      content={tooltip.content}
      color={tooltip.color || "primary"}
      placement={tooltip.placement || "top"}
      className="round"
    >
      {Main}
    </Tooltip>
  ) : (
    Main
  );
};

export default Buttons;
