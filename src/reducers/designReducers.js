import {
    DESIGN_REQUEST,
    GET_DESIGN_SUCCESS,
    REQUEST_COMPLETE,
    GET_SHAPES_SUCCESS,
    GET_FRESHENERS_SUCCESS,
    SCENTS_SAVE
} from '../constants/designConstants'
export const designReducers = (state = { designs: [],total: 0,pageArr:[],shapes:[], fresheners: {}}, action) => {
    switch (action.type) {
        case DESIGN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_DESIGN_SUCCESS:
            return {
                ...state,
                loading: false,
                designs:  action.payload,
                total: action.total,
                pageArr: action.pageArr
            }
        case GET_SHAPES_SUCCESS:
            return {
                ...state,
                loading: false,
                shapes:  action.payload,
            }
        case GET_FRESHENERS_SUCCESS: 
            return {
                ...state,
                loading: false,
                fresheners:  action.payload,
            }          
        case REQUEST_COMPLETE:
            return {
                ...state,
                loading: false
            }
        case SCENTS_SAVE: 
            return {
                ...state,
                scents: action.payload
            }
        default:
            return state;
            
            
    }
}