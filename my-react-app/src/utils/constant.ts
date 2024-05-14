export const PRIMARY_COLOR = "#FFAC00";
export const GREY_COLOR = "#F2F4F8";
export const inputType = {
  numberType: "number",
  stringType: "string",
  textareaType: "texarea",
  passwordType: "password",
};
export const registerFields = [
  {
    placeHolder: "First Name",
    name: "firstName",
    type: inputType.stringType,
    rules: [{ required: true, message: "Vui lòng nhập tên!" }],
  },
];
