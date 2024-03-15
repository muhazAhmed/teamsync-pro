
export const DataForProfile = (ResponseData: any) => [
    {
        label: "Name",
        value: `${ResponseData?.firstName || "-"} ${ResponseData?.lastName || "-"}`,
    },
    { label: "Employee ID", value: ResponseData?.employeeID || "-" },
    { label: "Location", value: ResponseData?.location || "-" },
    { label: "Company Email", value: ResponseData?.companyEmail || "-" },
    { label: "Contact Number", value: ResponseData?.phone || "-" },
];

export const DataForPersonalDetails = (personalInformation: any) => [
    { label: "Date Of Birth", value: personalInformation?.dob || "-" },
    { label: "Nationality", value: personalInformation?.nationality || "-" },
    {
        label: "Marital Status",
        value: personalInformation?.maritalStatus || "-",
    },
    { label: "Blood Group", value: personalInformation?.bloodGroup || "-" },
    {
        label: "Place of Birth",
        value: personalInformation?.placeOfBirth || "-",
    },
    { label: "Father Name", value: personalInformation?.fatherName || "-" },
    { label: "Religion", value: personalInformation?.religion || "-" },
    {
        label: "Physically Challenged",
        value: personalInformation?.physicallyChallenged || "-",
    },
];

export const DataForEmployment = (employment: any) => [
    { label: "Designation", value: employment?.designation || "-" },
    { label: "Department", value: employment?.department || "-" },
    { label: "Location", value: employment?.workLocation || "-" },
    { label: "Reporting Manager", value: employment?.reportingManager || "-" },
    { label: "Start Date", value: employment?.startDate || "-" },
    { label: "Annual CTC", value: employment?.ctc || "-" },
];
