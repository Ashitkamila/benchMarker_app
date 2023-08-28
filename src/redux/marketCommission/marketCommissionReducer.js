import { GET_MARKETCOMMISSION, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, MARKETCOMMISSION_ERROR_TRACKER,UPDATE_MARKETCOMMISSION } from './marketCommissionActionTypes'


const initialState = {
    marketCommData: [],
    error: '',
    loading: true,
    }

export const marketCommissionReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log(payload,"1111111111111")
    // console.log("gggggg", state)
    switch (type) {
        case GET_MARKETCOMMISSION :
            return {
                ...state,
                marketCommData: payload,
                loading: false
            };

        case UPDATE_MARKETCOMMISSION:
                        const value= {
                ...state,
                marketCommData: payload,
              }
              console.log({value});
          return {
            ...state,
            marketCommData: payload,
          };

        

        case MARKETCOMMISSION_ERROR_TRACKER :
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
