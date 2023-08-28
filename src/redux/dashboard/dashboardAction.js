import { GET_PIE, ADD_PIE, UPDATE_PIE, DELETE_PIE, PIE_ERROR } from './dashboardActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getPie = (payload) => {
    return {
        type: GET_PIE,
        payload: payload
    }
}
export const getOnePieWithId = (payload) => {
    return {
        type: GET_PIE,
        payload: payload
    }
}
export const addPie = (payload) => {
    return {
        type: ADD_PIE,
        payload: payload
    }
}
export const updatePie = (payload) => {
    return {
        type: UPDATE_PIE,
        payload: payload
    }
}
export const deletePie = (payload) => {
    return {
        type: DELETE_PIE,
        payload: payload
    }
}
export const pieFailure = (error) => {
    return {
        type: PIE_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllPie = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + `/dashboard/pie?location=&duration=m&companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(pieFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getPie(response.data));
        return response.data;
    }
};

