import {
  GET_TRANSPORTATION,
  ADD_TRANSPORTATION,
  UPDATE_TRANSPORTATION,
  DELETE_TRANSPORTATION,
  TRANSPORTATION_ERROR,
} from "./transportationActionTypes";
import {
  RequestPayload,
  fetchData,
  postData,
  patchData,
} from "../baseAPIService";
import { configuration } from "../../services/appConfig";
import { GET_LOCATION } from "../location/locationActionTypes";

// ACTION Creators
export const getTransporation = (payload) => {
  console.log("transporation", payload);
  return {
    type: GET_TRANSPORTATION,
    payload: payload,
  };
};
export const getLocations = (payload) => {
  console.log("market", payload);
  return {
    type: GET_LOCATION,
    payload: payload,
  };
};
export const getOneTransporationWithId = (payload) => {
  console.log("market", payload);
  return {
    type: GET_TRANSPORTATION,
    payload: payload,
  };
};
export const addTransporation = (payload) => {
  console.log("market", payload);
  return {
    type: ADD_TRANSPORTATION,
    payload: payload,
  };
};
export const updateTransporation = (payload) => {
  console.log("market", payload);
  return {
    type: UPDATE_TRANSPORTATION,
    payload: payload,
  };
};
export const deleteTransporation = (payload) => {
  console.log("market", payload);
  return {
    type: DELETE_TRANSPORTATION,
    payload: payload,
  };
};
export const transporationFailure = (error) => {
  return {
    type: TRANSPORTATION_ERROR,
    payload: error,
  };
};

// Action for fetching roles data
export const getAllTransporation = () => async (dispatch) => {
  const Url = configuration.apiBaseUrl + "/transportation/arbitrage/cost/get";
  const requestPayload = new RequestPayload();
  const response = await fetchData(Url, requestPayload).catch((error) => {
    dispatch(transporationFailure(error.message));
  });
  if (response && response.status == "200") {
    dispatch(getTransporation(response.data.transportationCostDetails));
    return response.data.transportationCostDetails;
  }
};

export const getAllLocation = () => async (dispatch) => {
  const Url = configuration.apiBaseUrl + "/location";

  const requestPayload = new RequestPayload();
  const response = await fetchData(Url, requestPayload).catch((error) => {
    dispatch(transporationFailure(error.message));
  });
  if (response && response.status == "200") {
    dispatch(getLocations(response.data));
    return response.data;
  }
};
