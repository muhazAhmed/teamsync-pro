import { FC } from "react";
import { ChipProps } from "./props";
import { motion } from "framer-motion";
import clsx from "clsx";

const Chip: FC<ChipProps> = ({
  hoverEffect = false,
  children,
  variant = "primary",
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
        `p-[5px] cursor-pointer text-center max-w-[110%] min-w-fit btn-${variant}`,
        props?.className
      )}
      {...motionProps}
    >
      <span className="text-sm">{children}</span>
    </motion.div>
  );
};

export default Chip;
