import { GET_TIME, ADD_TIME, UPDATE_TIME, DELETE_TIME, TIME_ERROR } from './timeActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const timeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_TIME:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_TIME:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_TIME:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_TIME:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case TIME_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
