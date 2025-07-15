import { Tooltip } from "@nextui-org/react";
import { icon } from "../../../ui-library/Icons";
import { defaultComponentsClassName } from "../services";
import HoverAnimation from "../../../ui-library/HoverAnimation";

const Atoms = () => {
  return (
    <div className={defaultComponentsClassName}>
      <div className="flex gap-2 w-full justify-evenly text-xl">
        <HoverAnimation scale={1.05}>
          <Tooltip content="Profile" color="primary">
            <i className={`${icon?.user}`}></i>
          </Tooltip>
        </HoverAnimation>

        <HoverAnimation>
          <Tooltip content="Notifications" color="primary">
            <i className={`${icon?.notification}`}></i>
          </Tooltip>
        </HoverAnimation>
        <HoverAnimation>
          <Tooltip content="Settings" color="primary">
            <i className={`${icon?.gear}`}></i>
          </Tooltip>
        </HoverAnimation>

        <HoverAnimation>
          <Tooltip content="Help" color="primary">
            <i className={`${icon?.help}`}></i>
          </Tooltip>
        </HoverAnimation>
      </div>
    </div>
  );
};

export default Atoms;
