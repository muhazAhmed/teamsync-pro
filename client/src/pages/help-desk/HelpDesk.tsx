import { useEffect, useState } from "react";
import "./helpDesk.css";
import { usePageName } from "../../utils/commonFunctions";
import { Input, Select, SelectItem, input } from "@nextui-org/react";
import { Icon } from "../../UI-Components/Icons/Icons";
import Card from "../../UI-Components/Card/Card";
import { priorities } from "../profile/Sub Components/ArrayOfInputs";
import CustomInput from "../../UI-Components/Inputs/Input";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import { categoriesArray, handleSubmit } from "./validations";
import Loader from "../../UI-Components/Loader/Loader";

const HelpDesk = () => {
  const [categories, setCategories] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    usePageName("Help Desk");
  }, []);

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

  return (
    <div className="help-desk">
      {loading && <Loader />}
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
          />
        </div>
      </div>
      <div className="body">
        <h1>
          Or <span>Browse</span> categories
        </h1>
        <div className="cards fadeIn">
          <Card
            content={
              <div className="card-body">
                {Icon("rocket")}
                <h1>Getting Started</h1>
                <p>Articles to get you up & running, quickly and easy.</p>
              </div>
            }
          />
          <Card
            content={
              <div className="card-body">
                {Icon("checkList")}
                <h1>Managing Tasks</h1>
                <p>Organize, prioritize, and track your tasks efficiently.</p>
              </div>
            }
          />
          <Card
            content={
              <div className="card-body">
                {Icon("gears")}
                <h1>Others</h1>
                <p>Discover more features to enhance your experience.</p>
              </div>
            }
          />
        </div>
      </div>
      <div className="ticket slideUp">
        <h1>Rise Ticket</h1>
        <Card
          content={
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
                <ButtonIcon
                  icon="send"
                  label="Submit"
                  variant="shadow"
                  iconPosition="left"
                  className="btn-primary"
                  tooltip={{ content: "Rise Ticket", placement: "top" }}
                  action={handleClick}
                />
                <ButtonIcon
                  icon="trash"
                  label="Clear"
                  iconPosition="left"
                  className="btn-ghost"
                  id="clear"
                  action={clearStates}
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default HelpDesk;
