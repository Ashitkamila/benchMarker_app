import { GET_ITEM, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEM_ERROR } from './itemActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getItem = (payload) => {

    return {
        type: GET_ITEM,
        payload: payload
    }
}
export const getOneItemWithId = (payload) => {

    return {
        type: GET_ITEM,
        payload: payload
    }
}
export const addItem = (payload) => {

    return {
        type: ADD_ITEM,
        payload: payload
    }
}
export const updateItem = (payload) => {
    return {
        type: UPDATE_ITEM,
        payload: payload
    }
}
export const deleteItem = (payload) => {
    return {
        type: DELETE_ITEM,
        payload: payload
    }
}
export const itemFailure = (error) => {
    return {
        type: ITEM_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllItem = () => async (dispatch) => {
    const user=localStorage.getItem('User')
    const userDetails=JSON.parse(user)
    const Url = configuration.apiBaseUrl + `/item?companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(itemFailure(error.message))
        });
    if (response && response.status == "200") {
        console.log('responseofItems',response);
        dispatch(getItem(response.data));
        console.log("aaa", response.data)
        return response.data;
    }
};

