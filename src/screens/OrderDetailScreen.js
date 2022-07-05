import React, { useState, useEffect } from 'react'
// import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
// import Loader from '../components/Loader'
import LoadSpinner from '../components/LoadSpinner'
import '../css/OrderDetailScreen.css'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'

function OrderDetailScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()
    

    const [sdkReady, setSdkReady] = useState(false)
    const orderInfo = useSelector(state => state.order)
    // const orderInfos = useSelector(state => state.orderInfos)
    const orderDetail = orderInfo && orderInfo.orderDetail ? orderInfo.orderDetail : {}
    const order = orderDetail && orderDetail.orderdetail && orderDetail.orderdetail[0] ? orderDetail.orderdetail[0] : {}
    const messageInfo = useSelector(state => state.message)
    // console.log(orderInfo, 999888);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const email = userInfo.email

    if (!orderInfo.loading && messageInfo.variant != 'error') {
        // order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
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


        if (!order || order.userorderid !== Number(orderId)) {

            dispatch(getOrderDetails(orderId))
        } else if (order.status==1) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order.userorderid, orderId])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    // const deliverHandler = () => {
    //     // dispatch(deliverOrder(order))
    // }

    return (
        <div className="OrderDetailScreen maxWidth">
            {messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>}

            {orderInfo && orderInfo.loading ? <div className="fullcreen"><LoadSpinner /></div> : ''}
            <div>
                <h1 >Order: {order.Id}</h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="list-group list-group-flush">
                            <div className="list-group-item">
                                <h2  >Shipping</h2>
                                {/* <p><strong>Name: </strong> 329958887@qq.com</p> */}
                                <p><strong>Email: </strong><a href={"mailto:" + email}>{email}</a></p>
                                {order && order.addressid ? <p><strong>Shipping: </strong>{order.addressid.country},  {order.addressid.county},  {order.addressid.city},  {order.addressid.gs},  {order.addressid.address}</p>
                                    :
                                    (
                                        orderDetail && orderDetail.pickingaddress&& orderDetail.pickingaddress[0] ?
                                        <p><strong>Picking Up: </strong> {orderDetail.pickingaddress[0].dizhi},{orderDetail.pickingaddress[0].dz1},{orderDetail.pickingaddress[0].dz2},{orderDetail.pickingaddress[0].dz3}</p>
                                        :
                                        <div role="alert" className="fade alert alert-warning show">Not Delivered</div>
                                    )
                                    
                                }


                            </div>
                            <div className="list-group-item">
                                <h2>Payment Method</h2>

                                <p><strong>Method: </strong>PayPal</p>
                                {
                                    order.status == 1 ? <div role="alert" className="fade alert alert-warning show">Not Paid</div> : <div role="alert" className="fade alert alert-success show">Paid Successfully</div>
                                }
                                {/* <div role="alert" className="fade alert alert-warning show">Not Paid</div> */}
                            </div>
                           
                                {
                                    orderDetail && orderDetail.productlist ?
                                        (
                                            <div class="list-group-item">
                                                <h2>Order Items</h2>
                                                <div class="list-group list-group-flush"> productlist
                                                    {
                                                        orderDetail.productlist.map((item, index) => {
                                                            return <div class="list-group-item">
                                                                <div class="row"><div class="col-md-1">
                                                                    <img style={{width: '100%', height: '100%'}} src={item.product.image} alt={item.product.name} class="img-fluid rounded" />
                                                                </div>
                                                                    <div class="col">
                                                                        <a  href={"#/product/" + item.product.id}>{item.product.name}</a>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div>{item.product.quantity} X £{item.product.price} = £{item.product.qty * item.product.price}</div>
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

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="list-group list-group-flush">
                                <div className="list-group-item"><h2>Order Summary</h2></div>
                                <div className="list-group-item"><div className="row"><div className="col">Items:</div><div className="col">£{order.price - order.shui}</div></div></div>
                                <div className="list-group-item"><div className="row"><div className="col">Shipping:</div><div className="col">£0.00</div></div></div>
                            <div className="list-group-item"><div className="row"><div className="col">Tax:</div><div className="col">£{order.shui}</div></div></div>
                            <div className="list-group-item"><div className="row"><div className="col">Total:</div><div className="col">£{order.price}</div></div></div>

                                {order.status == 1 && (
                                    <div className="list-group-item">
                                        {/* {loadingPay && <Loader />} */}

                                        {!sdkReady ? (
                                            // <Loader />
                                            <span></span>
                                        ) : (
                                                <PayPalButton
                                                    amount={order.price}
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

export default OrderDetailScreen
