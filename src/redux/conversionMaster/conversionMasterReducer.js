import { GET_CONVERSION, ADD_CONVERSION, UPDATE_CONVERSION, DELETE_CONVERSION, CONVERSION_ERROR } from './conversionMasterActionTypes'

const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const conversionReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_CONVERSION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_CONVERSION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_CONVERSION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case CONVERSION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
