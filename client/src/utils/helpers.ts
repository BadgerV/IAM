import moment from "moment";

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #ececec",

    minHeight: "2.5rem",
    minWidth: "6rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    color: "black",
    boxShadow: "none", // Remove box shadow
    "&:focus": {
      outline: "none", // Remove outline on focus
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none", // Remove the vertical line between indicator and text
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: "0.85rem", // Set font size of dropdown options
  }),
};
export const customUploadStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #ececec",

    minHeight: "2.5rem",
    width: "15rem",
    minWidth: "100%",
    borderRadius: "8px",
    fontSize: "0.85rem",
    color: "black",
    boxShadow: "none", // Remove box shadow
    "&:focus": {
      outline: "none", // Remove outline on focus
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none", // Remove the vertical line between indicator and text
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: "0.85rem", // Set font size of dropdown options
  }),
};

export const customStylesPermissions = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #ececec",

    minWidth: "6rem",
    minHeight: "2.5rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    color: "black",
    boxShadow: "none", // Remove box shadow
    "&:focus": {
      outline: "none", // Remove outline on focus
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none", // Remove the vertical line between indicator and text
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: "0.85rem", // Set font size of dropdown options
  }),
};

export const calculateFileSize = (file: File) => {
  const fileSizeInBytes = file.size;
  // Convert bytes to KB
  const fileSizeInKB = fileSizeInBytes / 1024;
  if (fileSizeInKB < 1024) {
    return fileSizeInKB.toFixed(2) + " KB";
  } else {
    // Convert KB to MB
    const fileSizeInMB = fileSizeInKB / 1024;
    return fileSizeInMB.toFixed(2) + " MB";
  }
};

export const formatDate = (dateString: string) => {
  return moment(dateString).format("MMMM Do YYYY, h:mm:ss a");
};
