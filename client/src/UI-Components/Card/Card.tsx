import { FC } from "react";
import { motion } from "framer-motion";

interface CardProps {
  content: any;
  id?: any;
  className?: string;
  style?: any;
  boxShadow?: boolean;
  hoverEffect?: boolean;
  animation?:
    | "fadeIn"
    | "fadeOut"
    | "none"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight";
}

const Card: FC<CardProps> = ({
  content,
  id,
  className,
  style,
  boxShadow = true,
  hoverEffect = false,
  animation = "none",
}) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: "8px",
    padding: "16px",
    minWidth: "20vw",
    backgroundColor: "var(--card)",
    color: "#fff",
    boxShadow: boxShadow ? "-1px 5px 25px var(--primary)" : "none",
  };

  const motionProps = hoverEffect
    ? {
        whileHover: { scale: 1.05 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <motion.div
      style={{ ...cardStyle, ...style }}
      className={`custom-card ${animation}`}
      id={id ? id : undefined}
      {...motionProps}
    >
      <div className={className ? className : undefined} style={style}>
        {content}
      </div>
    </motion.div>
  );
};

export default Card;
