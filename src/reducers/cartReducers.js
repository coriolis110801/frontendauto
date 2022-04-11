import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
    CART_REQUEST_DATA
} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: 0, itemsList: [], shippingAddress: {} , totalPrice: 0}, action) => {
    
    console.log(state.cartItems,  state.cartItems*1 + 1, action, 789987);
    switch (action.type) {
        case CART_REQUEST_DATA: 
            if(!(action.payload &&action.payload.cartItems)) return state;
            return {
                ...state,
                cartItems: action.payload.cartItems || 0,
                totalPrice: action.payload.totalPrice || 0,
                itemsList: action.payload.itemsList
            }
        case CART_ADD_ITEM:
            
            const item = action.payload
            const existItem = state.itemsList? state.itemsList.find(x => x.product === item.product) : null
            if (existItem) {
                return {
                    ...state,
                    cartItems: (state.cartItems*1 || 0) + 1,
                    totalPrice: (state.totalPrice || 0) + item.price * item.qty,
                    itemsList: state.itemsList.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: (state.cartItems*1 || 0) + 1,
                    totalPrice: (state.totalPrice || 0) + item.price * item.qty,
                    itemsList: [...(state.itemsList || []), item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: (state.cartItems*1 || 0) + 1,
                totalPrice: (state.totalPrice || 0) + item.price * item.qty,
                itemsList: state.itemsList.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
      
        

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                itemsList: []
            }

        default:
            return state
    }
}