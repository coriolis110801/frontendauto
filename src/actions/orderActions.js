import {
    ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    REQUEST_COMPLETE
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