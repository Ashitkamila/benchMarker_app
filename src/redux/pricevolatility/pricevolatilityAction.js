import { GET_PRICE, ADD_PRICE, UPDATE_PRICE, DELETE_PRICE, PRICE_ERROR } from './pricevolatilityActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getPrice = (payload) => {
    return {
        type: GET_PRICE,
        payload: payload
    }
}


export const updatePrice = (payload) => {
    return {
        type: UPDATE_PRICE,
        payload: payload
    }
}
export const deletePrice = (payload) => {
    return {
        type: DELETE_PRICE,
        payload: payload
    }
}
export const priceFailure = (error) => {
    return {
        type: PRICE_ERROR,
        payload: error
    }
}


export const getAllPrice = () => async (dispatch) => {
    const user=localStorage.getItem("User")
    const userDetails=JSON.parse(user)
    const Url = configuration.apiBaseUrl + `/item?companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(priceFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getPrice(response.data));
        return response.data;
    }
};

// export const updateAllPrice = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + 'item/update-conversion-factor';
//     const requestPayload = new RequestPayload();
//     const response = await fetchData(Url, requestPayload)
//         .catch(error => {
//             dispatch(priceFailure(error.message))
//         });
//     if (response && response.status == "200") {
//         dispatch(getPrice(response.data));
//         return response.data;
//     }
// };

// export const updateAllPrice = (data, editedRowData) => async (dispatch, getState) => {

//     if (data) {
//       const state = getState();
//       const Url = configuration.apiBaseUrl + '/item/update-conversion-factor';
//       const param = data;
//       const requestPayload = new RequestPayload(param);
//       const response = await patchData(Url, requestPayload)
//         .catch(error => {
//           dispatch(BmManagementFailure(error.message))
//         });
//       if (response) {
//         console.log("update", response.data);
//         dispatch(updateBmManagement(response.data));
//       }
//       return response;
//     }
//   };