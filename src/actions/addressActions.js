import axios from 'axios'
import {messageUpdate} from './messageActions'
import {
    GET_ADDRESS,
    REQUEST_FAIL,
    GET_ADDRESS_REQUEST,
    EDIT_ADDRESS_COMPLETE,
    EDIT_ADDRESS,
    SET_PICKUP,
    GET_PICKUP_REQUEST,
    GET_PICKUP_COMPLETE
} from '../constants/addressConstants'
import { baseAPIUrl } from '../constants/apiConstants'


function errorMsg(error, dispatch, type) {
    if(!type) type = REQUEST_FAIL;
    dispatch({
        type
    })
    dispatch(messageUpdate(error.response && error.response.data.detail? error.response.data.detail: error.message))
    
}

export const getAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ADDRESS_REQUEST })
        let url = baseAPIUrl + 'address';
        console.log(id, typeof id !== 'undefined')
        if(typeof id !== 'undefined') url = baseAPIUrl + 'v1/addresses/'+id;
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
        // console.log(data, data.data, 6666)
        if(data&&data.data) {
            dispatch({
                type: GET_ADDRESS,
                payload: data.data
            })
        }else if(data.message){
            errorMsg(data, dispatch)
            
        }
       

    } catch (error) {
        errorMsg(error, dispatch)
   
    }
}
export const setDefaultAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ADDRESS_REQUEST })
        let url = baseAPIUrl + 'address/default?id='+id;
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
        // console.log(data,data.message,111);
        if(data.code == 0) {
            dispatch(getAddress())
        }else {
            errorMsg(data, dispatch)
        }
    } catch (error) {
        errorMsg(error, dispatch)
        
    }
}

export const deleteAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ADDRESS_REQUEST })
        let url = baseAPIUrl + 'address/delete?id='+id;
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
        // console.log(data,data.message,111);
        if(data.code == 0) {
            dispatch(getAddress())
        }else {
            errorMsg(data, dispatch)
        }
    } catch (error) {
        errorMsg(error, dispatch)
        
    }
}

export const saveAddress = (item, closeAddress) =>  async (dispatch, getState) => {
    try {
        dispatch({
            type: EDIT_ADDRESS
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
            baseAPIUrl + `address/save`,
            item,
            config
        )
        dispatch({
            type: EDIT_ADDRESS_COMPLETE
        })
        if(data&&data.data) {
            
            closeAddress();
            dispatch(getAddress())
        }else {
            errorMsg(data, dispatch)
        }
    } catch (error) {
        dispatch({
            type: EDIT_ADDRESS_COMPLETE
        })
        errorMsg(error, dispatch)
    }
}

export const getZtAddress = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_PICKUP_REQUEST })
        // const {
        //     userLogin: { userInfo },
        // } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        // if(userInfo && userInfo.token) config.headers.Authorization = `Bearer ${userInfo.token}`
        const {data}= await axios.get(baseAPIUrl + 'zitidizhi', config)
        // console.log(data, data[0], 6666)
        if(data&&data[0]) {
            dispatch({
                type: SET_PICKUP,
                payload: data[0]
            })
        }else if(data.message){
            errorMsg(data, dispatch, GET_PICKUP_COMPLETE)
            
        }
       

    } catch (error) {
        errorMsg(error, dispatch, GET_PICKUP_COMPLETE)
   
    }
}