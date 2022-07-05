import {
    SHOW,
    HIDE
} from '../constants/headFootConstants.js'
export const headFootReducers = (state = {show: true}, action) => {
    switch (action.type) {
        case SHOW: 
            return {
                show: true
            }
        case HIDE: 
            return {
                show: false
            }
        default:
            return state
    }
}