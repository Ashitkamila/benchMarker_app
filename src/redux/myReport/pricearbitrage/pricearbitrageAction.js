import {
  GET_PRICEARBITRAGE,
  PRICEARBITRAGE_ERROR,
} from "./pricearbitrageActionTypes";
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
export const getPriceArbitrage = (payload) => {
  console.log("pricearbi line 8", payload);
  return {
    type: GET_PRICEARBITRAGE,
    payload: payload,
  };
};
export const getOnePriceArbitrageWithId = (payload) => {
  console.log("pricearbi line 15", payload);
  return {
    type: GET_PRICEARBITRAGE,
    payload: payload,
  };
};

export const priceArbitrageFailure = (error) => {
  return {
    type: PRICEARBITRAGE_ERROR,
    payload: error,
  };
};

// Action for fetching roles data
export const getAllPriceArbitrage = () => async (dispatch) => {
  // const Url = configuration.apiBaseUrl + '/price?size=100&from=' + moment('2022-01-20').format("YYYY-MM-DD") + '&to=' + moment(new Date()).format("YYYY-MM-DD") + 'usertpe=fnv';
  //   const Url = configuration.apiBaseUrl + '/transportation/arbitrage/result?to='+  moment(new Date()).format("YYYY-MM-DD") +'&from=' + moment(new Date()).format("YYYY-MM-DD");
  // const Url = configuration.apiBaseUrl + '/price?size=100&from=2022-01-20&to=2022-01-21';
  // const Url =
  //   configuration.apiBaseUrl +
  //   `/transportation/arbitrage/result?to=${moment().format("YYYY-MM-DD")}&from=${moment().format("YYYY-MM-DD")}`

  const Url =
    configuration.apiBaseUrl +
    `/transportation/arbitrage/result?from=${moment().format(
      "YYYY-MM-DD")}&to=${moment().format("YYYY-MM-DD")}`;

  const requestPayload = new RequestPayload();

  // const response = await fetchData(Url, requestPayload).catch((error) => {
  //   dispatch(priceArbitrageFailure(error.message));
  // });
  // if (response && response.status == "200") {
  //   alert("Arbitrage action")
  //   dispatch(getPriceArbitrage(response));
  //   console.log("arbitrage response is",response )
  //   return response;
  // }

  try {
    // Url = `${Url}?to=${filterOptions.to}&from=${data.from_date}`;
    const config = {};

    let response = await fetchDataNew(Url, config);
    response = response.data;
    // .catch((error) => {
    //   toast.error(
    //     "Invalid From/To date OR Data not available for selected dates",
    //     error
    //   );
    //   return error;
    // });

    console.log("arbitrage response is", response);

    if (response && response.status == "200") {
      dispatch(getPriceArbitrage(response.data));
      console.log("Arbitrage response from actions", response?.data);
      toast.success("Loading Data....", { theme: "colored" });
      return response?.data;
    }
  } catch (err) {
    console.log("err", { err });
    toast.error(err.response.data.message);
  }
};

// Filter To and from New

const isNonEmptyString = (str) => {
  if (str && str !== "") {
    return true;
  }
  return false;
};

export const getArbitrageFilterData = (shouldFilter) => async (dispatch) => {
  console.log("filtering ... ");
  // const Url = "https://farmconnect.waycool.in/v1/api/get_cc_advanced_supply_data?delivery_date=" +
  // moment(date).format("YYYY-MM-DD")

  let Url = configuration.apiBaseUrl + "/transportation/arbitrage/result";
  //const requestPayload = new RequestPayload();
  let data = {};
  const filterOptions = shouldFilter.filterData;
  console.log(shouldFilter);
  console.log("filter option",filterOptions)
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

  console.log("data from",data.from_date )
  console.log("data to",data.to_date )
  try {
    if (data.from_date && data.to_date && data.from_date !== "Invalid date" && data.to_date !== "Invalid date")
      Url = `${Url}?from=${data.from_date}&to=${data.to_date}`;
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
      dispatch(getPriceArbitrage(response.data));
      console.log("Filtered Agmarkresponse", response?.data);
      toast.success("Loading Data....", { theme: "colored" });
      return response?.data;
    }
  } catch (err) {
    console.log("err", err.response);
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
