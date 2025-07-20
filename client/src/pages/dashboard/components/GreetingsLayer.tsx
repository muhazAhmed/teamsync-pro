import moment from "moment";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Loader from "../../../ui-library/Loader/Loader";

const GreetingsLayer = () => {
  const { user, loading } = useCurrentUser();
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
      {loading && <Loader />}
      <h1 className="text-2xl sm:text-3xl font-semibold">
        {getGreeting()}, {user?.firstName} 👋
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
