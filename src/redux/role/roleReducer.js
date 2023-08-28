import {GET_ROLE,ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, ROLE_ERROR} from './roleActionTypes'

const initialState = {
    usersData:{},
    error: '',
    loading:true
}

export const roleReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_ROLE:
            return {
                ...state,
                usersData:payload,
                loading: false
              };
              
        case ROLE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        
        default: return state;
    
    }

}