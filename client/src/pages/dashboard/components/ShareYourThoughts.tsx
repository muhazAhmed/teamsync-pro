import HoverAnimation from "../../../ui-library/HoverAnimation";
import { icon } from "../../../ui-library/Icons";
import { defaultComponentsClassName } from "../services";

const ShareYourThoughts = () => {
  return (
    <HoverAnimation className={defaultComponentsClassName}>
      <div className="flex items-center justify-center gap-4">
        <i className={icon?.chat}></i>
        <p>Share your thoughts</p>
      </div>
    </HoverAnimation>
  );
};

export default ShareYourThoughts;
