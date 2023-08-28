import { GET_SKU, SKU_ERROR } from './skuActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getsku = (payload) => {
    console.log("sku", payload)
    return {
        type: GET_SKU,
        payload: payload
    }
}
export const getOneSkuWithId = (payload) => {
    console.log("sku", payload)
    return {
        type: GET_SKU,
        payload: payload
    }
}

export const skuFailure = (error) => {
    return {
        type: SKU_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllSku = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/itemrequest';
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(skuFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getsku(response.data));
        return response.data;
    }
};

