import moment from "moment";
import { UserDetails } from "../../../utils/commonFunctions";

const GreetingsLayer = () => {
  const name = UserDetails()?.firstName;
  const getGreeting = () => {
    const hour = moment().hour();
    return hour < 5
      ? "Good Night"
      : hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : hour < 21
      ? "Good Evening"
      : "Good Night";
  };
  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        {getGreeting()}, {name} 👋
      </h1>
      <div className="hidden md:block">
        <h3 className="text-lg text-gray-300 font-medium">
          {moment().format("dddd")}
        </h3>
        <h3 className="text-3xl font-semibold">{moment().format("hh:mm A")}</h3>
      </div>
    </div>
  );
};

export default GreetingsLayer;
