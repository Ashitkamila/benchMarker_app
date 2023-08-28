import {
  GET_TRANSPORTATION,
  ADD_TRANSPORTATION,
  UPDATE_TRANSPORTATION,
  DELETE_TRANSPORTATION,
  TRANSPORTATION_ERROR,
} from "./transportationActionTypes";

const initialState = {
  usersData: {},
  error: "",
  loading: true,
};

export const transportationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSPORTATION:
      return {
        ...state,
        usersData: payload,
        loading: false,
      };

    case ADD_TRANSPORTATION:
      return {
        ...state,
        usersData: payload,
        loading: false,
      };

    case UPDATE_TRANSPORTATION:
      return {
        ...state,
        usersData: payload,
        loading: false,
      };
    case DELETE_TRANSPORTATION:
      return {
        ...state,
        usersData: payload,
        loading: false,
      };

    case TRANSPORTATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
