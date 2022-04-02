import axios from 'axios'
import {
    MESSAGE_UPDATE
} from '../constants/messageConstants'


export const messageUpdate = (msg, variant) => async (dispatch) => {
    dispatch({
        type: MESSAGE_UPDATE,
        payload: msg,
        variant
    });
}
