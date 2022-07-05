import {
    SHOW,
    HIDE,
} from '../constants/headFootConstants.js'
export const show = (id) => async (dispatch) => {
    dispatch({ type: SHOW })
}
export const hide = (id) => async (dispatch) => {
    dispatch({ type: HIDE })
}