import axios from 'axios'
import {messageUpdate} from './messageActions'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_REQUEST_DATA,
} from '../constants/cartConstants'

import { baseAPIUrl } from '../constants/apiConstants'

export const getCart = (id, qty) => async (dispatch, getState) => {
    // const {data} = await axios.get(baseAPIUrl+`cart`)
    // console.log('data', data);
    let data =  localStorage.getItem('cartItems')
    data = data?JSON.parse(data) : {};
    dispatch({
        type: CART_REQUEST_DATA,
        payload: data,
    })
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart))
}
export const addToCart = (data, qty, color, combo) => async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.total,
            qty,
            color,
            combo
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart))
}



export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}



export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}