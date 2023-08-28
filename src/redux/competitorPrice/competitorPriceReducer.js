import { GET_COMPETITORPRICE, GET_COMPETITORPRICE_ALL, COMPETITORPRICE_ERROR } from './competitorPriceActionTypes';



const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const competitorPriceReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log('asdfguytr',action);
    switch (type) {
        case GET_COMPETITORPRICE:
            console.log("payload123", payload)
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case GET_COMPETITORPRICE_ALL:
            console.log("payload122343", payload)
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case COMPETITORPRICE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
