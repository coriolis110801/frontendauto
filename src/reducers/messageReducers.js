import {
    MESSAGE_UPDATE
} from '../constants/messageConstants'


export const messageReducer = (state = { msg: '' }, action) => {
    if(!action.variant) action.variant = 'danger';
    switch (action.type) {
        case MESSAGE_UPDATE:
            return { msg: action.payload, variant:  action.variant }
        default: 
        return {msg: '', variant: action.variant}
    }
}

