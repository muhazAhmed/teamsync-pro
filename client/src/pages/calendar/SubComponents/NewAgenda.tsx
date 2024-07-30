import { FC, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import { icon } from "../../../UI-Components/Icons/Icons";
import "./style.css";
import { DatePicker, Radio, RadioGroup } from "@nextui-org/react";
import TimePicker from "../../../UI-Components/TimePicker/TimePicker";
import ButtonIcon from "../../../UI-Components/Buttons/ButtonIcon";
import { closeModal } from "../../../utils/commonFunctions";
import { motion } from "framer-motion";

interface ModalProps {
  setModal: any;
}

const NewAgenda: FC<ModalProps> = ({ setModal }) => {
  const [selected, setSelected] = useState<string>("details");
  const [selectedFromTime, setSelectedFromTime] = useState<string>("");
  const [selectedToTime, setSelectedToTime] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleMenuChange = (action: string) => {
    if (selected === "details" && action === "next")
      return setSelected("location");
    else if (selected === "location" && action === "next")
      return setSelected("guest");
    else if (selected === "location" && action === "back")
      return setSelected("details");
    else if (selected === "guest" && action === "back")
      return setSelected("location");
  };

  const variants = {
    enter: (direction: string) => ({
      x: direction === "next" ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: (direction: string) => ({
      x: direction === "next" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  console.log(selectedFromTime, selectedToTime);

  return (
    <Modal setModal={setModal} className="agenda-modal" header={false}>
      <div className="modal-body">
        <div className="header">
          <i className={icon?.pin}></i>
          <h1>When and where will it take place?</h1>
        </div>
        <div className="progress">
          <div
            className={`${
              selected === "details" ? "selected" : ""
            } progress-bar`}
          >
            <span></span>
            <h5>Details</h5>
          </div>
          <div
            className={`${
              selected === "location" ? "selected" : ""
            } progress-bar`}
          >
            <span></span>
            <h5>Date and location</h5>
          </div>
          <div
            className={`${selected === "guest" ? "selected" : ""} progress-bar`}
          >
            <span></span>
            <h5>Guests</h5>
          </div>
        </div>
        <motion.div
          className="body"
          key={selected}
          custom={selected === "location" ? "next" : "back"}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
        >
          {selected === "location" ? (
            <div className="body">
              <div className="date">
                <div className="date-input">
                  <label>Date</label>
                  <DatePicker
                    variant="bordered"
                    showMonthAndYearPickers
                    aria-label=""
                  />
                </div>
                <div className="date-input">
                  <label>From</label>
                  <TimePicker setSelectedTime={setSelectedFromTime} />
                </div>
                <div className="date-input">
                  <label>To</label>
                  <TimePicker setSelectedTime={setSelectedToTime} />
                </div>
              </div>
              <div className="location">
                <label>Location</label>
                <RadioGroup>
                  <Radio
                    value="physical"
                    className="radio-toggle"
                    onChange={(e) => setSelectedLocation(e?.target?.value)}
                  >
                    Physical
                  </Radio>
                  {selectedLocation === "physical" && <input />}
                  <Radio
                    value="virtual"
                    className="radio-toggle"
                    onChange={(e) => setSelectedLocation(e?.target?.value)}
                  >
                    Virtual
                  </Radio>
                  {selectedLocation === "virtual" && <input />}
                </RadioGroup>
              </div>
            </div>
          ) : selected === "details" ? (
            <div>{/* Details content goes here */}</div>
          ) : (
            <div>{/* Default content goes here */}</div>
          )}
        </motion.div>
        <div className="footer-btn">
          <ButtonIcon
            icon="arrowLeft"
            label="Back"
            variant="light"
            action={() => handleMenuChange("back")}
            disabled={selected === "details"}
          />
          <div className="btn-end">
            {selected === "guest" ? (
              <ButtonIcon icon="send" label="Save" className="btn-primary" />
            ) : (
              <ButtonIcon
                icon="forward"
                label="Next"
                className="btn-primary"
                iconPosition="right"
                action={() => handleMenuChange("next")}
              />
            )}
            <ButtonIcon
              icon="close"
              label="Cancel"
              className="btn-ghost"
              action={() => closeModal(setModal)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewAgenda;
