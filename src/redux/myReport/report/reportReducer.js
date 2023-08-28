import { GET_REPORT, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, REPORT_ERROR } from './reportActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const reportReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_REPORT:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        

        case REPORT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
