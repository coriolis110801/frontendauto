import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import LoadSpinner from './LoadSpinner'
function SelectItem({item, noFun}) {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    const [color, setColor] = useState('');
    const [combo, setCombo] = useState('');
    const [qty, setQty] = useState(1);
    console.log(product.colors,'product');
    useEffect(() => {
        if(item &&item.id) dispatch(listProductDetails(item.id));
    }, [dispatch, item]);
    const okFun = ()=>{
        dispatch(addToCart(item, qty, color, combo));
        noFun();
    }
    const changeIptHandle = (key) => {
        return (e) => {
            if(key == 'color') {
                setColor(e.target.value);
            }else if(key == 'combo') {
                setCombo(e.target.value);
            }
        }
    }
    return (
        <div class="f-loading">
            <div className="SelectItem">
                {
                    loading ? <div className="fullcreen"><LoadSpinner /></div>: <div>
                          <div className="layui-form lis">
                                            <select className="downPutOne lis" value={color} onChange={changeIptHandle('color')}>
                                                <option value="">Please Choose</option>
                                                {
                                                    product&&product.colors&&product.colors.map((item,index) => {
                                                        return <option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <br />
                                        <div className="layui-form lis">
                                            <select className="downPutOne lis" value={combo} onChange={changeIptHandle('combo')}>
                                                <option value="">Please Choose</option>
                                                {
                                                    product&&product.combos&&product.combos.map((item,index) => {
                                                        return <option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                         
                        <div  className="flex "><div onClick={okFun} className=" basket-btn">Confirm</div> 
                        <div className=" basket-btn no" onClick={noFun}>Cancel</div> </div>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default SelectItem
