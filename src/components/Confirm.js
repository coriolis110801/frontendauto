import React from 'react'
function Confirm({tip, okFun, noFun}) {
    // console.log(okFun, 999);
    return (
        <div className="f-loading">
            <div className="Confirm">
                <div>{tip}</div>
                <div  className="flex "><div onClick={okFun} className=" basket-btn">YES</div> 
                {noFun&&<div className=" basket-btn no" onClick={noFun}>NO</div>} </div>
            </div>
        </div>
    )
}

export default Confirm
