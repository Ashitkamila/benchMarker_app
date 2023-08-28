import {
  GET_CC_AVAILABILITY,
  CC_AVAILABILITY_ERROR,
} from "../ccAvailability/ccAvailabilityActionTypes";
const initialState = {
  ccAvailability: [],
  ccAvailabilityFilter: "none",
};
const ccAvailabilityReducer = (state = initialState, action) => {
  //console.log("reducer",action)
  const { type, payload } = action;
  switch (type) {
    case GET_CC_AVAILABILITY:
      return {
        ...state,
        ccAvailability: payload,
      };
    case CC_AVAILABILITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default ccAvailabilityReducer;
