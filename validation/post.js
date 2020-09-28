const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  //Error Handler
  let errors = {};

  //data handler if valid auth else run isempty
  data.text = !isEmpty(data.text) ? data.text : "";

  //min max post length
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be 10 to 300 character";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
