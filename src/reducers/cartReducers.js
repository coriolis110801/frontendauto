import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
    CART_REQUEST_DATA
} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: 0, itemsList: [], shippingAddress: null, totalPrice: 0}, action) => {
    
    // console.log(state, action, 789987);
    switch (action.type) {
        case CART_REQUEST_DATA: 
            if(!(action.payload &&action.payload.cartItems)) return state;
            let obj = {
                ...state,
                cartItems: action.payload.cartItems || 0,
                totalPrice: action.payload.totalPrice || 0,
                itemsList: action.payload.itemsList
            };
            localStorage.setItem('cartItems', JSON.stringify(obj))
            return obj
        
        case CART_ADD_ITEM:
            
            const item = action.payload
            const existItem = state.itemsList? state.itemsList.find(x => x.product === item.product && item.color===x.color && item.combo===x.combo) : null
            if (existItem) {
                item.qty = existItem.qty * 1 + 1;
                return {
                    ...state,
                    cartItems: (state.cartItems*1 || 0) + 1,
                    totalPrice: (state.totalPrice || 0) + item.price * (item.discount||1) * item.qty,
                    itemsList: state.itemsList.map(x =>
                        x.product === item.product && item.color===x.color && item.combo===x.combo ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: (state.cartItems*1 || 0) + 1,
                    totalPrice: (state.totalPrice || 0) + item.price * (item.discount||1) * item.qty,
                    itemsList: [...(state.itemsList || []), item]
                }
            }

        case CART_REMOVE_ITEM:
            let item2 = state.itemsList[action.payload] || {};
            let obj2 = {
                ...state,
                cartItems: (state.cartItems*1 || 0) - item2.qty,
                totalPrice: (state.totalPrice || 0) - item2.price * item2.qty,
                itemsList: state.itemsList.filter((x, index) => index !== action.payload)
            };
            localStorage.setItem('cartItems', JSON.stringify(obj2))
            return obj2

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
            let obj3 = {
                ...state,
                itemsList: [],
                cartItems: 0,
                totalPrice: 0
            };
            localStorage.setItem('cartItems', JSON.stringify(obj3))
            return obj3;

        default:
            return state
    }
}