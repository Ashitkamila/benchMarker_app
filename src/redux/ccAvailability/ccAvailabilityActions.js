import {
  GET_CC_AVAILABILITY,
  CC_AVAILABILITY_ERROR,
} from "../ccAvailability/ccAvailabilityActionTypes";
import {
  RequestPayload,
  fetchData,
  postData,
  patchData,
} from "../baseAPIService";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { act } from "react-dom/test-utils";

// ACTION Creators
export const getCCAvailability = (payload) => {
  return {
    type: GET_CC_AVAILABILITY,
    payload: payload,
  };
};
export const ccAvailabilityFailure = (error) => {
  return {
    type: CC_AVAILABILITY_ERROR,
    payload: error,
  };
};
var date = new Date();

// add a day
date.setDate(date.getDate() + 1);

//new get api for ashit
//uat url
// const Url =
//   "https://uat-farmconnect.waycool.in/v1/api/get_cc_advanced_supply_data?delivery_date=" +
//   moment(date).format("YYYY-MM-DD");

// Action for fetching roles data
export const fetchAllCCAvailabilityData = () => async (dispatch) => {
  await axios
    .get(
      `https://farmconnect.waycool.in/v1/api/get_cc_advanced_supply_data?delivery_date=${moment(
        date
      ).format("YYYY-MM-DD")}}`
    )
    .then((resp) => {
      if (resp && resp.status === 200) {
        dispatch(getCCAvailability(resp.data.response));
        toast.success("Loading Data....");
        return resp?.data?.response;
      } else if (resp.data.status == 0) {
        toast.error(resp.data.message);
      }
    })
    .catch((error) => {
      dispatch(ccAvailabilityFailure(error.message));
      toast.error(error.message);
    });
};

//for filter api

export const filterReportCCAvailability =
  (shouldFilter) => async (dispatch) => {
    // const Url =
    //   "https://uat-farmconnect.waycool.in/v1/api/get_cc_advanced_supply_search_data";
    console.log("filtering123", shouldFilter.filterData);

    await axios
      .get(
        `https://farmconnect.waycool.in/v1/api/get_cc_advanced_supply_search_data?plant_code=${shouldFilter.filterData.plant_code}&material_name=${shouldFilter.filterData.material_name}&form_date=${shouldFilter.filterData.from_date}&to_date=${shouldFilter.filterData.to_date}`
      )

      .then((response) => {
        console.log("allresponse9876", response?.data);
        if (response && response?.status == 200) {
          dispatch(getCCAvailability(response?.data?.response));
          window.location.reload();
          toast.success("Loading Data....");
          return response?.data?.response;
        } else if (response?.status == 0) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
