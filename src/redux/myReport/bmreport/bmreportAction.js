import { GET_REPORT,  REPORT_ERROR } from './bmreportActionTypes'
import { RequestPayload, fetchData, postData, patchData } from '../../baseAPIService'
import { configuration } from '../../../services/appConfig'
import moment from 'moment';

// ACTION Creators
export const getReport = (payload) => {
    console.log("time", payload)
    return {
        type: GET_REPORT,
        payload: payload
    }
}
export const getOneReportWithId = (payload) => {
    console.log("time", payload)
    return {
        type: GET_REPORT,
        payload: payload
    }
}

export const reportFailure = (error) => {
    return {
        type: REPORT_ERROR,
        payload: error
    }
}

// Action for fetching roles data
export const getAllBMReport = (newValue, newValue1) => async (dispatch) => {
    const date = new Date();
     let fromdate = date.setDate(date.getDate() - 1);
     console.log('from date', fromdate);
      //# => Fri Apr 01 2011 11:14:50 GMT+0200 (CEST)

    const user=localStorage.getItem('User')
    const userDetails=JSON.parse(user)
    const Url = `${configuration.apiBaseUrl}/dashboard/bm-performance-report?from=` + moment( new Date() ).format("YYYY-MM-DD") + '&to=' + moment(new Date()).format("YYYY-MM-DD")+`&companyCode=${userDetails.companyCode}` ;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            dispatch(reportFailure(error.message))
        });
    if (response && response.status == "200") {
        dispatch(getReport(response.data));
        return response.data;
    }
};


// Action for fetching roles data
export const getAllBMReportByDate = (data) => async (dispatch) => {
    const user=localStorage.getItem('User')
    const userDetails=JSON.parse(user)
    const Url = `${configuration.apiBaseUrl}/dashboard/bm-performance-report?from=` + data.from + '&to=' + data.to+`&companyCode=${userDetails.companyCode}`;
    const requestPayload = new RequestPayload();
    const response = await fetchData(Url, requestPayload)
        .catch(error => {
            console.log('error', error.message)
            dispatch(reportFailure(error.message))
        });
    if (response && response.status == "200") {
        
        dispatch(getReport(response.data));
        console.log('response', response)
        return response.data;
    }
};