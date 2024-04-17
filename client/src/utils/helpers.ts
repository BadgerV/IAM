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
export function countNonNullValues(arr: any[]) {
  // Filter out null values from the array
  const nonNullArray = arr.filter((value) => value !== null);

  // Return the length of the filtered array
  return nonNullArray.length;
}

export const calculateTotalFileSize = (files: any[]) => {
  let totalSize = 0;

  // Loop through each file in the files array
  files.forEach((file) => {
    // Extract the file size from the file object
    const fileSizeStr = file.file_size;

    // Remove " KB" from the file size string and convert it to a number
    const fileSizeNum = parseFloat(fileSizeStr.replace(" KB", ""));

    // Add the file size to the total size
    totalSize += fileSizeNum;
  });

  // Convert total size to appropriate unit (KB, MB, GB)
  let sizeUnit = "KB";
  let size = totalSize;
  if (totalSize >= 1024) {
    size /= 1024;
    sizeUnit = "MB";
    if (totalSize >= 1024 * 1024) {
      size /= 1024;
      sizeUnit = "GB";
    }
  }

  // Round the size to two decimal places
  const stringSize = size.toFixed(2);

  // Return the total size with the appropriate unit
  return `${stringSize}${sizeUnit}`;
};

export const reviseRole = (role: string) => {
  if (role === "super_admin") {
    return "Administrator";
  } else if (role === "manager") {
    return "Manager";
  } else if (role === "admin") {
    return "Admin";
  } else {
    return "Employee";
  }
};
