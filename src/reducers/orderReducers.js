import {
    ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    REQUEST_COMPLETE
} from '../constants/orderConstants'

export const orderReducer = (state = {orders: [],total: 0,pageArr: []}, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ORDER_SUCCESS:
            // console.log(action,99933333);
            return {
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


        default:
            return state
    }
}
