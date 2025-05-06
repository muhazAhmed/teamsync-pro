import { FC, useState } from "react";
import { icon } from "../../../ui-library/Icons";
import "./style.css";
import { DatePicker, Radio, RadioGroup } from "@nextui-org/react";
import TimePicker from "../../../UI-Components/TimePicker/TimePicker";
import { closeModal } from "../../../utils/commonFunctions";
import { motion } from "framer-motion";
import CustomInput from "../../../UI-Components/Inputs/Input";
import Buttons from "../../../ui-library/buttons/Button";
import Modal from "../../../ui-library/Modal";

interface ModalProps {
  setModal: any;
}

const NewAgenda: FC<ModalProps> = ({ setModal }) => {
  const [selected, setSelected] = useState<string>("details");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [guest, setGuest] = useState<string>("");
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

  const eventHeader = () => {
    if (selected === "details")
      return { title: "What's your event about?", headerIcon: "infoRounded" };
    else if (selected === "location")
      return { title: "When and where will it take place?", headerIcon: "pin" };
    else if (selected === "guest")
      return { title: "Who should join it?", headerIcon: "users" };
    return;
  };

  console.log(selectedFromTime, selectedToTime);

  return (
    <Modal setModal={setModal} className="agenda-modal">
      <div className="modal-body">
        <div className="header">
          {(() => {
            const { title, headerIcon } = eventHeader() || {
              title: "",
              headerIcon: "",
            };
            return (
              <>
                <i className={icon?.[headerIcon]}></i>
                <h1>{title}</h1>
              </>
            );
          })()}
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
                  {selectedLocation === "physical" && (
                    <input placeholder="Location details" />
                  )}
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
            <div className="body">
              <div className="date-input">
                <label>Title</label>
                <CustomInput
                  name="title"
                  setInputs={setTitle}
                  value={title || ""}
                  placeholder="Enter title here"
                />
              </div>
              <div className="date-input">
                <label>Description</label>
                <textarea
                  placeholder="Add description to encourage guests to attend this event. Link, emoji or new lines are supported"
                  name="description"
                  value={description || ""}
                  onChange={(e) => setDescription(e?.target?.value)}
                />
              </div>
            </div>
          ) : (
            <div className="data-input">
              <label>Guests</label>
              <CustomInput
                name="guest"
                setInputs={setGuest}
                value={guest || ""}
                placeholder="Guest name or email..."
              />
            </div>
          )}
        </motion.div>
        <div className="footer-btn">
          <Buttons
            icon="arrowLeft"
            label="Back"
            onPress={() => handleMenuChange("back")}
            hidden={selected === "details"}
          />
          <div className="btn-end">
            {selected === "guest" ? (
              <Buttons icon="send" label="Save" className="btn-primary" />
            ) : (
              <Buttons
                icon="forward"
                label="Next"
                className="btn-primary"
                iconPosition="right"
                onPress={() => handleMenuChange("next")}
              />
            )}
            <Buttons
              icon="close"
              label="Cancel"
              className="btn-ghost"
              onPress={() => closeModal(setModal)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewAgenda;
