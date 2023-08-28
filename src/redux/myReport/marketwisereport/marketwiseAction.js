import { GET_MARKETWISE, ADD_MARKETWISE, UPDATE_MARKETWISE, DELETE_MARKETWISE, MARKETWISE_ERROR } from './marketwiseActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../../baseAPIService'
import { configuration } from '../../../services/appConfig'
import moment from 'moment';

// ACTION Creators
export const getMarketwise = (payload) => {
    console.log('marketwise', payload)
    return {
        type: GET_MARKETWISE,
        payload: payload
    }
}
// export const getOneItemWithId = (payload) => {

//     return {
//         type: GET_ITEM,
//         payload: payload
//     }
// }
export const addMarketwise = (payload) => {

    return {
        type: ADD_MARKETWISE,
        payload: payload
    }
}
export const updateMarketwise = (payload) => {
    return {
        type: UPDATE_MARKETWISE,
        payload: payload
    }
}
export const deleteMarketwise = (payload) => {
    return {
        type: DELETE_MARKETWISE,
        payload: payload
    }
}
export const marketwiseFailure = (error) => {
    return {
        type: MARKETWISE_ERROR,
        payload: error
    }
}

// Action for fetching roles data


export const getAllMarketwise = (newValue, newValue1) => async (dispatch) => {
    const date = new Date();
    let fromdate = date.setDate(date.getDate() - 1);
    console.log('from date', fromdate);

const user=localStorage.getItem('User')
const userDetails=JSON.parse(user)



     const Url = `${configuration.apiBaseUrl}/MarketWiseReport?from=` + moment(new Date()).format("YYYY-MM-DD") + '&to=' + moment(new Date()).format("YYYY-MM-DD")+`&companyCode=${userDetails.companyCode}`;
    // const Url = "http://uat.apps.waycool.in:8010/api/v1/MarketWiseReport?from=2022-03-01&to=2022-03-25";

    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(marketwiseFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getMarketwise(response.data));
        console.log("marketwise", response.data)
        return response.data;
    }
};

export const getAllMarketwiseByDate = (data) => async (dispatch) => {
    const user=localStorage.getItem('User')
    const userDetails=JSON.parse(user)
    const Url = `${configuration.apiBaseUrl}/MarketWiseReport?from=` + data.from + '&to=' + data.to+`&companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            console.log('error', error.message)
            dispatch(marketwiseFailure(error.message))
        });
    if (response && response.status == "200") {

        dispatch(getMarketwise(response.data));
        console.log('response', response)
        return response.data;
    }
};



