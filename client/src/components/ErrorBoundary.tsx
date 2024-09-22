import { FC, useEffect, useState } from "react";
import ErrorSVG from "../assets/svg/error_crash.svg";
import { useToast } from "../utils/commonFunctions";
import ButtonIcon from "../UI-Components/Buttons/ButtonIcon";
import ReportBug from "../pages/root/report-bug/ReportBug";
import Loader from "../UI-Components/Loader/Loader";

interface ErrorBoundaryProps {
  error: any;
  resetErrorBoundary: any;
}

const ErrorFallback: FC<ErrorBoundaryProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    useToast("Please take a min to report the bug", "error", 5000);
    console.log(error?.message);
  }, []);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      {loading && <Loader/>}
      {openModal && (
        <ReportBug
          bug={error?.message}
          resetErrorBoundary={resetErrorBoundary}
          setModal={setOpenModal}
          setLoading={setLoading}
        />
      )}
      <img src={ErrorSVG} alt="SVG" className="w-[30vw]" />
      <h2 className="text-[20px] font-bold">
        Something went wrong from our end
      </h2>
      <ButtonIcon
        icon="bug"
        label="Report Bug"
        color="danger"
        action={() => handleClick()}
      />
    </div>
  );
};

export default ErrorFallback;
