import {GET_ROLE,ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, ROLE_ERROR} from './roleActionTypes'
import {RequestPayload, fetchData, postData, patchData} from '../baseAPIService'
import { configuration } from '../../services/appConfig'


// ACTION Creators
export const  getRole = (payload) => {
    console.log("role",payload)
    return {
        type: GET_ROLE,
        payload: payload
    }
}
export const  addRole = (payload) => {
    console.log("role",payload)
    return {
        type: ADD_ROLE,
        payload: payload
    }
}
export const  updateRole = (payload) => {
    console.log("role",payload)
    return {
        type: UPDATE_ROLE,
        payload: payload
    }
}
export const  deleteRole = (payload) => {
    console.log("role",payload)
    return {
        type: DELETE_ROLE,
        payload: payload
    }
}
export const roleFailure = (error) => {
    return {
        type: ROLE_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllUsers = () => async (dispatch) => {
  const user=localStorage.getItem("User")
  const userDetails=JSON.parse(user)
    const Url = configuration.apiBaseUrl + `/admin-users/?companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
      .catch(error => {
        dispatch(roleFailure(error.message))
      });
    if (response && response.status == "200") {
      dispatch(getRole(response.data));
      return response.data;
    }
  };

  // Action for Add new Role
export const addNewUser = data => async(dispatch) => {
    const Url = configuration.apiBaseUrl + '/admin-users/';
    if (data) {
      const param = data;
      const requestPayload = new RequestPayload(param);
      const response = await postData(Url, requestPayload)
        .catch(error => {
            dispatch(roleFailure(error.message))
        });
      if (response && response.status == "201") {
        dispatch(addRole(response.data));
        dispatch(getAllUsers());
      }
      return response;
    }
  };

  export const updateUser = (data,editedRowData) => async(dispatch, getState) => {

    if (data) {
      const state=getState();
      const Url = configuration.apiBaseUrl + '/admin-users/'+ editedRowData._id;
      const param = data;
      const requestPayload = new RequestPayload(param);
      const response = await patchData(Url, requestPayload)
        .catch(error => {
          dispatch(roleFailure(error.message))
        });
      if (response) {
        console.log("update",response.data);
          dispatch(updateRole(response.data));
      }
      return response;
    }
  };
