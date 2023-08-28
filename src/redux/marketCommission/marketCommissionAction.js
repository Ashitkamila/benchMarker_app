import {
    GET_MARKETCOMMISSION,
    UPDATE_MARKETCOMMISSION
      } from "./marketCommissionActionTypes";
  import {
    RequestPayload,
    fetchData,
    postData,
    patchData,
    fetchDataNew,
    CreateData
  } from "../baseAPIService";
  import { configuration } from "../../services/appConfig";
  import moment from "moment";
  import { ToastContainer, toast, Zoom } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  // ACTION Creators
  // export const getmc = (payload) => {
  //   console.log("pricearbi line 8", payload);
  //   return {
  //     type: GET_MARKETCOMMISSION,
  //     payload: payload,
  //   };
  // };

  const actions = {
  // fetchTransportationMatrix: (payload) => ({
  //   type: transportationMatrix.FETCH_TRANSPORTATION_MATRIX,
  //   data: payload,
  // }),

  // deleteTransportationMatrix: (payload) => ({
  //   type: transportationMatrix.DELETE_TRANSPORTATION_MATRIX,
  //   data: payload,
  // }),

  // addTransportationMatrix: (payload) => ({
  //   type: transportationMatrix.ADD_TRANSPORTATION_MATRIX,
  //   data: payload,
  // }),

  updateMC: (payload) => ({
    type: UPDATE_MARKETCOMMISSION,
    payload,
  }),
};

  
  // Action for get commission data
  export const getAllMarketcommissionData = () => async (dispatch) => {
    
      
    const Url =
    `${configuration.apiBaseUrl}/market/commission/lists/100`
  
    const requestPayload = new RequestPayload();
  
      
    try {
      
      const config = {};
  
      let response = await fetchDataNew(Url, config);
      response = response.data;
  
  
      console.log("mc response is", response.data.marketCommissionList);
     
  
      if (response && response.status == "200") {
        // alert("hi")
        dispatch({type:"GET_MARKETCOMMISSION", payload : response?.data?.marketCommissionList});
        console.log("market response from actions", response?.data?.marketCommissionList);
        // toast.success("Loading Data....", { theme: "colored" });
       
        return response?.data?.marketCommissionList;
      }
    } catch (err) {
      console.log("err", { err });
      toast.error(err.response.data.message);
    }
  };
  
  
  
    // Action for Update commission data//
  
 export const updateMcData =
(data, editedRowdata) => async (dispatch, getState) => {
  // console.log("editedRowdata", editedRowdata);
  // alert("check new..!!")
    if (data) {
    const state = getState();
    const Url =

   `${configuration.apiBaseUrl}/market/commission/` + editedRowdata._id
      // configuration.apiBaseUrl + "/updateTransPortation/" + editedRowdata._id;
    const param = data;
    const requestPayload = new RequestPayload(param);
    const response = await CreateData(Url, requestPayload).catch((error) => {
      console.log("ERROR", error);
      return error;
    });
        if (response) {
      console.log("mcc resp", response)
      console.log("mcstate",state);
      const index =
      state.MarketCommission.marketCommData.findIndex(
          (value) => value._id === editedRowdata._id
        );
        console.log("index is", index)
      const newState =[...state.MarketCommission.marketCommData];
      // Object.assign(
      //   [],
      //   state.MarketCommission.marketCommData
      // );
      console.log("newstate",newState )
     
// let newValue = {...newState[index], marketCommission:response.data.marketCommission}
// console.log("newobject", newValue)

      // newState[index] = newValue;

      // let temp =  newState[index]
      // console.log("new ", temp);

      if (index >= 0) {
        let newValue = {...newState[index], marketCommission:response.data.marketCommission}
console.log("newobject", newValue)

      newState[index] = newValue;

        dispatch(actions.updateMC(newState));
        //dispatch(FetchForecastData());
      }
   
      // clearTimeout(timer);
      // var timer = setTimeout(() => {
      //   alert("updated sucessfully");
      // }, 5);


     
      // clearTimeout(timer);
      // var timer = setTimeout(() => {
      //    alert("updated sucessfully");
      //  }, 20);


      // window.location.reload()
    
      setTimeout(() => {
        toast.info("updated sucessfully", { theme: "colored" });
       }, 20);

     
      

    }
    return response;
  }
};

  
  