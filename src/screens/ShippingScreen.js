import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import {CART_CLEAR_ITEMS} from '../constants/cartConstants'
import '../css/ShippingScreen.css'
import Message from '../components/Message'
function ShippingScreen({ history, match }) {

    // const cart = useSelector(state => state.cart)
    // const { shippingAddress } = cart

    const dispatch = useDispatch()
    // console.log(history.location.pathname, 'history111');
    const [tab, setTab] = useState(history.location.pathname.indexOf('/payment')!=-1?2: 1)
    const orderInfo = useSelector(state => state.order)
    const messageInfo = useSelector(state => state.message)
    const { order, createSuccess } = orderInfo
    console.log(match, 'match')
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    // console.log(cart,99991123)
    cart.address_id = match.params.id || undefined
    cart.itemsPrice = cart.itemsList.reduce((acc, item) => acc + (item.price * (item.discount || 1)) * item.qty, 0).toFixed(2)
    // cart.yunfei = (cart.itemsPrice > 10 ? 0 : 1.5).toFixed(2)
    cart.yunfei = 0;
    cart.Shui = Number( cart.itemsPrice - ( cart.itemsPrice / 1.2)).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.yunfei) + Number(cart.Shui)).toFixed(2)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // console.log('userInfo', userInfo);
    let customerName = userInfo&&userInfo.email?userInfo.email:''
    if(cart.address_id === 'tourists-shipping') {
        customerName = shippingAddress.email;
    }
    
    const placeOrder = () => {
        if(cart.address_id === 'tourists-shipping') {
            history.push(`/order`)
            return;
        }
        if(cart.address_id === 'zitiquhuo' && !userInfo) {
           
            history.push(`/zitiquhuo/tourist`)
            return;
        }
        // console.log(cart,'cart');

        let param = {
            shui: cart.Shui,
            orderItems: cart.itemsList.map(item=>{
                item.type = item.combo
                item.productId = item.product
                return item;
            }),
            itemsPrice: cart.itemsPrice,
            jiage: cart.totalPrice,
            yunfei: cart.yunfei,
            customer_name: customerName,
            ztaddress: '',
            addressid: 0
        }
        // if(cart.shippingAddress && cart.shippingAddress.name) param.shippingAddress = cart.shippingAddress;
        if(typeof cart.address_id !=='undefined' && cart.address_id !== 'zitiquhuo') param.addressid = cart.address_id;
        if(cart.address_id === 'zitiquhuo') {
            param.ztaddress = shippingAddress.dizhi+','+
                              shippingAddress.dz1+','+
                              shippingAddress.dz2+','+
                              shippingAddress.dz2+','+
                              shippingAddress.postcode+','+
                              shippingAddress.tel;
        }
        dispatch(createOrder(param))
    }
    const next = () => {
        // setTab(2);
        history.push('/payment/'+(cart.address_id||''));
    }
    useEffect(() => {
        if (createSuccess) {
            console.log(order, 'order')
           const id = order.order_id
            dispatch({ type: CART_CLEAR_ITEMS })
            dispatch({ type: ORDER_CREATE_RESET })
            history.push(`/order/${id}`)
        }
    }, [createSuccess, history])
    return (
        <div className="ShippingScreen">
            {messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message> }
            <div className="nav">
                <span className={tab >= 1 ? 'active' : ''}>Payment</span>
                <span className={tab >= 2 ? 'active' : ''}>Place Order</span>
            </div>
            {
                tab == 1 ? (<form >
                    <div className="form-group">
                        <legend className="form-label">Select Method</legend>
                        <div className="col">
                            <div className="form-check">
                                <input name="paymentMethod" type="radio" id="paypal" className="form-check-input" checked />
                                <label title="" for="paypal" className="form-check-label">PayPal or Credit Card</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn TextGreenBtn" onClick={next}>Continue</button>
                </form>) : ''
            }
            {
                tab == 2 ? <div className="row PayOrder">
                    <div className="col-md-8">
                        <div className="list-group list-group-flush">
                            <div className="list-group-item">
                                <h2>Shipping</h2>
                                {
                                    cart.address_id === 'zitiquhuo' ? 
                                    <p><strong>Picking up:</strong>
                                       {shippingAddress.dizhi},{shippingAddress.dz1},{shippingAddress.dz2},{shippingAddress.dz3}
                                    </p>
                                    :
                                    <p>
                                    <strong>Shipping:
                                        
                                        {shippingAddress&&shippingAddress.country},  {shippingAddress&&shippingAddress.county},  {shippingAddress&&shippingAddress.city},  {shippingAddress&&shippingAddress.gs},  {shippingAddress&&shippingAddress.address}</strong>
                                    
                                    </p>
                                }
                                
                            </div>
                            <div className="list-group-item">
                                <h2>Payment Method</h2>
                                <p><strong>Method: </strong>PayPal</p>
                            </div>
                            <div className="list-group-item">
                                <h2>Order Items</h2>
                                <div className="list-group list-group-flush">
                                    {
                                        cart.itemsList.map((item, index) => {
                                            return <div className="list-group-item">
                                                        <div className="row"><div className="col-md-1">
                                                            <img src={item.image} alt={item.name} className="img-fluid rounded" />
                                                        </div>
                                                            <div className="col">
                                                                <a href={"#/product/"+item.id}>{item.name}</a>
                                                            </div>
                                                            <div className="col-md-4">{item.qty} X ??{(item.price*(item.discount || 1)).toFixed(2)} = ??{(item.qty * item.price*(item.discount || 1)).toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" style={{padding: '0 .15rem'}}>
                        <div className="card">
                            <div className="list-group list-group-flush">
                                <div className="list-group-item">
                                    <h2>Order Summary</h2>
                                </div>
                                <div className="list-group-item">
                                    <div className="row"><div className="col">Items:</div>
                                <div className="col">??{cart.itemsPrice}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Shipping:</div>
                                        <div className="col">??{cart.yunfei}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Tax:</div>
                                        <div className="col">??{cart.Shui}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Total:</div>
                                        <div className="col">??{cart.totalPrice}</div>
                                    </div>
                                </div>
                                <div className="list-group-item"></div>
                                <div className="list-group-item">
                                    <button type="button" onClick={placeOrder} className="btn TextGreenBtn PayBtn">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''
            }

        </div>
    )
}

export default ShippingScreen
