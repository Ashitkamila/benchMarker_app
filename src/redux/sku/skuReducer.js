import { GET_SKU, SKU_ERROR } from './skuActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const skuReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_SKU:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case SKU_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
