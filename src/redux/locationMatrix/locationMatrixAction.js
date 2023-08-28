import { GET_LOCATIONMATRIX, ADD_LOCATIONMATRIX, UPDATE_LOCATIONMATRIX, DELETE_LOCATIONMATRIX, LOCATIONMATRIX_ERROR } from './locationMatrixActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getLocationMatrix = (payload) => {
    return {
        type: GET_LOCATIONMATRIX,
        payload: payload
    }
}


export const updateLocationMatrix = (payload) => {
    return {
        type: UPDATE_LOCATIONMATRIX,
        payload: payload
    }
}
export const deleteLocationMatrix = (payload) => {
    return {
        type: DELETE_LOCATIONMATRIX,
        payload: payload
    }
}
export const LocationMatrixFailure = (error) => {
    return {
        type: LOCATIONMATRIX_ERROR,
        payload: error
    }
}



export const getAllLocationMatrix = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/transport-master';
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(LocationMatrixFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getLocationMatrix(response.data));
        return response.data;
    }
};

