
import axios from 'axios';
import { configuration } from '../services/appConfig';

const user = localStorage.getItem('User');
const userDetails = JSON.parse(user);
const accessToken = userDetails && (userDetails.token || ' ');

export function RequestPayload(data = {}, headers = { "Authorization": `${accessToken}` }) {
    this.data = data;
    this.headers = headers;
    
    // this.companyCode=userDetails.companyCode;
}
// `baseURL` will be prepended to `url` unless `url` is absolute.
axios.defaults.baseURL = configuration.apiBaseUrl;


axios.interceptors.request.use(
    config => {
        if (accessToken) {
            config.headers.authorization = `${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);


export const postData = async (url, config) => {
   
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.defaults.headers.post['Acces-Control-Allow-Origin'] = '*';
    try {
        const response = await axios.post(url, config.data);
        console.log("postData", response);
        return response.data;

    } catch (error) {
        console.log("postDataerr", error.response);
        return error.response.data;
    }
};



/**
 * @param {*} url 
 * @param {*} config 
 */
export const fetchData = async (url, config) => {
    try {
        const response = await axios.get(url, {
            params: config.data,
        });
        return response.data;
    } catch (error) {

        return error;
    }

};

export const fetchDataNew = async (url, config) => {
    
        const response = await axios.get(url, {
            params: config.data,
        });
        return response;


};


export const DeleteData = async (url, config) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.defaults.headers.post['Acces-Control-Allow-Origin'] = '*';

    try {
        const response = await axios.delete(url, { data: config });
        console.log("delete", response);
        return response.data;
    } catch (error) {
        console.log("test", error.response)
        return error.response.data;
    }
};
export const patchData = async (url, config) => {
    axios.defaults.headers.patch['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.defaults.headers.post['Acces-Control-Allow-Origin'] = '*';
    // await axios.patch(url, config.data,config.headers).then(res => {
    //     console.log("up",)
    //     return res.data;
    // }).catch(error=>{
    //     return error.response.data;
    // })
    try {
        const response = await axios.patch(url, config.data, config.headers);
        console.log("patchData", response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


// new one 
export const CreateData = async (url, config) => {
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Accept'] = 'application/json';
    axios.defaults.headers.put['Acces-Control-Allow-Origin'] = '*';
    // const response = await axios.patch(url, config.data);
    // if (response.status === 200 ) {
    //     return response.data;
    // }
    // return response;
    try{
        const response = await axios.patch(url, config.data);
        console.log("createData", response)
        return response.data;
    }
    catch(error){
        console.log("test error",error.response.data)
     return error.response.data;
    }
};