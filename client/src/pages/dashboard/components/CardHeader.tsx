import { icon } from "../../../ui-library/Icons";
import Separator from "../../../ui-library/Separator";

type Props = {
  label: string;
  isIconRequired?: boolean;
};
const CardHeader = ({ label, isIconRequired = true }: Props) => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <label className="text-[16px]">{label}</label>
        {isIconRequired && (
          <div className="bg-primary/40 rounded-full w-6 h-6 flex items-center justify-center">
            <i className={`${icon?.arrowRight} text-sm text-gray-300`}></i>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
};

export default CardHeader;
