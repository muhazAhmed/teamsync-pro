export const profileConfigs = (inputs: any) => [
    { type: "text", name: "firstName", value: inputs.firstName || "", label: "First Name", },
    { type: "text", name: "lastName", value: inputs.lastName || "", label: "Last Name", },
    { type: "text", name: "location", value: inputs.location || "", label: "Location", },
    { type: "email", name: "companyEmail", value: inputs.companyEmail || "", label: "Company Email", },
    { type: "number", name: "phone", value: inputs.phone || "", label: "Phone" },
];

export const personalInfoConfigs = (inputs: any) => [
    { type: "text", name: "dob", value: inputs.dob || "", label: "Date Of Birth", },
    { type: "text", name: "nationality", value: inputs.nationality || "", label: "Nationality", },
    { type: "text", name: "maritalStatus", value: inputs.maritalStatus || "", label: "Marital Status", },
    { type: "text", name: "bloodGroup", value: inputs.bloodGroup || "", label: "Blood Group", },
    { type: "text", name: "placeOfBirth", value: inputs.placeOfBirth || "", label: "Place of Birth" },
    { type: "text", name: "fatherName", value: inputs.fatherName || "", label: "Father Name" },
    { type: "text", name: "religion", value: inputs.religion || "", label: "Religion" },
    { type: "text", name: "physicallyChallenged", value: inputs.physicallyChallenged || "", label: "Physically Challenged" },
];

export const employmentConfigs = (inputs: any) => [
    { type: "text", name: "designation", value: inputs.designation || "", label: "Designation", },
    { type: "text", name: "department", value: inputs.department || "", label: "Department", },
    { type: "text", name: "location", value: inputs.location || "", label: "Location", },
    { type: "text", name: "reportingManager", value: inputs.reportingManager || "", label: "Reporting Manager", },
    { type: "text", name: "startDate", value: inputs.startDate || "", label: "Start Date" },
    { type: "text", name: "ctc", value: inputs.ctc || "", label: "Annual CTC" },
    { type: "text", name: "status", value: inputs.status || "", label: "Status" },
];

export const personalInfoArrayKeys = ["dob", "nationality", "maritalStatus", "bloodGroup", "placeOfBirth", "fatherName", "religion", "physicalStatus"]

export const employmentArrayKeys = ["designation", "department", "location", "reportingManager", "startDate", "ctc", "status"]