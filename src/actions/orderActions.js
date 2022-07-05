import {
    ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    ORDER_SET,
    // ORDER_PAY_RESET,
    REQUEST_COMPLETE,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_SUCCESS,
    ORDER_DELIVER_SUCCESS,
    TOURIST_ORDER_PAY
} from '../constants/orderConstants'
import axios from 'axios'
import {messageUpdate} from './messageActions'
import { baseAPIUrl } from '../constants/apiConstants'


function errorMsg(error, dispatch) {
    dispatch({
        type: REQUEST_COMPLETE
    })
    dispatch(messageUpdate(error.response && error.response.data.detail? error.response.data.detail: error.message))
    
}

export const getMyOrder = (param) => async (dispatch, getState) => {
    if(!param.pageIndex) param.pageIndex = 1;
    if(!param.pageSize) param.pageSize = 5;

    try {
        dispatch({ type: ORDER_REQUEST })
        let url = baseAPIUrl + 'orders?page_num='+param.pageIndex+'&page_size='+param.pageSize+'&order_by=-date_added'+(param.status!==undefined?'&status='+param.status:'');
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.get(url, config)
      
        if(data&&data.data) {
            const pTotal =  Math.ceil(data.total / param.pageSize);
            const arr = []
            for(let i = 0 ; i<pTotal ;i++) {
                arr.push(i+1);
            }
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: data.data,
                total: data.total,
                pageArr: arr
            })
        }else if(data.message){
            errorMsg(data, dispatch)
            
        }
       

    } catch (error) {
        errorMsg(error, dispatch)
   
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const { data } = await axios.post(
            baseAPIUrl+'ordersdetail',
            {
                userorderid: id
            },
            config
        )
        console.log(data)
        if(data&&data.productlist) {

            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
        }else if(data.message){
            errorMsg(data, dispatch)
        }
       


    } catch (error) {
        errorMsg(error, dispatch)
    }
}


export const deleteMyOrder = (id, pageIndex, pageSize, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_REQUEST })
        let url = baseAPIUrl + 'order/delete?id='+id;
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.get(url, config)
      
        if(data&&data.code==0) {
            dispatch({
                type: REQUEST_COMPLETE
            });
            dispatch(getMyOrder({
                pageIndex: pageIndex,
                pageSize: pageSize,
                status: status ===''?undefined:status
            }))
        }else if(data.message){
            errorMsg(data, dispatch)
            
        }
       

    } catch (error) {
        errorMsg(error, dispatch)
   
    }
}


export const createOrder = (cart) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_REQUEST })
        let url = baseAPIUrl + 'order/save';
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            url,
            cart,
            config
        )
       
        if(data&&data.code==0) {
            dispatch({
                type: ORDER_SET,
                payload: data
            });
            
        }else if(data.message || data.msg){
            if(!data.message) data.message = data.msg;
            errorMsg(data, dispatch)
            
        }
       

    } catch (error) {
        errorMsg(error, dispatch)
   
    }
}





export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            baseAPIUrl + 'order/update',
            {
                userorder_id: id
            },
            config
        )
        dispatch(getOrderDetails(id))

        // dispatch({
        //     type: ORDER_PAY_SUCCESS,
        //     payload: data
        // })


    } catch (error) {
        errorMsg(error, dispatch)
    }
}

export const youkeOrder = (param, callback) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        })

        // const {
        //     userLogin: { userInfo },
        // } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            baseAPIUrl + 'youke/pay',
            param,
            config
        )
        // 
        if(data && data.code == 0) {
            // dispatch(messageUpdate('Paid Successfilly', 'success'));
            dispatch({
                type: TOURIST_ORDER_PAY,
                payload: data
            })
            callback(data);
           
        }else {
            // callback(data);
            if(!data.message) data.message = data.msg;
            errorMsg(data, dispatch)
        }
       


    } catch (error) {
        errorMsg(error, dispatch)
    }
}


export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        })


        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `orders/${order._id}/deliver/`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })


    } catch (error) {
        errorMsg(error, dispatch)
    }
}