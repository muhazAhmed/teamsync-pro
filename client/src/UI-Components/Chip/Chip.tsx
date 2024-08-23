import { FC } from "react";
import "./style.css";

interface ChipProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  variant?: "primary" | "ghost";
  borderRadius?: "none" | "semi" | "half" | "full";
  textColor?: string;
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
}) => {
  return (
    <div
      className={`chip ${className} chip-${borderRadius} btn-${variant}`}
      id={id}
      style={style}
      onClick={onClick}
    >
      <p style={{ color: textColor ? textColor : "white" }}>{label}</p>
    </div>
  );
};

export default Chip;
