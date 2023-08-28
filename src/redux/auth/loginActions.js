import axios from "axios";
import * as actions from "./loginActionTypes";
import { configuration } from "../../services/appConfig";
import { Redirect } from "react-router";

// ACTION Creators
// export const loginUser = (payload) => {
//   console.log("login", payload);
//   return {
//     type: actions.LOGIN_SUCCESS,
//     payload: payload,
//   };
// };

export const loginFailed = (error) => {
  return {
    type: actions.LOGIN_FAILED,
    payload: error,
  };
};

// Action to call login API to  Login
export const signInUser = (data) => async (dispatch) => {
  const Url = configuration.apiBaseUrl + "/admin-users/login";

  if (data) {
    const param = data;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Accept"] = "application/json";
    axios.defaults.headers.post["Acces-Control-Allow-Origin"] = "*";
    const response = await axios
      .post(Url, param)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response;
      })
      .catch(function (error) {
        console.log("error", error.response.data.message);
        return error.response;
      });
    if (response && response.status == "200") {
      console.log(response,"response")
      const testObject = response.data.data;
      const token = response.data.data.token;
      const companyCode=response.data.data.companyCode
      localStorage.setItem("User", JSON.stringify(testObject));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("companyCode",JSON.stringify(companyCode))
      const currentTime = Date.now();
      localStorage.setItem('loginTime', String(currentTime));
      window.location.assign("/dashboard");
      // dispatch(loginUser(response.data.data));

      return response;
    } else {
      const testObject = response.data;
      localStorage.setItem("User", JSON.stringify(testObject));
      console.log(testObject,"log out")
      // dispatch(loginUser(response.data));
      return response;
    }
  }
};
