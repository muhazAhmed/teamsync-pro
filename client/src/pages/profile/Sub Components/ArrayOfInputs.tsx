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

type ProfileLabels = Record<string, string>;

export const profileLabels = (pageName: string): ProfileLabels | undefined => {
  if (pageName === "Profile")
    return {
      companyEmail: "Company Email",
      firstName: "First Name",
      lastName: "Last Name",
      location: "Location",
      phone: "Phone",
    };
  else if (pageName === "Personal Information")
    return {
      dob: "Date Of Birth",
      maritalStatus: "Marital Status",
      bloodGroup: "Blood Group",
      fatherName: "Father Name",
      placeOfBirth: "Place Of Birth",
      religion: "Religion",
      physicallyChallenged: "Physically Challenged",
      nationality: "Nationality",
    };
  else if (pageName === "Employment")
    return {
      department: "Department",
      designation: "Designation",
      workLocation: "Work Location",
      startDate: "Start Date",
      reportingManager: "Reporting Manager",
      ctc: "CTC",
    };
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
