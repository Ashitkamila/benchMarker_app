import { GET_MARKET, ADD_MARKET, UPDATE_MARKET, DELETE_MARKET, MARKET_ERROR } from './marketActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration, configuration2 } from '../../services/appConfig'
import { GET_LOCATION } from '../location/locationActionTypes'


// ACTION Creators
export const getmarket = (payload) => {
    console.log("market", payload)
    return {
        type: GET_MARKET,
        payload: payload
    }
}
export const getLocations = (payload) => {
    console.log("market", payload)
    return {
        type: GET_LOCATION,
        payload: payload
    }
}
export const getOneMarketWithId = (payload) => {
    console.log("market", payload)
    return {
        type: GET_MARKET,
        payload: payload
    }
}
export const addMarket = (payload) => {
    console.log("market", payload)
    return {
        type: ADD_MARKET,
        payload: payload
    }
}
export const updateMarket = (payload) => {
    console.log("market", payload)
    return {
        type: UPDATE_MARKET,
        payload: payload
    }
}
export const deleteMarket = (payload) => {
    console.log("market", payload)
    return {
        type: DELETE_MARKET,
        payload: payload
    }
}
export const marketFailure = (error) => {
    return {
        type: MARKET_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllMarket = () => async (dispatch) => {
    const user=localStorage.getItem("User")
    const userDetails=JSON.parse(user)
    const Url = configuration2.apiBaseUrl + `/market/${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(marketFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getmarket(response.data));
        return response.data;
    }
};

export const getAllLocation = () => async (dispatch) => {
    const user=localStorage.getItem("User")
    const userDetails=JSON.parse(user)
    console.log();
    const Url = configuration.apiBaseUrl + `/location/?companyCode=${userDetails.companyCode}`;
    
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(marketFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getLocations(response.data));
        return response.data;
    }
};
