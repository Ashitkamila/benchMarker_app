import { GET_BMMANAGEMENT, ADD_BMMANAGEMENT, UPDATE_BMMANAGEMENT, DELETE_BMMANAGEMENT, BMMANAGEMENT_ERROR } from './bmManagementActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const getBmManagement = (payload) => {
  console.log("BmManagement", payload)
  return {
    type: GET_BMMANAGEMENT,
    payload: payload
  }
}
// export const getOneBmManagementWithId = (payload) => {
//     console.log("BmManagement", payload)
//     return {
//         type: GET_BMMANAGEMENT,
//         payload: payload
//     }
// }
export const addBmManagement = (payload) => {
  console.log("BmManagement", payload)
  return {
    type: ADD_BMMANAGEMENT,
    payload: payload
  }
}
export const updateBmManagement = (payload) => {
  console.log("BmManagement", payload)
  return {
    type: UPDATE_BMMANAGEMENT,
    payload: payload
  }
}
export const deleteBmManagement = (payload) => {
  console.log("BmManagement", payload)
  return {
    type: DELETE_BMMANAGEMENT,
    payload: payload
  }
}
export const BmManagementFailure = (error) => {
  return {
    type: BMMANAGEMENT_ERROR,
    payload: error
  }
}

// Action for fetching roles data
export const getAllBmManagement = () => async (dispatch) => {
const user=localStorage.getItem('User')
const userDetails=JSON.parse(user)
// console.log(userDetails.companyCode,"code")
    const Url = configuration.apiBaseUrl + `/user?size=1000&companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(BmManagementFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getBmManagement(response.data));
        
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

// Action for Add new Role
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

export const addNewUser = data => async (dispatch) => {
  const Url = configuration.apiBaseUrl + '/user?size=1000';
  if (data) {
    const param = data;
    const requestPayload = new RequestPayload(param);
    const response = await postData(Url, requestPayload)
      .catch(error => {
        dispatch(BmManagementFailure(error.message))
      });
    if (response && response.status == "201") {
      dispatch(addBmManagement(response.data));
      dispatch(getAllBmManagement());
    }
    return response;
  }
};

export const updateBMManagement = (data, editedRowData) => async (dispatch, getState) => {

  if (data) {
    const state = getState();
    const Url = configuration.apiBaseUrl + '/user/' + editedRowData._id;
    const param = data;
    const requestPayload = new RequestPayload(param);
    const response = await patchData(Url, requestPayload)
      .catch(error => {
        dispatch(BmManagementFailure(error.message))
      });
    if (response) {
      console.log("update", response.data);
      dispatch(updateBmManagement(response.data));
    }
    return response;
  }
};