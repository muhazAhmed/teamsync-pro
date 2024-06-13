import { FC } from "react";
import ButtonIcon from "./ButtonIcon";
import { ButtonProps, buttonGroupStyles } from "./ButtonStyle";
import "./style.css";

interface ButtonGroupProps {
  className?: string;
  id?: any;
  items: ButtonProps[];
  selected?: boolean;
  disabled?: boolean;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  className,
  id,
  items,
  selected = false,
}) => {
  return (
    <div
      className={`btn-group ${className && className}`}
      id={id ? id : undefined}
      style={buttonGroupStyles?.buttonGroup}
    >
      {items.map((item, index) => (
        <ButtonIcon
          key={index}
          label={item.label}
          icon={item.icon || ""}
          iconPosition={item.iconPosition}
          color={item.color}
          textColor={item.textColor}
          className={selected ? "btn-primary" : item.className}
          variant={item.variant}
          action={item.action}
          id={item.id}
          tooltip={item.tooltip}
          disabled={item.disabled}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
