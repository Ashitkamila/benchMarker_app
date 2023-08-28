import {
    GET_FNVCATEGORY,
    GET_ITEMNAME,
    // ADD_MARKETLOCATION,
    // UPDATE_MARKETLOCATION,
    // DELETE_MARKETLOCATION,
    FNVCATEGORY_ERROR,
    ITEMNAME_ERROR,
    ITEM_DETAILS,
    SAVE_QUEST

} from './fnvcategoryActionTypes'
import {
    RequestPayload,
    fetchData,
    postData,
    patchData,
} from '../baseAPIService'
import { configuration } from '../../services/appConfig'

// ACTION Creators
export const getfnvcategory = (payload) => {
    console.log('fnv category', payload)
    return {
        type: GET_FNVCATEGORY,
        payload: payload,
    }
}
export const getitemname = (payload) => {
    console.log('item name', payload)
    return {
        type: GET_ITEMNAME,
        payload: payload,
    }
}


export const itemDetails = (payload) => {
    console.log('item name', payload)
    return {
        type: ITEM_DETAILS,
        payload: payload,
    }
}
// export const getOneMarketLocationWithId = (payload) => {
//     console.log('marketLocation', payload)
//     return {
//         type: GET_MARKETLOCATION,
//         payload: payload,
//     }
// }
// export const addMarketLocation = (payload) => {
//     console.log('marketLocation', payload)
//     return {
//         type: ADD_MARKETLOCATION,
//         payload: payload,
//     }
// }
// export const updateMarketLocation = (payload) => {
//     console.log('marketLocation', payload)
//     return {
//         type: UPDATE_MARKETLOCATION,
//         payload: payload,
//     }
// }
// export const deleteMarketLocation = (payload) => {
//     console.log('marketLocation', payload)
//     return {
//         type: DELETE_MARKETLOCATION,
//         payload: payload,
//     }
// }
export const fnvcategoryFailure = (error) => {
    return {
        type: FNVCATEGORY_ERROR,
        payload: error,
    }
}
export const itemnameFailure = (error) => {
    return {
        type: ITEMNAME_ERROR,
        payload: error,
    }
}

export const questionsave=(payload)=>{
    return{
        type:SAVE_QUEST,
        payload:payload
    }
}

// Action for fetching roles data
export const getAllFnvCategory = () => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/fnv/category' 
    const requestPayload = new RequestPayload()
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(fnvcategoryFailure(error.message))
    })
    if (response && response.status == '200') {
        console.log('fnv category', response)
        dispatch(getfnvcategory(response.data))
        
        return response.data
    }
}

// export const getAllGetItemName = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + `/fnv/itemNameList`
//     const requestPayload = new RequestPayload()
//     const response = await fetchData(Url, requestPayload).catch((error) => {
//         dispatch(itemnameFailure(error.message))
//     })
//     if (response && response.status == '200') {
//         console.log('item name', response)
//         dispatch(getitemname(response.data))

//         return response.data
//     }
// }


export const getAllGetItemName = (payload) => async (dispatch) => {
    const Url = configuration.apiBaseUrl + `/fnv/itemNameList?searchWord=${payload}` 
    const requestPayload = new RequestPayload()
    
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(itemnameFailure(error.message))
    })
    if (response && response.status == '200') {
        console.log('item name', response)
        dispatch(getitemname(response.data))

        return response.data
    }
}


export const getItemDetails = (payload) => async (dispatch) => {
    const Url = configuration.apiBaseUrl + `/fnv/itemCode?itemId=${payload}` 
    const requestPayload = new RequestPayload()
    
    const response = await fetchData(Url, requestPayload).catch((error) => {
        dispatch(itemnameFailure(error.message))
    })
    if (response && response.status == '200') {
        console.log('item name', response)
        dispatch(itemDetails(response.data))

        return response.data
    }
}

export const savequestions=(payload)=>async (dispatch)=>{
    dispatch(questionsave(payload))
}

// export const getAllTimeslotsMarket = (id) => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + '/timeslot?market=' + id
//     console.log('id', id)
//     const requestPayload = new RequestPayload()
//     const response = await fetchData(Url, requestPayload).catch((error) => {
//         dispatch(marketLocationFailure(error.message))
//     })
//     if (response && response.status == '200') {
//         dispatch(getmarketLocation(response.data))
//         return response.data
//     }
// }

// export const getOneUserById = () => async (dispatch) => {
//     const Url = configuration.apiBaseUrl + '/user?size=1000'

//     const requestPayload = new RequestPayload()
//     const response = await fetchData(Url, requestPayload).catch((error) => {
//         dispatch(marketLocationFailure(error.message))
//     })
//     if (response && response.status == '200') {
//         dispatch(getmarketLocation(response.data))
//         return response.data
//     }
// }
