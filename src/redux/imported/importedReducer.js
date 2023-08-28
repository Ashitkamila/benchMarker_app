import { GET_IMPORTED, ADD_IMPORTED, UPDATE_IMPORTED, DELETE_IMPORTED, IMPORTED_ERROR } from './importedActionTypes'

const initialState = {
    usersData: {},
    error: '',
    loading: true
}

export const importedReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_IMPORTED:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_IMPORTED:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_IMPORTED:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_IMPORTED:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case IMPORTED_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: return state;

    }

}
