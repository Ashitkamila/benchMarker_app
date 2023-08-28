import {
  GET_AGMARK,
  ADD_AGMARK,
  UPDATE_AGMARK,
  DELETE_AGMARK,
  AGMARK_ERROR,
} from "./agmarkActionTypes";
import {
  RequestPayload,
  fetchData,
  postData,
  patchData,
  fetchDataNew
} from "../baseAPIService";
import { configuration } from "../../services/appConfig";
import moment from "moment";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// ACTION Creators
export const getAgmark = (payload) => {
  return {
    type: GET_AGMARK,
    payload: payload,
  };
};
export const addAgmark = (payload) => {
  return {
    type: ADD_AGMARK,
    payload: payload,
  };
};
export const updateAgmark = (payload) => {
  return {
    type: UPDATE_AGMARK,
    payload: payload,
  };
};
export const deleteAgmark = (payload) => {
  return {
    type: DELETE_AGMARK,
    payload: payload,
  };
};
export const agmarkFailure = (error) => {
  return {
    type: AGMARK_ERROR,
    payload: error,
  };
};

// Action for fetching roles data
export const getAllAgmark = () => async (dispatch) => {
  // const Url = `http://13.70.26.58:8010/api/v1/agmark?date=${moment().format(
  //   "YYYY-MM-DD"
  // )}`;
 
  const Url = `${configuration.apiBaseUrl}/agmark/agmarkdaterange?from=${moment().format(
    "YYYY-MM-DD")}&to=${moment().format("YYYY-MM-DD")}`

  // "http://13.70.26.58:8010/api/v1/agmark?date=" +
  // moment(new Date()).format("YYYY-MM-DD");

  const requestPayload = new RequestPayload();
  const response = await fetchData(Url, requestPayload).catch((error) => {
    dispatch(agmarkFailure(error.message));
  });
  const result_array = [];

  response.data?.map((item, idx) => {
    result_array.push(...item.records);
    console.log("the items records are", item.records);
  });

  if (response && response.status == "200") {
    dispatch(getAgmark(result_array));
    // console.log("agmark", response?.data[1]?.records);

    console.log("new result arrary is", result_array);

    return result_array;
  }
};

//Filter for from and To date..

// export const getAgmarkFilterData = (data) => async (dispatch) => {

//   // http://13.70.26.58:8010/api/v1/agmark/agmarkdaterange?from=2022-07-24&to=2022-07-25

//   const Url = configuration.apiBaseUrl + '/agmark/agmarkdaterange?from=' + data.from + '&to=' + data.to;
//   const requestPayload = new RequestPayload();
//   const response = await fetchData(Url, requestPayload)
//       .catch(error => {
//           console.log('error', error.message)
//           // dispatch(locationmatFailure(error.message))
//       });
//   if (response && response.status == "200") {
//       dispatch(getAgmark(response?.data[0]?.records));
//       console.log('Filtered Agmarkresponse', response?.data[0]?.records)
//       return response?.data[0]?.records;
//   }
// };

// Filter To and from New

const isNonEmptyString = (str) => {
  if (str && str !== "") {
    return true;
  }
  return false;
};

export const getAgmarkFilterData = (shouldFilter) => async (dispatch) => {
  console.log("filtering ... ");
  // const Url = "https://farmconnect.waycool.in/v1/api/get_cc_advanced_supply_data?delivery_date=" +
  // moment(date).format("YYYY-MM-DD")

  let Url = configuration.apiBaseUrl + "/agmark/agmarkdaterange";
  //const requestPayload = new RequestPayload();
  let data = {};
  const filterOptions = shouldFilter.filterData;
  console.log(shouldFilter);
  if (isNonEmptyString(filterOptions.to)) {
    data.to_date = filterOptions.to;
  }
  if (isNonEmptyString(filterOptions.from)) {
    data.from_date = filterOptions.from;
  }

  /// if (!isNonEmptyString(filterOptions.to) && !isNonEmptyString(filterOptions.from)){
  //   data['date[lte]'] = moment(today)
  //   data['date[gte]'] = moment(today)
  // }
  const config = {};

  try {
    Url = `${Url}?from=${data.from_date}&to=${filterOptions.to}`;
    let response = await fetchDataNew(Url, config);
    response = response.data;
    // .catch((error) => {
        //   toast.error(
    //     "Invalid From/To date OR Data not available for selected dates",
    //     error
    //   );
    //   return error;
    // });

    console.log(response);

    

    if (response && response.status == "200") {
      dispatch(getAgmark(response?.data[0]?.records));
      console.log("Filtered Agmarkresponse", response?.data[0]?.records);
      toast.success("Loading Data....", { theme: "colored" });
      return response?.data[0]?.records;
    } 
  } catch (err) {
    // console.log({err});
    toast.error(err.response.data.message);
  }

  //  else if (response.status === 503) {
  //     toast.info("Invalid From or To date ", { theme: "colored" });
  //     return
  //  }

  // if (response.status === 200) {
  //               toast.success("Loading Data....", { theme: "colored" });
  //               // window.location.reload()
  //             } else if (response.status === 404) {
  //               toast.info("Data Not Available", { theme: "colored" });
  //               // window.location.reload()
  //             } else if (response.status === 503) {
  //               toast.info("Invalid From or To date ", { theme: "colored" });
  //             }
  //           })
  //           .catch((err) =>
  //             toast.error(
  //               "Invalid From/To date OR Data not available for selected dates Select Maximum 10 days of Range between From and To",
  //               err
  //             )
  //           );
  //       }
};
