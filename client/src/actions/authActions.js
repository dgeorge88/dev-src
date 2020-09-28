import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login using token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //token var
      const { token } = res.data;
      //set token locally
      localStorage.setItem("jwtToken", token);
      //use auth header
      setAuthToken(token);
      //decode user data from token
      const decoded = jwt_decode(token);
      //set user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = () => dispatch => {
  //delete token from localstore
  localStorage.removeItem("jwtToken");
  //delete auth header
  setAuthToken(false);
  //set user state to !isAuthenticated
  dispatch(setCurrentUser({}));
};
