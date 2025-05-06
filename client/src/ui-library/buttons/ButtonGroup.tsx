import { FC } from "react";
import { ButtonGroupProps } from "../props";
import Buttons from "./Button";
import clsx from "clsx";

const ButtonGroup: FC<ButtonGroupProps> = ({ items, ...props }) => {
  return (
    <div className="btn-group flex justify-center" {...props}>
      {items.map((item, index) => (
        <Buttons
          key={index}
          {...item}
          className={clsx(item?.selected && "btn-primary", item?.className)}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
