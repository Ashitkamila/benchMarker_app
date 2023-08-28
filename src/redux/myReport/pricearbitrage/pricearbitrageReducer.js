import { GET_PRICEARBITRAGE, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, PRICEARBITRAGE_ERROR } from './pricearbitrageActionTypes'


const initialState = {
    priceArbitrageData: [],
    error: '',
    loading: true,
    arbitrageFilter: 'none'
}

export const priceArbitrageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRICEARBITRAGE :
            return {
                ...state,
                priceArbitrageData: payload,
                loading: false
            };

        

        case PRICEARBITRAGE_ERROR :
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
