import React from 'react'
function Confirm({tip, okFun, noFun, confirmText, title}) {
    // console.log(okFun, 999);
    return (
        <div className="f-loading">
            
            <div className="Confirm">
                <div className="title">{title || 'Info'}</div>
                <div className="confirm-content">{tip}</div>
    <div  className="flex "><div onClick={okFun} className=" basket-btn">{confirmText || 'YES'}</div> 
                {noFun&&<div className=" basket-btn no" onClick={noFun}>NO</div>} </div>
            </div>
        </div>
    )
}

export default Confirm
