import React,{useState} from 'react'
function DesignImg({children, noFun, okFun}) {

    return (
        <div className="f-loading" >
            <div style={{position: 'relative',background: '#fff',width: '800px','box-shadow':' 0 5px 15px rgb(0 0 0 / 50%)'}}>
                <img onClick={noFun} style={{position: 'absolute', right: '10px', top: '10px', cursor: 'pointer'}} width="30" src="./images/index/errs.png" />  
                <div style={{marginTop: 40}}>{children}  </div>                
                                        
                <div  className="flex " ><div onClick={noFun} className=" basket-btn" style={{width: '176px', 'margin-right': '50px'}}>Return</div> 
                <div className=" basket-btn no" onClick={ okFun}  style={{width: '176px'}}>Checkout</div> </div>
            </div>
        </div>
    )
}

export default DesignImg
