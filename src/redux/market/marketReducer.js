import { GET_MARKET, ADD_MARKET, UPDATE_MARKET, DELETE_MARKET, MARKET_ERROR } from './marketActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const marketReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_MARKET:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_MARKET:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_MARKET:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_MARKET:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case MARKET_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
