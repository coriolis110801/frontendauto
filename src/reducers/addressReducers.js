import {
    REQUEST_FAIL,
    GET_ADDRESS,
    GET_ADDRESS_REQUEST,
    EDIT_ADDRESS,
    EDIT_ADDRESS_COMPLETE,
    SET_PICKUP,
    GET_PICKUP_REQUEST,
    GET_PICKUP_COMPLETE
} from '../constants/addressConstants'

export const addressReducers = (state = { addresses: [], loading: false, loading2: false,scents: [] }, action) => {
    switch (action.type) {
        case GET_ADDRESS:
            if(action.payload) {
                const index = action.payload.findIndex(item=>item.status == 1 );
                if(index!=-1) {
                    const item = action.payload[index]
                    action.payload.splice(index, 1);
                    action.payload.unshift(item);
                }
            }
           
            
            return {
                ...state,
                addresses: action.payload,
                loading: false
            }
        case REQUEST_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case EDIT_ADDRESS: 
            return {
                ...state,
                loading2: true
            }
        case EDIT_ADDRESS_COMPLETE: 
            return {
                ...state,
                loading2: false
            }
        

        default:
            return state
    }
}

export const pickupReducers = (state = {}, action) => {
    switch (action.type) {
        case SET_PICKUP:
            return {
                ...state,
                ztAddress: action.payload,
                loading: false
            }
        case GET_PICKUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case GET_PICKUP_COMPLETE: 
            return {
                ...state,
                loading: false
            }
        

        default:
            return state
    }
}