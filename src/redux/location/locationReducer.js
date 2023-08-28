import { GET_LOCATION, ADD_LOCATION, UPDATE_LOCATION, DELETE_LOCATION, LOCATION_ERROR } from './locationActionTypes'

const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const locationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_LOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_LOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_LOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_LOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case LOCATION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
