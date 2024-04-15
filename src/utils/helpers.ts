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
