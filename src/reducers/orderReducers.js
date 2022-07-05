import {
    ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    REQUEST_COMPLETE,
    ORDER_PAY,
    ORDER_SET,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_SUCCESS,
    ORDER_DELIVER_SUCCESS,
    TOURIST_ORDER_PAY
} from '../constants/orderConstants'

export const orderReducer = (state = {orders: [],total: 0,pageArr: [], order: {paymentMethod: 'PayPal', order_id: '', orderDetail: {}},createSuccess: false, paySuccess: '', deleverSuccess: false}, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                total: action.total,
                pageArr: action.pageArr
            }

        case REQUEST_COMPLETE:
            return {
                ...state,
                loading: false
            }
        case REQUEST_COMPLETE:
            return {
                ...state,
                loading: false
            }
        case ORDER_SET: 
            return {
                ...state,
                order: action.payload,
                createSuccess: true,
                loading: false
            }
        case ORDER_CREATE_RESET:
                return {
                    ...state,
                    order:  {paymentMethod: 'PayPal', order_id: ''}
                }
        case ORDER_DETAILS_SUCCESS: 
            return {
                ...state,
                loading: false,
                orderDetail: action.payload,
                // order: action.payload,
                
            }
        case TOURIST_ORDER_PAY: 
            return {
                ...state,
                paySuccess: action.payload,
                loading: false
            }
        // case  ORDER_PAY:
        //     return {
        //         ...state,
        //         order: {
        //             ...state.order,
        //             ...(action.payload || {})
        //         },
        //         loading: false
        //     }
        // case ORDER_PAY_SUCCESS:
        //     return {
        //         ...state,
        //         paySuccess: true,

        //     }
        case ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                deleverSuccess: true,
                loading: false
            }

        default:
            return state
    }
}
