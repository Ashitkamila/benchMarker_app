import { GET_LOCATIONMAT, ADD_LOCATIONMAT, UPDATE_LOCATIONMAT, DELETE_LOCATIONMAT, LOCATIONMAT_ERROR } from './locationmatActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const locationmatReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_LOCATIONMAT:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_LOCATIONMAT:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_LOCATIONMAT:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_LOCATIONMAT:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case LOCATIONMAT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
