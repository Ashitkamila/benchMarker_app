import { GET_LOCATIONMAT, ADD_LOCATIONMAT, UPDATE_LOCATIONMAT, DELETE_LOCATIONMAT, LOCATIONMAT_ERROR } from './locationmatActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../../baseAPIService'
import { configuration } from '../../../services/appConfig'
import moment from 'moment';

// ACTION Creators
export const getLocationmat = (payload) => {
    console.log('marketLocation', payload)
    return {
        type: GET_LOCATIONMAT,
        payload: payload
    }
}
// export const getOneItemWithId = (payload) => {

//     return {
//         type: GET_ITEM,
//         payload: payload
//     }
// }
export const addLocationmat = (payload) => {

    return {
        type: ADD_LOCATIONMAT,
        payload: payload
    }
}
export const updateLocationmat = (payload) => {
    return {
        type: UPDATE_LOCATIONMAT,
        payload: payload
    }
}
export const deleteLocationmat = (payload) => {
    return {
        type: DELETE_LOCATIONMAT,
        payload: payload
    }
}
export const locationmatFailure = (error) => {
    return {
        type: LOCATIONMAT_ERROR,
        payload: error
    }
}

// Action for fetching roles data


    export const getAllLocationmat = (newValue, newValue1) => async (dispatch) => {
        const date = new Date();
         let fromdate = date.setDate(date.getDate() - 1);
         console.log('from date', fromdate);





    const Url = `${configuration.apiBaseUrl}/LocationWiseReport?from=` + moment(new Date()).format("YYYY-MM-DD") + '&to=' + moment(new Date()).format("YYYY-MM-DD");
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(locationmatFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getLocationmat(response.data));
        console.log("location mat", response.data)
        return response.data;
    }
};

export const getAllLocationByDate = (data) => async (dispatch) => {
    const Url = `${configuration.apiBaseUrl}/LocationWiseReport?from=` + data.from + '&to=' + data.to;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            console.log('error', error.message)
            dispatch(locationmatFailure(error.message))
        });
    if (response && response.status == "200") {

        dispatch(getLocationmat(response.data));
        console.log('response', response)
        return response.data;
    }
};



