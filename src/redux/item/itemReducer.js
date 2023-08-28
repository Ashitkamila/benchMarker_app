import { GET_ITEM, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEM_ERROR } from './itemActionTypes'


const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const itemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ITEM:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_ITEM:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_ITEM:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_ITEM:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ITEM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
