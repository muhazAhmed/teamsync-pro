import PayrollCards from "./components/PayrollCards";
import PayrollChart from "./components/PayrollChart";
import PayrollHeader from "./components/PayrollHeader";

const Payroll = () => {
  return (
    <div className="flex flex-col w-full gap-4 h-[85vh] relative">
      <PayrollHeader />
      <PayrollCards />
      <PayrollChart />
    </div>
  );
};

export default Payroll;
