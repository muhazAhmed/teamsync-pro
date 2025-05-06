import { FC } from "react";
import "./style.css";
import { icon } from "../../ui-library/Icons";

interface ChipProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  variant?: "primary" | "ghost";
  borderRadius?: "none" | "semi" | "half" | "full";
  textColor?: string;
  iconItem?: string;
  iconStyles?: string;
}
const Chip: FC<ChipProps> = ({
  className,
  id,
  style,
  label,
  onClick,
  variant = "primary",
  borderRadius = "half",
  textColor,
  iconItem,
  iconStyles,
}) => {
  return (
    <div
      className={`chip ${className} chip-${borderRadius} btn-${variant} flex gap-2`}
      id={id}
      style={style}
      onClick={onClick}
    >
      <p style={{ color: textColor ? textColor : "white" }}>{label}</p>
      {iconItem && <i className={`${icon?.[iconItem]} ${iconStyles}`}></i>}
    </div>
  );
};

export default Chip;
