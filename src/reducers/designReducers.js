import {
    DESIGN_REQUEST,
    GET_DESIGN_SUCCESS,
    REQUEST_COMPLETE
} from '../constants/designConstants'
export const designReducers = (state = { designs: [],total: 0,pageArr:[]}, action) => {
    switch (action.type) {
        case DESIGN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_DESIGN_SUCCESS:
            return {
                loading: false,
                designs:  action.payload,
                total: action.total,
                pageArr: action.pageArr
            }
        case REQUEST_COMPLETE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
            
            
    }
}