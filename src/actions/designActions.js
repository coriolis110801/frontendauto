import {
    DESIGN_REQUEST,
    GET_DESIGN_SUCCESS,
    REQUEST_COMPLETE
} from '../constants/designConstants'
import axios from 'axios'
import {messageUpdate} from './messageActions'
import { baseAPIUrl } from '../constants/apiConstants'


function errorMsg(error, dispatch) {
    dispatch({
        type: REQUEST_COMPLETE
    })
    dispatch(messageUpdate(error.response && error.response.data.detail? error.response.data.detail: error.message))
    
}

export const getMyDesign = (param) => async (dispatch, getState) => {
    try {
        if(!param.pageIndex) param.pageIndex = 1;
        if(!param.pageSize) param.pageSize = 5;
        dispatch({ type: DESIGN_REQUEST })
        let url = baseAPIUrl + 'shape/design/my?page_num='+param.pageIndex+'&page_size='+param.pageSize;
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
        // console.log(data,888)
        if(data&&data.orders) {
            // dispatch({
            //     type: GET_DESIGN_SUCCESS,
            //     payload: data.orders
            // })
            const pTotal =  Math.ceil(data.total / param.pageSize);
            const arr = []
            for(let i = 0 ; i<pTotal ;i++) {
                arr.push(i+1);
            }
            dispatch({
                type: GET_DESIGN_SUCCESS,
                payload: data.orders,
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

export const deleteMyDesign = (id, pageIndex, pageSize) => async (dispatch, getState) => {
    try {
        dispatch({ type: DESIGN_REQUEST })
        let url = baseAPIUrl + 'shape/design/my/delete?id='+id;
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
            dispatch(getMyDesign({
                pageIndex: pageIndex,
                pageSize: pageSize
            }))
        }else if(data.message){
            errorMsg(data, dispatch)
            
        }
       

    } catch (error) {
        errorMsg(error, dispatch)
   
    }
}