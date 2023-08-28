import { GET_COMPETITORPRICE, COMPETITORPRICE_ERROR, GET_COMPETITORPRICE_ALL } from './competitorPriceActionTypes';
import { RequestPayload, fetchData, postData, patchData, fetchDataNew } from '../baseAPIService'
import { configuration } from '../../services/appConfig'
import moment from 'moment';
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// ACTION Creators
export const getCompetitorPrice = (payload) => {
    console.log('payload12h', payload);
    return {
        type: GET_COMPETITORPRICE,
        payload: payload
    }
}


export const competitorPriceFaliure = (error) => {
    return {
        type: COMPETITORPRICE_ERROR,
        payload: error
    }
}

let from = moment().format("YYYY-MM-DD");
let to = moment().format("YYYY-MM-DD");

// Action for fetching competitorprice data
export const getAllCompetitorPrice = (page, rowsPerPage) => async (dispatch) => {
    console.log("ppmmm", rowsPerPage, page);
    const Url = `${configuration.apiBaseUrl}/competitivePrice?page=${page}&limit=${rowsPerPage}&from=${from}&to=${to}`;
    console.log('competitorPriceUrl12', Url);
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(competitorPriceFaliure(error.message))
            toast.error(error.message);
        });
    if (response && response.status == "200") {

        console.log('responseOfCompetitorPrice', response);
        dispatch(getCompetitorPrice(response));
        toast.success("Loading Data....", { theme: "colored" });
        return response;
    }
};



export const getCompetitorPrice_all = (payload) => {
    console.log('prasadddd', payload);
    return {
        type: GET_COMPETITORPRICE_ALL,
        payload: payload
    }
}

// export const getAllCompetitorPrice_all = (page, rowsPerPage) => async (dispatch) => {
//     console.log("ppmmmHJ", page, rowsPerPage);
//     const Url = `${configuration.apiBaseUrl}/competitivePrice?page=${1}&limit=${100}&from=${from}&to=${to}`;
//     console.log('competitorPriceUrl12', Url);
//     const requestPayload = new RequestPayload();
//     const response = await fetchData(Url, requestPayload)
//         .catch(error => {
//             dispatch(competitorPriceFaliure(error.message))
//             toast.error(error.message);
//         });
//     if (response && response.status == "200") {

//         console.log('lkjhgfdsa', response);
//         dispatch(getCompetitorPrice_all(response));
//         toast.success("Loading Data....", { theme: "colored" });
//         return response;
//     }
// };



