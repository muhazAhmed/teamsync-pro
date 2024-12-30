import { icon } from "../../../UI-Components/Icons/Icons";
import { payrollCardData } from "../data";
import { motion } from "framer-motion";

const PayrollCards = () => {
  const checkValueColor = (item: string) => {
    if (item.split("")[0] === "-") return "text-red-400";
    else return "text-green-400";
  };
  return (
    <div className="w-full flex items-center justify-between px-2 gap-10">
      {payrollCardData?.map((item: any, index: number) => (
        <motion.div
          className="p-2 py-6 rounded-xl shadow-lg shadow-slate-500 flex flex-col items-start justify-center gap-5 w-full cursor-pointer"
          key={index}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex gap-3 items-center justify-center w-full">
            <i
              className={`${
                icon?.[item?.icon || ["save"]]
              } bg-white/30 text-purple-400 p-2 px-3 rounded-full text-lg`}
            ></i>
            <div className="flex items-start flex-col">
              <h1 className="text-xl font-semibold">{item?.amount}</h1>
              <h5 className="text-[14px] text-green-200">{item?.label}</h5>
            </div>
          </div>
          <p className={`text-xs px-3 ${checkValueColor(item?.statValue)}`}>
            {item?.statValue} of last month
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default PayrollCards;
