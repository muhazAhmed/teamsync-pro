import { motion } from "framer-motion";
import { HoverAnimationProps } from "./props";
const HoverAnimation: React.FC<HoverAnimationProps> = ({
  initialAnimation = true,
  children,
  scale = 1.03,
  ...props
}) => {
  return (
    <motion.div
      {...props}
      initial={initialAnimation ? { scale: 0.95, opacity: 0 } : false}
      animate={initialAnimation ? { scale: 1, opacity: 1 } : {}}
      whileHover={{ scale: scale }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverAnimation;
