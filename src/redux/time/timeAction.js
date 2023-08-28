import {
    GET_TIME,
    ADD_TIME,
    UPDATE_TIME,
    DELETE_TIME,
    TIME_ERROR,
} from './timeActionTypes'
import {
    RequestPayload,
    fetchData,
    postData,
    patchData,
} from '../baseAPIService'
import { configuration } from '../../services/appConfig'

// ACTION Creators
export const getTime = (payload) => {
    console.log('time', payload)
    return {
        type: GET_TIME,
        payload: payload,
    }
}
export const getOneTimeWithId = (payload) => {
    console.log('time', payload)
    return {
        type: GET_TIME,
        payload: payload,
    }
}
export const addTime = (payload) => {
    console.log('time', payload)
    return {
        type: ADD_TIME,
        payload: payload,
    }
}
export const updateTime = (payload) => {
    console.log('time', payload)
    return {
        type: UPDATE_TIME,
        payload: payload,
    }
}
export const deleteTime = (payload) => {
    console.log('time', payload)
    return {
        type: DELETE_TIME,
        payload: payload,
    }
}
export const timeFailure = (error) => {
    return {
        type: TIME_ERROR,
        payload: error,
    }
}

// Action for fetching roles data
export const getAllTime = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/timeslot'
    const requestPayload = new RequestPayload()
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(timeFailure(error.message))
    })
    if (response && response.status == '200') {
        dispatch(getTime(response.data))
        return response.data
    }
}
