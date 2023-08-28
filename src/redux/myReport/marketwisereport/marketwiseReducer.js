import { GET_MARKETWISE, ADD_MARKETWISE, UPDATE_MARKETWISE, DELETE_MARKETWISE, MARKETWISE_ERROR } from './marketwiseActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const marketwiseReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_MARKETWISE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_MARKETWISE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_MARKETWISE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_MARKETWISE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case MARKETWISE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
