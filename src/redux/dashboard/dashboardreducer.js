import { GET_PIE, ADD_PIE, UPDATE_PIE, DELETE_PIE, PIE_ERROR } from './dashboardActionTypes'

const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const locationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PIE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_PIE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_PIE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_PIE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case PIE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
