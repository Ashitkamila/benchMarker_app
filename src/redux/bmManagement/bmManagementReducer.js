import {
    GET_BMMANAGEMENT,
    BMMANAGEMENT_ERROR,
    ADD_BMMANAGEMENT,
    UPDATE_BMMANAGEMENT,
    DELETE_BMMANAGEMENT,
} from './bmManagementActionTypes';

const initialState = {
    loading: true,
    BmManagementData: {},
    error: ''
}

export const bmManagementReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_BMMANAGEMENT:
            return {
                ...state,
                BmManagement: payload,
                loading: false
            };
        case GET_BMMANAGEMENT:
            return {
                ...state,
                BmManagement: payload,
                loading: false,
            };
        case UPDATE_BMMANAGEMENT:
            return {
                ...state,
                BmManagement: payload,
                loading: false
            };
        case DELETE_BMMANAGEMENT:
            return {
                ...state,
                BmManagement: payload,
                loading: false
            };
        case BMMANAGEMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: return state;

    }

}


