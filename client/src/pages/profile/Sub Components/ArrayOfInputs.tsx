export const maritalStatus = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
];

export const gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const physicallyChallenged = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const profileLabels = (pageName: string) => {
  if (pageName === "Profile")
    return "Company Email,First Name,Last Name,Location,Phone";
  else if (pageName === "Personal Information")
    return "Date Of Birth,Nationality,Marital Status,Blood Group,Father Name,Place Of Birth,Religion,Physically Challenged";
  else if (pageName === "Employment")
    return "Department,Designation,Work Location,Start Date,Reporting Manager,CTC";
};

export const dropdownKeys = ["maritalStatus", "physicallyChallenged"];

export const getOptionsByKey = (key: string) => {
  switch (key) {
    case "maritalStatus":
      return maritalStatus;
    case "physicallyChallenged":
      return physicallyChallenged;
    default:
      return [];
  }
};
