import { GET_NFNVITEM, ADD_NFNVITEM, UPDATE_NFNVITEM, DELETE_NFNVITEM, NFNVITEM_ERROR, NFNVCATEGORY_ERROR, GET_NFNVCATEGORY } from './nfnvitemActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getNfnvItem = (payload) => {

    return {
        type: GET_NFNVITEM,
        payload: payload
    }
}
export const getnfnvcategory = (payload) => {
    console.log('fnv category', payload)
    return {
        type: GET_NFNVCATEGORY,
        payload: payload,
    }
}
export const getOneNfnvItemWithId = (payload) => {

    return {
        type: GET_NFNVITEM,
        payload: payload
    }
}
export const addNfnvItem = (payload) => {

    return {
        type: ADD_NFNVITEM,
        payload: payload
    }
}
export const updateNfnvItem = (payload) => {
    return {
        type: UPDATE_NFNVITEM,
        payload: payload
    }
}
export const deleteNfnvItem = (payload) => {
    return {
        type: DELETE_NFNVITEM,
        payload: payload
    }
}
export const nfnvItemFailure = (error) => {
    return {
        type: NFNVITEM_ERROR,
        payload: error
    }
}

export const nfnvcategoryFailure = (error) => {
    return {
        type: NFNVCATEGORY_ERROR,
        payload: error,
    }
}

// Action for fetching roles data
// export const getAllNfnvItem = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + '/getnfnv';
//     const requestPayload = new RequestPayload();
//     const response = await fetchData(Url, requestPayload)
//         .catch(error => {
//             dispatch(nfnvitemFailure(error.message))
//         });
//     if (response && response.status == "200") {
//         dispatch(getNfnvItem(response.data));
//         console.log("hgasvj",response.data)
//         return response.data;
//     }
// };

console.log("checkckck")

export const getAllNfnvItem = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/item?search=&size=100&location=&active=true&mandatory=true&itemType=nfnv';
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload).catch(error => {
        return error;
    })
    if (response) {
        dispatch(getNfnvItem(response.data));
        return response.data;
    }
};


export const getAllNFnvCategory = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/nfnv/category' 
    const requestPayload = new RequestPayload()
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(nfnvcategoryFailure(error.message))
    })
    if (response && response.status == '200') {
        console.log('fnv_category', response)
        dispatch(getnfnvcategory(response?.data))
        
        return response?.data
    }
}

// export const getAllItem = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + '/item?search=&size=100&location=&active=true&mandatory=true&';
//     const requestPayload = new RequestPayload();
//     const response = await fetchData(Url, requestPayload)
//         .catch(error => {
//             dispatch(itemFailure(error.message))
//         });
//     if (response && response.status == "200") {
//         dispatch(getItem(response.data));
//         console.log("aasasa", response.data)
//         return response.data;
//     }
// };

