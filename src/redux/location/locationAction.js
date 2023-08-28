import { GET_LOCATION, ADD_LOCATION, UPDATE_LOCATION, DELETE_LOCATION, LOCATION_ERROR } from './locationActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getlocation = (payload) => {
    console.log("location action", payload)
    return {
        type: GET_LOCATION,
        payload: payload
    }
}
export const getOneLocationWithId = (payload) => {
    console.log("location", payload)
    return {
        type: GET_LOCATION,
        payload: payload
    }
}
export const addLocation = (payload) => {
    console.log("location", payload)
    return {
        type: ADD_LOCATION,
        payload: payload
    }
}
export const updateLocation = (payload) => {
    console.log("location", payload)
    return {
        type: UPDATE_LOCATION,
        payload: payload
    }
}
export const deleteLocation = (payload) => {
    console.log("location", payload)
    return {
        type: DELETE_LOCATION,
        payload: payload
    }
}
export const locationFailure = (error) => {
    return {
        type: LOCATION_ERROR,
        payload: error
    }
}

// Action for fetching roles data
// export const getAllLocation = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + '/location?size=1000';
//     const requestPayload = new RequestPayload();
//     const response = await fetchData(Url, requestPayload)
//         .catch(error => {
//             dispatch(locationFailure(error.message))
//         });
//     if (response && response.status == "200") {
//         dispatch(getlocation(response.data));
//         return response.data;
//     }
// };

export const getAllLocation = (id) => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/location?size=1000';
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(locationFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getlocation(response.data));
        return response.data;
    }
};


//   export const getOneLocationWithId = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + '/location/5ec1ad2300f6f94d79df2e01';
//     const requestPayload = new RequestPayload();
//     const response = await fetchData(Url, requestPayload)
//       .catch(error => {
//         dispatch(roleFailure(error.message))
//       });
//     if (response && response.status == "200") {
//       dispatch(getRole(response.data));
//       return response.data;
//     }
//   };

//   // Action for Add new Role
// export const addNewLocation = data => async(dispatch) => {
//     const Url = configuration.apiBaseUrl + '/location';
//     if (data) {
//       const param = data;
//       const requestPayload = new RequestPayload(param);
//       const response = await postData(Url, requestPayload)
//         .catch(error => {
//             dispatch(roleFailure(error.message))
//         });
//       if (response && response.status == "201") {
//         dispatch(addRole(response.data));
//         dispatch(getAllUsers());
//       }
//       return response;
//     }
//   };

//   export const updateLocation = (data,editedRowData) => async(dispatch, getState) => {
//     if (data) {
//       const state=getState();
//       const Url = configuration.apiBaseUrl + '/location/5ec1ad2300f6f94d79df2e01';
//       const param = data;
//       const requestPayload = new RequestPayload(param);
//       const response = await patchData(Url, requestPayload)
//         .catch(error => {
//           dispatch(roleFailure(error.message))
//         });
//       if (response) {
//           dispatch(getAllUsers());
//       }
//       return response;
//     }
//   };

//   export const deleteLocation = data => async(dispatch) => {
//     const Url = configuration.apiBaseUrl + '/location/5ec1ad2300f6f94d79df2e01';
//     if (data) {
//       const param = data;
//       const requestPayload = new RequestPayload(param);
//       const response = await postData(Url, requestPayload)
//         .catch(error => {
//             dispatch(roleFailure(error.message))
//         });
//       if (response && response.status == "201") {
//         dispatch(addRole(response.data));
//         dispatch(getAllUsers());
//       }
//       return response;
//     }
//   };