import { GET_CONVERSION, ADD_CONVERSION, UPDATE_CONVERSION, DELETE_CONVERSION, CONVERSION_ERROR } from './conversionMasterActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getConversion = (payload) => {
    return {
        type: GET_CONVERSION,
        payload: payload
    }
}
export const getOneConversionWithId = (payload) => {
    return {
        type: GET_CONVERSION,
        payload: payload
    }
}
export const addConversion = (payload) => {
    return {
        type: ADD_CONVERSION,
        payload: payload
    }
}
export const updateConversion = (payload) => {
    return {
        type: UPDATE_CONVERSION,
        payload: payload
    }
}
export const deleteConversion = (payload) => {
    return {
        type: DELETE_CONVERSION,
        payload: payload
    }
}
export const conversionFailure = (error) => {
    return {
        type: CONVERSION_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllConversion = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/item-conversion-factor?search=&location=&from_item_code=&to_item_code=';
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(conversionFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getConversion(response.data));
        return response.data;
    }
};

