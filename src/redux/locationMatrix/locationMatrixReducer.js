import { GET_LOCATIONMATRIX, ADD_LOCATIONMATRIX, UPDATE_LOCATIONMATRIX, DELETE_LOCATIONMATRIX, LOCATIONMATRIX_ERROR } from './locationMatrixActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const locationMatrixReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_LOCATIONMATRIX:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_LOCATIONMATRIX:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_LOCATIONMATRIX:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_LOCATIONMATRIX:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case LOCATIONMATRIX_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
