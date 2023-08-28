import { GET_IMPORTED, ADD_IMPORTED, UPDATE_IMPORTED, DELETE_IMPORTED, IMPORTED_ERROR } from './importedActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getimported = (payload) => {
    return {
        type: GET_IMPORTED,
        payload: payload
    }
}
export const getOneImportedWithId = (payload) => {
    return {
        type: GET_IMPORTED,
        payload: payload
    }
}
export const addImported = (payload) => {
    return {
        type: ADD_IMPORTED,
        payload: payload
    }
}
export const updateImported = (payload) => {
    return {
        type: UPDATE_IMPORTED,
        payload: payload
    }
}
export const deleteImported = (payload) => {
    return {
        type: DELETE_IMPORTED,
        payload: payload
    }
}
export const importedFailure = (error) => {
    return {
        type: IMPORTED_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllImported = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/imports-item?searchString=&selectedLocation=&size=100&active=true&mandatory=true&';
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(importedFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getimported(response.data));
        return response.data;
    }
};

