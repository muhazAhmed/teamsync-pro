import { useState } from "react";
import RootNavbar from "../../../components/RootNavbar";
import Card from "../../../UI-Components/Card/Card";
import { icon } from "../../../UI-Components/Icons/Icons";
import "./style.css";
import { clearInputs, useToast } from "../../../utils/commonFunctions";
import { message } from "../../../utils/Constants";
import { validEmail, validNameString } from "../../../utils/validation";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import Loader from "../../../UI-Components/Loader/Loader";
import { serverVariables } from "../../../utils/serverVariables";
import { Email } from "../../../utils/Email";
import Buttons from "../../../ui-library/buttons/Button";

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validNameString(inputs?.firstName))
      return useToast(message("First Name")?.REQUIRED_FIELD, "error");
    if (!validNameString(inputs?.email))
      return useToast(message("Email Address")?.REQUIRED_FIELD, "error");
    if (validEmail(inputs?.email))
      return useToast(message("")?.INVALID_EMAIL, "error");
    if (!validNameString(inputs?.message))
      return useToast(message("Message")?.REQUIRED_FIELD, "error");

    await postMethodAPI(serverVariables?.newContactMessage, inputs, setLoading);

    // ============= mail the message ===========================
    Email(inputs);
    return clearInputs(setInputs);
  };

  return (
    <>
      {loading && <Loader />}
      <RootNavbar />
      <div className="contact flex items-center justify-around w-full h-[90%]">
        <div className="left-items flex flex-col gap-20 w-[50%]">
          <div className="flex flex-col items-start gap-2 slideDown">
            <h1 className="text-[40px] font-bold">Contact Us</h1>
            <p className="text-[16px] text-gray-400 w-[60%]">
              Reach out to us to learn how TeamSync can enhance your team's
              productivity and streamline your task management.
            </p>
            <p className="text-[16px] text-gray-400">muhazvla313@gmail.com</p>
          </div>
          <div className="left-cub-items flex items-center justify-between w-full slideUp">
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-medium text-[20px]">Customer Support</h3>
              <p className="w-[80%] text-gray-400">
                Our support team is available around the clock to address any
                concern or queries you may have.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-medium text-[20px]">
                Feedback & Suggestions
              </h3>
              <p className="w-[80%] text-gray-400">
                We value your feedback and are dedicated to improving TeamSync.
                Your input helps shape the future of our platform.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-medium text-[20px]">General Support</h3>
              <p className="w-[90%] text-gray-400">
                For questions or support, please use this form or contact us
                directly. We're here to assist with any issues or inquiries.
              </p>
            </div>
          </div>
        </div>
        <div className="form-main w-[30%]">
          <Card
            animation="slideLeft"
            content={
              <div className="w-full h-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-1 items-start">
                  <h1 className="text-[25px] font-bold">Get in Touch</h1>
                  <p className="text-[15px] text-gray-300">
                    You can reach us anytime
                  </p>
                </div>
                <div className="form flex flex-col w-full p-2 gap-4">
                  <div className="names w-full flex items-center justify-between gap-4">
                    <input
                      className=" w-full p-2 pl-3 rounded-full outline-none border-1 bg-transparent border-gray-400"
                      placeholder="First name"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={inputs.firstName || ""}
                    />
                    <input
                      className="w-full p-2 pl-3 rounded-full outline-none border-1 bg-transparent border-gray-400"
                      placeholder="Last name"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={inputs.lastName || ""}
                    />
                  </div>
                  <div className="relative flex items-center">
                    <i
                      className={`${icon?.message} absolute left-4 text-gray-400 text-[20px]`}
                    ></i>
                    <input
                      className="w-full p-2 pl-12 rounded-full outline-none border-1 bg-transparent border-gray-400"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      required
                      value={inputs.email || ""}
                    />
                  </div>
                  <div className="relative flex items-center">
                    <i
                      className={`${icon?.phone} absolute left-4 text-gray-400 text-[18px]`}
                    ></i>
                    <input
                      className="w-full p-2 pl-12 rounded-full outline-none border-1 bg-transparent border-gray-400"
                      placeholder="Phone number (with code)"
                      name="phone"
                      type="number"
                      onChange={handleChange}
                      value={inputs.phone || ""}
                    />
                  </div>
                  <textarea
                    className="w-full h-28 rounded-2xl outline-none border-1 bg-transparent p-2 resize-none border-gray-400"
                    placeholder="How can we help?"
                    name="message"
                    onChange={handleChange}
                    required
                    value={inputs.message || ""}
                  />
                  <div className="flex w-full items-center justify-center">
                    <Buttons
                      icon="send"
                      label="Submit"
                      className="btn-primary w-[60%] font-semibold text-[16px] rounded-full"
                      iconPosition="right"
                      onPress={handleSubmit}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
