import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";

const PlacesScript = ({
  url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOehw9Ty8iXxqz3w4N3Y9a8CBR99MwV_k&libraries=places",
  onLoad
}) => {
  return <Script url={url} onLoad={onLoad} />;
};

PlacesScript.propTypes = {
  onLoad: PropTypes.func.isRequired
};

PlacesScript.default = {
  type: "text"
};

export default PlacesScript;
