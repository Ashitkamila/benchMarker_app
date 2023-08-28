import { GET_PRICE, ADD_PRICE, UPDATE_PRICE, DELETE_PRICE, PRICE_ERROR } from './pricevolatilityActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const pricevolatilityReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRICE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_PRICE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_PRICE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_PRICE:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case PRICE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
