import { GET_MARKETLOCATION, ADD_MARKETLOCATION, UPDATE_MARKETLOCATION, DELETE_MARKETLOCATION, MARKETLOCATION_ERROR,GET_TIMESLOT,GET_ITEM_DETAILS ,GET_MARKET_ADDRESS,GET_CATEGORY_DETAILS} from './marketLocationActionTypes'


const initialState = {
    marketLocation: {},
    error: '',
    loading: true,
    newtimeslot:[],
    tagitem:{},
    tagcategory:{},
    marketaddress:''
}

export const marketLocationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_MARKETLOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case ADD_MARKETLOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case UPDATE_MARKETLOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };
        case DELETE_MARKETLOCATION:
            return {
                ...state,
                usersData: payload,
                loading: false
            };

        case MARKETLOCATION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

            case GET_TIMESLOT:
                return {
                    ...state,
                    newtimeslot: payload,
                    loading: false
                    
                }
                case GET_ITEM_DETAILS:
                    return {
                        ...state,
                        tagitem:payload,
                        loading: false
                       
                    }
                    case GET_CATEGORY_DETAILS:
                        return{
                            ...state,
                            tagcategory:payload,
                            loading:false
                        }
                    case GET_MARKET_ADDRESS:
                        return{
                            ...state,
                            marketaddress:payload
                        }
        default: return state;

    }

}
