const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //data handler if valid run else isempty
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordconf = !isEmpty(data.passwordconf) ? data.passwordconf : "";

  //isempty Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  //no input name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  //ino input email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //wrong email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  //no input password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  //too small or too big password input
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  //password confirmation handler
  if (Validator.isEmpty(data.passwordconf)) {
    errors.passwordconf = "Confirm Password field is required";
  }
  //password matching
  if (!Validator.equals(data.password, data.passwordconf)) {
    errors.passwordconf = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
