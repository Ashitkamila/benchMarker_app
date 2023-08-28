export const configuration = {
    // API base url production server
//     apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://52.163.118.48:8010/api/v1',
    // API base url test server
//  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://13.70.26.58:8010/api/v1",
 apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://20.219.104.23:8010/api/v1",

 
//  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "https://api-benchmarker.censanext.com/api/v1",

//production api
//  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "https://api-benchmarker.waycool.in/api/v1",
    
    fileLimit: 10240, // File Limit is 10 MB,
    // All the formats for file and images that can be uploaded 
    allowedFileFormats: '.txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.csv',
    version: '1.0.0',
};
export const configuration2 = {
    // API base url production server
//     apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://52.163.118.48:8010/api/v1',
    // API base url test server
//  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://13.70.26.58:8010/api/v1",
 apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://20.219.104.23:8010/api/v2",

 
//  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "https://api-benchmarker.censanext.com/api/v1",

//production api
//  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "https://api-benchmarker.waycool.in/api/v1",
    
    fileLimit: 10240, // File Limit is 10 MB,
    // All the formats for file and images that can be uploaded 
    allowedFileFormats: '.txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.csv',
    version: '1.0.0',
};
// Here replace  GoogleMapsAPI value with original one
export const GoogleMapsAPI = 'AIzaSyASRO1ULLpXIdhh75V_ye6eju4xpo5JB_Y';
