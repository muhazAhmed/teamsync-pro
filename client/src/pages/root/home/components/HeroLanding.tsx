import { FC } from "react";
import taskImg from "../../../../assets/images/tasks.png";
import { icon } from "../../../../ui-library/Icons";
import { directWithNewTab, openModal } from "../../../../utils/commonFunctions";
import { motion } from "framer-motion";
import Buttons from "../../../../ui-library/buttons/Button";

interface Props {
  setModal: any;
  navigate: any;
  user: any;
}

const HeroLanding: FC<Props> = ({ setModal, navigate, user }) => {
  return (
    <div className="hero-landing w-full flex flex-col items-center justify-center gap-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className="flex p-2 px-5 gap-2 rounded-full bg-[#3b3b3b] cursor-pointer shadow-2xl shadow-red-400"
        onClick={() =>
          directWithNewTab("https://github.com/muhazAhmed/teamsync-pro")
        }
      >
        <p className="text-sm">Star us on GitHub</p>
        <i className={`${icon?.starSolid} text-red-400`}></i>
      </motion.div>
      <motion.h1
        className="text-[30px] font-extrabold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      >
        Elevate Team Collaboration and Efficiency
      </motion.h1>
      <motion.p
        className="text-[15px] text-gray-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
      >
        TeamSync is an open-source platform designed to streamline team
        workflows by integrating task management,
        <br /> attendance tracking, and collaborative tools. Empower your team
        with smart automation and insightful analytics to
        <br /> boost productivity and foster seamless collaboration.
      </motion.p>
      <motion.div
        className="btn flex items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
      >
        <Buttons
          icon="rocket"
          label="Get Started"
          className="btn-primary shadow-2xl shadow-cyan-400"
          hoverAnimation
          onPress={() =>
            navigate(user ? `/dashboard/${user?._id}` : "/user/form")
          }
        />
        <Buttons
          icon="eye"
          label="Request Demo"
          color="secondary"
          variant="ghost"
          className="shadow-2xl shadow-purple-400 border-primary"
          hoverAnimation
          onPress={() => openModal(setModal)}
        />
      </motion.div>
      <motion.img
        src={taskImg}
        alt="image"
        className=" w-[70vw] rounded-lg transform mt-8 shadow-2xl shadow-cyan-700"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      />
    </div>
  );
};

export default HeroLanding;
