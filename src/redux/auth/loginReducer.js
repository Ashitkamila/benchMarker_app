import {
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './loginActionTypes';

const initialState = {
    userData:{},
    loginError: '',
    loading:true
}

export const loginReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData:payload,
                loading: false
              };
              
        case LOGIN_FAILED:
            return {
                ...state,
                loginError: payload,
                loading: false
            }
        
        default: return state;
    
    }

}
