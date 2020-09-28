const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  //Error Handler
  let errors = {};

  //if empty input set as null
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.skilllvl = !isEmpty(data.skilllvl) ? data.skilllvl : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.location = !isEmpty(data.skills) ? data.location : "";

  if (!validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle needs to be more than 2 characters";
  }

  if (validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile Handle is required";
  }

  if (validator.isEmpty(data.skilllvl)) {
    errors.skilllvl = "Your skill level is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Please input skills";
  }

  //website
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "invalid URL";
    }
  }
  //social media
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "invalid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "invalid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "invalid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "invalid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "invalid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
