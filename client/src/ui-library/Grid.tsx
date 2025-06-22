import { FC } from "react";
import { GridProps } from "./props";
import { motion } from "framer-motion";
import clsx from "clsx";

const Grid: FC<GridProps> = ({ children, ...props }) => {
  return (
    <motion.div {...props} className={clsx("grid", props?.className)}>
      {children}
    </motion.div>
  );
};

export default Grid;
