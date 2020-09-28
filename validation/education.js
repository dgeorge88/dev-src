const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  //Error Handler
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.course = !isEmpty(data.course) ? data.course : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(data.course)) {
    errors.course = "The course you studied is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
