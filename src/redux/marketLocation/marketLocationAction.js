import {
    GET_MARKETLOCATION,
    ADD_MARKETLOCATION,
    UPDATE_MARKETLOCATION,
    DELETE_MARKETLOCATION,
    MARKETLOCATION_ERROR,
    GET_TIMESLOT,
    GET_ITEM_DETAILS,
    GET_MARKET_ADDRESS,
    GET_CATEGORY_DETAILS
} from './marketLocationActionTypes'
import {
    RequestPayload,
    fetchData,
    postData,
    patchData,
} from '../baseAPIService'
import { configuration } from '../../services/appConfig'

// ACTION Creators
export const getmarketLocation = (payload) => {
    console.log('marketLocation', payload)
    return {
        type: GET_MARKETLOCATION,
        payload: payload,
    }
}
export const getOneMarketLocationWithId = (payload) => {
    console.log('marketLocation', payload)
    return {
        type: GET_MARKETLOCATION,
        payload: payload,
    }
}
export const addMarketLocation = (payload) => {
    console.log('marketLocation', payload)
    return {
        type: ADD_MARKETLOCATION,
        payload: payload,
    }
}
export const updateMarketLocation = (payload) => {
    console.log('marketLocation', payload)
    return {
        type: UPDATE_MARKETLOCATION,
        payload: payload,
    }
}
export const deleteMarketLocation = (payload) => {
    console.log('marketLocation', payload)
    return {
        type: DELETE_MARKETLOCATION,
        payload: payload,
    }
}
export const marketLocationFailure = (error) => {
    return {
        type: MARKETLOCATION_ERROR,
        payload: error,
    }
}

export const getTimeslot=(payload)=>{
    return{
        type:GET_TIMESLOT,
        payload:payload
    }
}
export const itemdetails=(payload)=>{
    return{
        type:GET_ITEM_DETAILS,
        payload:payload
    }
}
export const categorydetails=(payload)=>{
    return{
        type:GET_CATEGORY_DETAILS,
        payload:payload
    }
}

export const setmarketaddress=(payload)=>{
    return {
        type:GET_MARKET_ADDRESS,
        payload:payload
    }
}

// Action for fetching roles data
export const getAllMarketLocation = (id) => async (dispatch) => {
    console.log('_idlocation',id);
    const user=localStorage.getItem('User')
    const userDetails=JSON.parse(user)
    const Url = configuration.apiBaseUrl + '/market?location=' + id+`&companyCode=${userDetails.companyCode}`
    const requestPayload = new RequestPayload()
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(marketLocationFailure(error.message))
    })
    if (response && response.status == '200') {
        dispatch(getmarketLocation(response.data))
        return response.data
    }
}

export const setTimeSlot = (time) => async (dispatch) => {
    dispatch(getTimeslot(time))

}

export const tagItemDetails = (item) => async (dispatch) => {
    dispatch(itemdetails(item))

}
export const tagcategory=(item)=> async(dispatch)=>{
    dispatch(categorydetails(item))
}

export const setLocationAddress=(address)=>async(dispatch)=>{
    dispatch(setmarketaddress(address))

}

export const getAllTimeslotsMarket = (id) => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/timeslot?market=' + id
    console.log('id', id)
    const requestPayload = new RequestPayload()
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(marketLocationFailure(error.message))
    })
    if (response && response.status == '200') {
        dispatch(getmarketLocation(response.data))
        return response.data
    }
}

export const getOneUserById = () => async (dispatch) => {
    const user=localStorage.getItem("User")
    const userDetails=JSON.parse(user)
    const Url = configuration.apiBaseUrl + `/user?size=1000&companyCode=${userDetails.companyCode}`

    const requestPayload = new RequestPayload()
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(marketLocationFailure(error.message))
    })
    if (response && response.status == '200') {
        dispatch(getmarketLocation(response.data))
        return response.data
    }
}
