import { FC } from "react";
import { CardProps } from "./props";
import { motion } from "framer-motion";
import clsx from "clsx";

const Card: FC<CardProps> = ({
  boxShadow = true,
  children,
  hoverStyles = false,
  hoverEffect = false,
  ...props
}) => {
  const motionProps = hoverEffect
    ? {
        whileHover: { scale: 1.05 },
        transition: { duration: 0.3 },
      }
    : {};
  return (
    <motion.div
      {...props}
      className={clsx(
        "custom-cards",
        hoverStyles &&
          "border-transparent hover:border-[var(--primary)] border-2",
        props?.className
      )}
      style={{ boxShadow: boxShadow ? "-1px 5px 25px var(--primary)" : "none" }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;
