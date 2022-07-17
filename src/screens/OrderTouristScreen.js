import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
// import Loader from '../components/Loader'
import LoadSpinner from '../components/LoadSpinner'
import { getOrderDetails, payOrder, deliverOrder, youkeOrder } from '../actions/orderActions'
import {CART_CLEAR_ITEMS} from '../constants/cartConstants'
function OrderTouristScreen({ match, history }) {
   
    const dispatch = useDispatch()

    const [isPay, setIsPay] = useState(false)
    
    const [sdkReady, setSdkReady] = useState(false)
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    console.log(match.url==='/zitiquhuo/tourist', 888)
    const orderInfo = useSelector(state => state.order)
    const itemsPrice = cart.itemsList.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    // cart.yunfei = (cart.itemsPrice > 10 ? 0 : 1.5).toFixed(2)
    const yunfei = 0;
    const Shui = Number( itemsPrice - ( itemsPrice / 1.2)).toFixed(2)

    const totalPrice = (Number(itemsPrice) + Number(yunfei) + Number(Shui)).toFixed(2)
    const [cartCopy] = useState(JSON.parse(JSON.stringify(cart)))
    // console.log(cartCopy, 999);
    const messageInfo = useSelector(state => state.message)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const youkePay = ()=>{
        let get_way =  match.url==='/zitiquhuo/tourist'?'自提取货': '送货上门'
        let param = {
            get_way: get_way,
            TotalPrices: itemsPrice,
            Yunfei: yunfei,
            Amount: totalPrice,
            Shui: Shui,
            Items: cart.cartItems,
            ItemsJson: cart.itemsList,
            receiver: '',
            phone: '',
            email: shippingAddress.email,
            company: '',
            nation: '',
            province: '',
            city: '',
            postcode: '',
            addinfo: ''
        }
        if(match.url!=='/zitiquhuo/tourist'){
            param= {
                ...param,
                receiver: shippingAddress.uname,
                phone: shippingAddress.phone,
                // email: shippingAddress.email,
                company: shippingAddress.gs,
                nation: shippingAddress.country,
                province: shippingAddress.county,
                city: shippingAddress.city,
                postcode: shippingAddress.postcode,
                addinfo: shippingAddress.address
            }
        }
        dispatch(youkeOrder(param, (data)=>{
            setIsPay(true)
            dispatch({ type: CART_CLEAR_ITEMS })
        }))

    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
       if (!isPay) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, isPay])


    const successPaymentHandler = (paymentResult) => {
        youkePay();
    }

 

    return (
        <div className="OrderDetailScreen maxWidth">
            {messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>}

            {orderInfo && orderInfo.loading ? <div className="fullcreen"><LoadSpinner /></div> : ''}
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="list-group list-group-flush">
                            <div className="list-group-item">
                                <h2 >Shipping</h2>
                                {/* <p><strong>Name: </strong> 329958887@qq.com</p> */}
                                <p><strong>Email: </strong><a href={"mailto:" + shippingAddress.email}>{shippingAddress.email}</a></p>
                                {shippingAddress ? (
                                        match.url==='/zitiquhuo/tourist'  ? 
                                            <p><strong>Picking Up: </strong> {shippingAddress.dizhi},{shippingAddress.dz1},{shippingAddress.dz2},{shippingAddress.dz3}</p>
                                            :
                                            <p><strong>Shipping: </strong>{shippingAddress.country},  {shippingAddress.county},  {shippingAddress.city},  {shippingAddress.gs},  {shippingAddress.address}</p>
                                    ) : <div role="alert" className="fade alert alert-warning show">Not Delivered</div>
                                }
                               

                            </div>
                            <div className="list-group-item">
                                <h2>Payment Method</h2>

                                <p><strong>Method: </strong>PayPal</p>
                                {
                                    !isPay ? <div role="alert" className="fade alert alert-warning show">Not Paid</div> : <div role="alert" className="fade alert alert-success show">Paid Successfilly</div>
                                }
                                {/* <div role="alert" className="fade alert alert-warning show">Not Paid</div> */}
                            </div>
                            {/* <div className="list-group-item">
                                <h2>Order Items</h2> */}
                                {
                                    cartCopy && cartCopy.itemsList && cartCopy.itemsList.length>0?
                                        (
                                            <div className="list-group-item">
                                                <h2>Order Items</h2>
                                                <div className="list-group list-group-flush">
                                                    {
                                                        cartCopy.itemsList.map((item, index) => {
                                                            return <div className="list-group-item">
                                                                <div className="row"><div className="col-md-1">
                                                                    <img style={{width: '100%', height: '100%'}} src={item.image} alt={item.name} className="img-fluid rounded" />
                                                                </div>
                                                                    <div className="col">
                                                                        <a  href={"#/product/" + item.id}>{item.name}</a>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div>{item.qty} X £{item.price} = £{item.qty * item.price}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>

                                        )
                                        :
                                        <div role="alert" className="fade alert alert-info show">Order is empty</div>
                                }

                            {/* </div> */}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="list-group list-group-flush">
                                <div className="list-group-item"><h2>Order Summary</h2></div>
                                <div className="list-group-item"><div className="row"><div className="col">Items:</div><div className="col">£{cartCopy.itemsPrice}</div></div></div>
                                <div className="list-group-item"><div className="row"><div className="col">Shipping:</div><div className="col">£0.00</div></div></div>
                            <div className="list-group-item"><div className="row"><div className="col">Tax:</div><div className="col">£{cartCopy.Shui}</div></div></div>
                            <div className="list-group-item"><div className="row"><div className="col">Total:</div><div className="col">£{cartCopy.totalPrice}</div></div></div>

                                {!isPay && (
                                    <div className="list-group-item">
                                        {/* {loadingPay && <Loader />} */}

                                        {!sdkReady ? (
                                            // <Loader />
                                            <span></span>
                                        ) : (
                                                <PayPalButton
                                                    amount={totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                    </div>
                                )}
                                {/* {loadingDeliver && <Loader />} */}
                                {/* {userInfo && userInfo.isAdmin && order.status == 2  && (
                                    <div className="list-group-item">
                                        <button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                    </button>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
       
    )
}

export default OrderTouristScreen
