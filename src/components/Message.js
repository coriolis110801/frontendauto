import React, { useEffect} from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { messageUpdate } from '../actions/messageActions'


function Message({ variant, children , timeout=2000}) {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(messageUpdate(''))
        }, timeout);

    },[]);
    return (
        <Alert variant={variant}>
            {children}
            {/* <span onClick="close" className="close">X</span> */}
        </Alert>
    )
}

export default Message
