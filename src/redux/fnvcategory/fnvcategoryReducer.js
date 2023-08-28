import { GET_FNVCATEGORY, FNVCATEGORY_ERROR ,ITEMNAME_ERROR ,GET_ITEMNAME,ITEM_DETAILS,SAVE_QUEST } from './fnvcategoryActionTypes'


const initialState = {
    fnvcategory: {},
    itemname: {},
    itemdetails:{},
    error: '',
    loading: true,
    questiondetails:[]

}

export const fnvcategoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_FNVCATEGORY:
            return {
                ...state,
                usersData: payload,
                loading: false
            };


            
                    case GET_ITEMNAME:
                        return {
                            ...state,
                            usersData: payload,
                            loading: false
                        };
                        case ITEM_DETAILS:
                            return {
                                ...state,
                                itemdetails: payload,
                                loading: false
                            };
        // case ADD_MARKETLOCATION:
        //     return {
        //         ...state,
        //         usersData: payload,
        //         loading: false
        //     };

        // case UPDATE_MARKETLOCATION:
        //     return {
        //         ...state,
        //         usersData: payload,
        //         loading: false
        //     };
        // case DELETE_MARKETLOCATION:
        //     return {
        //         ...state,
        //         usersData: payload,
        //         loading: false
        //     };

        case FNVCATEGORY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
            case ITEMNAME_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
            case SAVE_QUEST:
                console.log('allstate1234',payload);
                return{
                    ...state,
                    questiondetails:payload
                }
        default: return state;

    }

}
