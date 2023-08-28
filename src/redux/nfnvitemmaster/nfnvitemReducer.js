import { GET_NFNVCATEGORY, NFNVCATEGORY_ERROR, GET_NFNVITEM, ADD_NFNVITEM, UPDATE_NFNVITEM, DELETE_NFNVITEM, NFNVITEM_ERROR } from './nfnvitemActionTypes'


const initialState = {
    nfnv: {},
    error: '',
    loading: true
}

export const nfnvitemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_NFNVITEM:
            return {
                ...state,
                nfnv: payload,
                loading: false
            };

        case ADD_NFNVITEM:
            return {
                ...state,
                nfnv: payload,
                loading: false
            };

        case UPDATE_NFNVITEM:
            return {
                ...state,
                nfnv: payload,
                loading: false
            };
        case DELETE_NFNVITEM:
            return {
                ...state,
                nfnv: payload,
                loading: false
            };

        case NFNVITEM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case GET_NFNVCATEGORY:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case NFNVCATEGORY_ERROR:
                return {
                    ...state,
                    error: payload,
                    loading: false
                }    




        default: return state;

    }

}
