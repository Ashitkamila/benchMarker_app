import { GET_AGMARK, ADD_AGMARK, UPDATE_AGMARK, DELETE_AGMARK, AGMARK_ERROR } from './agmarkActionTypes'


const initialState = {
    agmarkData: [],
    error: '',
    loading: true,
    agmarkFilter: 'none'
}

export const agmarkReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_AGMARK:
            return {
                ...state,
                agmarkData: payload,
                loading: false
            };

       
        case AGMARK_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
