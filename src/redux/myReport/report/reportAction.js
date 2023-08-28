import { GET_REPORT,  REPORT_ERROR } from './reportActionTypes'
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
export const getAllReport = (from, to) => async (dispatch) => {
    const user=localStorage.getItem('User')
    const userDetails=JSON.parse(user)
    // const Url = configuration.apiBaseUrl + '/price?size=100&from=' + moment('2022-01-20').format("YYYY-MM-DD") + '&to=' + moment(new Date()).format("YYYY-MM-DD") + 'usertpe=fnv';
      const Url = configuration.apiBaseUrl + `/price?size=100&companyCode=${userDetails.companyCode}`;
    // const Url = configuration.apiBaseUrl + '/price?size=100&from=2022-01-20&to=2022-01-21';
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

