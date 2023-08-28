import { GET_PRICEARBITRAGE_TRACKER, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, PRICEARBITRAGE_ERROR_TRACKER } from './pricearbitragetrackerActionTypes'


const initialState = {
    priceArbitrageTrackerData: [],
    error: '',
    loading: true,
    arbitrageFilter: 'none'
}

export const pricearbitragetrackerReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.log(payload,"1111111111111  ")
    switch (type) {
        case GET_PRICEARBITRAGE_TRACKER :
            return {
                ...state,
                priceArbitrageTrackerData: payload,
                loading: false
            };

        

        case PRICEARBITRAGE_ERROR_TRACKER :
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
