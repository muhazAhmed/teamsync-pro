import HoverAnimation from "../../../ui-library/HoverAnimation";
import { icon } from "../../../ui-library/Icons";
import { defaultComponentsClassName } from "../services";

const Extras = () => {
  return (
    <div className="flex gap-3 w-full">
      <HoverAnimation className={`${defaultComponentsClassName} h-full`}>
        <div className="w-full flex items-center justify-between">
          <label>Holiday</label>
          <i className={`${icon?.calendar} text-gray-400`}></i>
        </div>
        <div className="flex flex-col p-2 gap-1 text-sm">
          <p className="">Team Outing</p>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-diamond text-primary mr-2"></i> 2 days
          </div>
        </div>
        <div className="flex flex-col p-2 gap-1 text-sm">
          <p className="">Labor day</p>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-diamond text-primary mr-2"></i> 2 days
          </div>
        </div>
      </HoverAnimation>
      <HoverAnimation className={`${defaultComponentsClassName} h-full`}>
        <div className="w-full flex items-center justify-between">
          <label>Feeds</label>
          <i className="fa-solid fa-comment-dots text-gray-400"></i>
        </div>
        <div className="flex flex-col p-2 gap-1">
          <p className="">FYL New Company</p>
          <div className="flex items-center justify-between gap-1 w-full">
            <span className="text-[12px] text-gray-400">Policy</span>{" "}
            <span className="text-[12px] text-gray-400">2 days ago</span>
          </div>
        </div>
        <div className="flex flex-col p-2 gap-1">
          <p className="">Quarterly Newsletter</p>
          <div className="flex items-center justify-between gap-1 w-full">
            <span className="text-[12px] text-gray-400">Published</span>{" "}
            <span className="text-[12px] text-gray-400">1 week ago</span>
          </div>
        </div>
      </HoverAnimation>
    </div>
  );
};

export default Extras;
