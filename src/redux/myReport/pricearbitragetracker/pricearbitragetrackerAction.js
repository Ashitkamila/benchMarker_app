import {
  GET_PRICEARBITRAGE_TRACKER,
  PRICEARBITRAGE_ERROR_TRACKER,
} from "./pricearbitragetrackerActionTypes";
import {
  RequestPayload,
  fetchData,
  postData,
  patchData,
  fetchDataNew,
} from "../../baseAPIService";
import { configuration } from "../../../services/appConfig";
import moment from "moment";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ACTION Creators
export const getPriceArbitragetracker = (payload) => {
  console.log("pricearbi line 8", payload);
  return {
    type: GET_PRICEARBITRAGE_TRACKER,
    payload: payload,
  };
};
export const getOnePriceArbitragetrackerWithId = (payload) => {
  console.log("pricearbi line 15", payload);
  return {
    type: GET_PRICEARBITRAGE_TRACKER,
    payload: payload,
  };
};

export const priceArbitragetrackerFailure = (error) => {
  return {
    type: PRICEARBITRAGE_ERROR_TRACKER,
    payload: error,
  };
};

// Action for get tracker data
export const getAllPriceArbitrageTracker = () => async (dispatch) => {
  

  const Url =
    configuration.apiBaseUrl +
    `/transportation/arbitrage/feedback/tracker`;

  const requestPayload = new RequestPayload();

  

  try {
    
    const config = {};

    let response = await fetchDataNew(Url, config);
    response = response.data;


    console.log("arbitrage tracker response is", response);

    if (response && response.status == "200") {
      dispatch({type:"GET_PRICEARBITRAGE_TRACKER",payload:response?.data});
      console.log("Arbitrage response from actions", response?.data);
      // toast.success("Loading Data....", { theme: "colored" });
      return response?.data;
    }
  } catch (err) {
    console.log("err", { err });
    toast.error(err.response.data.message);
  }
};







