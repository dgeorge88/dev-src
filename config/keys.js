//if in production export production keys
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  //else export development keys
  module.exports = require("./keys_dev");
}
