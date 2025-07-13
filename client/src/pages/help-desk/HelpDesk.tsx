import { useEffect, useState } from "react";
import "./helpDesk.css";
import { usePageName } from "../../utils/commonFunctions";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Icon } from "../../ui-library/Icons";
import Card from "../../ui-library/Card";
import { priorities } from "../profile/Sub Components/ArrayOfInputs";
import CustomInput from "../../ui-library/inputs/Input";
import { categoriesArray, handleSubmit } from "./validations";
import Loader from "../../UI-Components/Loader/Loader";
import PopupModal from "./subComponents/Modal";
import GettingStarted from "./subComponents/GettingStarted";
import ManagingTasks from "./subComponents/ManagingTasks";
import Others from "./subComponents/Others";
import Buttons from "../../ui-library/buttons/Button";
import { categoriesData } from "./data";

const HelpDesk = () => {
  const [categories, setCategories] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [popupModal, setPopupModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number>(0);

  useEffect(() => {
    usePageName("Help Desk");
  }, []);

  const cardClick = (id: number) => {
    setSelectedCard(id);
    setPopupModal(true);
  };

  const handleClick = () => {
    const inputs = { categories, priority, subject, description };
    handleSubmit(inputs, setLoading);
    clearStates();
  };

  const clearStates = () => {
    setPriority("");
    setCategories("");
    setDescription("");
    setSubject("");
  };

  const renderCardData = (id: number) => {
    if (id === 1) {
      return { component: <GettingStarted />, title: "Getting Started" };
    } else if (id === 2) {
      return { component: <ManagingTasks />, title: "Managing Tasks" };
    } else if (id === 3) {
      return { component: <Others />, title: "Others" };
    } else return null;
  };

  return (
    <div className="help-desk">
      {loading && <Loader />}
      {popupModal && (
        <PopupModal
          setModal={setPopupModal}
          title={renderCardData(selectedCard)?.title}
        >
          {renderCardData(selectedCard)?.component}
        </PopupModal>
      )}
      <div className="header slideDown">
        <h1>Search for Resources</h1>
        <div className="search">
          <Input
            startContent={Icon("search")}
            placeholder="Enter your search terms..."
            size="sm"
            radius="full"
            name="searchName"
            endContent={Icon("arrowRightRounded")}
            className="h-full header-input"
          />
        </div>
      </div>
      <div className="body">
        <h1>
          Or <span>Browse</span> categories
        </h1>
        <div className="cards fadeIn">
          {categoriesData.map((item) => (
            <Card className="w-[25%] p-[20px] cursor-pointer" hoverStyles>
              <div
                className="flex items-center gap-[1rem] flex-col"
                onClick={() => cardClick(1)}
              >
                {Icon(item.icon, {
                  fontSize: "30px",
                  color: "var(--secondary)",
                })}
                <h1 className="text-[15px] font-semibold">{item.title}</h1>
                <p className="text-[12px] text-center text-gray-400">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="ticket">
        <h1>Rise Ticket</h1>
        <Card hoverStyles>
          <div className="ticket-card">
            <div className="header">
              <Select
                isRequired
                label="Category"
                placeholder="Select Category..."
                value={categories}
              >
                {categoriesArray.map((item) => (
                  <SelectItem
                    key={item.value}
                    onClick={() => setCategories(item?.value)}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                isRequired
                label="Priority"
                placeholder="Choose Priority"
                value={priority}
              >
                {priorities.map((item, index) => (
                  <SelectItem
                    key={index}
                    startContent={Icon(item?.icon)}
                    onClick={() => setPriority(item?.value)}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <CustomInput
              name="subject"
              value={subject}
              setInputs={setSubject}
              label="Subject"
              placeholder="Subject line..."
              required
              variant="ghost"
              id="custom-input"
            />
            <CustomInput
              name="description"
              value={description}
              setInputs={setDescription}
              label="Description"
              placeholder="Write here..."
              required
              variant="ghost"
              id="desc"
            />
            <div className="footer">
              <Buttons
                icon="send"
                label="Submit"
                variant="shadow"
                iconPosition="left"
                className="btn-primary"
                tooltip={{ content: "Rise Ticket", placement: "top" }}
                onPress={handleClick}
              />
              <Buttons
                icon="trash"
                label="Clear"
                iconPosition="left"
                className="btn-ghost"
                id="clear"
                onPress={clearStates}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpDesk;
