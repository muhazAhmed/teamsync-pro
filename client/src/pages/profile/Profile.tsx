import { Avatar, Tooltip } from "@nextui-org/react";
import "./profile.css";
import userLogo from "../../assets/images/man.png";
import { icon } from "../../UI-Components/Icons/Icons";
import { useEffect, useState } from "react";
import { ResponseInstances, useLocalStorage, usePageName } from "../../utils/commonFunctions";
import { getMethodAPI } from "../../utils/apiCallMethods";
import { serverVariables } from "../../utils/serverVariables";
import { useParams } from "react-router-dom";
import Loader from "../../UI-Components/Loader/Loader";
import toast from "react-hot-toast";
import EditProfileModal from "./Sub Components/EditProfileModal";
import { Variables } from "../../utils/Constants";
import {
  DataForEmployment,
  DataForPersonalDetails,
  DataForProfile,
} from "./ArrayOfProfile";

type ResponseData = {
  [key: string]: any;
};

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>();
  const userID = useParams();
  const [ResponseData, setResponseData] = useState<ResponseData | null>(null);
  const personalInformation = ResponseData?.personalInformation || [];
  const employment = ResponseData?.employment || [];
  const isHr = useLocalStorage("client-id") == Variables.HR_ROLE;

  useEffect(() => {
    usePageName("User Profile");
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getMethodAPI(
      `hr${serverVariables.FETCH_ONE_USER}${userID.id}`,
      "",
      setLoading
    );
    ResponseInstances(res, 200, setResponseData);
  };

  const onToggle = (name: string) => {
    if (name === "Employment" && !isHr)
      return toast.error("Only Hr can Edit this Details");
    setModalTitle(name);
    setEditModal(true);
  };

  const arrayOfProfile = DataForProfile(ResponseData);
  const arrayOfPersonalDetails = DataForPersonalDetails(personalInformation);
  const arrayOfEmployment = DataForEmployment(employment);

  return (
    <>
      <div className="profile">
        {loading && <Loader />}

        <div className="profile-body">
          <div className="container">
            <div
              className="header flex justify-between items-center"
              style={{ width: "100%" }}
            >
              <label>Profile</label>
              <Tooltip content="Edit" placement="bottom" color="primary">
                <i
                  className={icon.pencil}
                  onClick={() => onToggle("Profile")}
                ></i>
              </Tooltip>
            </div>
            <div className="profile-section">
              <Avatar
                src={userLogo}
                className="cursor-pointer"
                style={{ height: "15vh", width: "7vw" }}
              />
              {arrayOfProfile.map((item, index) => (
                <div className="items" key={index}>
                  <label>{item.label}</label>
                  <h4>{item.value}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div
              className="header flex justify-between items-center"
              style={{ width: "100%" }}
            >
              <label>Personal Details</label>
              <Tooltip content="Edit" placement="bottom" color="primary">
                <i
                  className={icon.pencil}
                  onClick={() => onToggle("Personal Information")}
                ></i>
              </Tooltip>
            </div>
            <div className="profile-section">
              {arrayOfPersonalDetails.map((item, index) => (
                <div className="items" key={index}>
                  <label>{item.label}</label>
                  <h4>{item.value}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="container" style={{ marginBottom: "2rem" }}>
            <div
              className="header flex justify-between items-center"
              style={{ width: "100%" }}
            >
              <label>Employment Details</label>
              <Tooltip content="Edit" placement="bottom" color="primary">
                <i
                  className={icon.pencil}
                  onClick={() => onToggle("Employment")}
                ></i>
              </Tooltip>
            </div>
            <div className="profile-section">
              {arrayOfEmployment.map((item, index) => (
                <div className="items" key={index}>
                  <label>{item.label}</label>
                  <h4>{item.value}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {editModal && (
        <EditProfileModal
          setEditModal={setEditModal}
          title={modalTitle || "Personal Info"}
        />
      )}
    </>
  );
};

export default Profile;
