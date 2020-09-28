import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply token to request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete auth header token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
