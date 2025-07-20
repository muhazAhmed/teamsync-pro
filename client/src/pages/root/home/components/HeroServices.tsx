import taskManIMG from "../../../../assets/images/taskMan.png";
import attendanceIMG from "../../../../assets/images/attendanceMan.png";
import leaveManIMG from "../../../../assets/images/leavMan.png";
import payrollIMG from "../../../../assets/images/payroll.png";
import feedsIMG from "../../../../assets/images/feeds.png";
import { motion } from "framer-motion";

const arrayOfServices = [
  {
    label: "Task Management",
    img: taskManIMG,
    para: "Manage and organize your tasks efficiently. Stay on top of deadlines and track progress effortlessly.",
  },
  {
    label: "Attendance Management",
    img: attendanceIMG,
    para: "Track attendance and ensure accountability. Automate reporting and reduce manual intervention.",
  },
  {
    label: "Leave Management",
    img: leaveManIMG,
    para: "Manage leaves and ensure seamless communication. Keep everyone in sync with real-time leave updates.",
  },
  {
    label: "Payroll Management",
    img: payrollIMG,
    para: "Automate payroll processes and reduce manual work. Ensure accuracy and compliance with ease.",
  },
  {
    label: "Feeds",
    img: feedsIMG,
    para: "Stay updated with relevant news and updates. Access key information to stay informed and engaged.",
  },
];

const HeroServices = () => {
  return (
    <div className="hero-services w-full flex flex-col items-center justify-center gap-8 h-[95vh]">
      <h1 className="text-[35px] font-extrabold text-center">
        Empower Your Team, Simplify Collaboration
        <br /> and Achieve More Together
      </h1>
      <p className="text-[15px] text-gray-400 text-center">
        TeamSync brings together powerful tools for task management, attendance
        tracking, and streamlined workflows.
        <br />
        Focus on what matters, while our automation and insights drive your
        team’s success.
      </p>

      <div className="service-card flex gap-6">
        {arrayOfServices.map((service, index) => (
          <motion.div
            key={index}
            className="card flex gap-3 items-center flex-col bg-primary/10 backdrop-blur-md border border-primary/40 shadow-md w-64 rounded-3xl p-5 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {service.img && (
              <img src={service.img} className="w-[7vw]" alt={service.label} />
            )}
            <h3 className="font-bold">{service.label}</h3>
            <p className="text-[14px] text-gray-400 text-center">
              {service.para}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroServices;
