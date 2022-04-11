import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import '../css/ShippingScreen.css'
function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [tab, setTab] = useState(1)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }
    const next = () => {
        setTab(2);
    }
    return (
        <div className="ShippingScreen">
            <div className="nav">
                <span className={tab >= 1 ? 'active' : ''}>Payment</span>
                <span className={tab >= 2 ? 'active' : ''}>Place Order</span>
            </div>
            {
                tab == 1 ? (<form class="">
                    <div class="form-group">
                        <legend class="form-label">Select Method</legend>
                        <div class="col">
                            <div class="form-check">
                                <input name="paymentMethod" type="radio" id="paypal" class="form-check-input" checked />
                                <label title="" for="paypal" class="form-check-label">PayPal or Credit Card</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn TextGreenBtn" onClick={next}>Continue</button>
                </form>) : ''
            }
            {
                tab == 2 ? <div class="row PayOrder">
                    <div class="col-md-8">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item">
                                <h2>Shipping</h2>
                                <p><strong>Shipping: </strong>1,  2  3,  4</p>
                            </div>
                            <div class="list-group-item">
                                <h2>Payment Method</h2>
                                <p><strong>Method: </strong>PayPal</p>
                            </div>
                            <div class="list-group-item">
                                <h2>Order Items</h2>
                                <div class="list-group list-group-flush">
                                    <div class="list-group-item">
                                        <div class="row"><div class="col-md-1">
                                            <img src="https://aromaroads.s3.amazonaws.com/x%E6%96%B0.jpeg" alt="Aroma Roads Air Diffuser" class="img-fluid rounded" />
                                        </div>
                                            <div class="col">
                                                <a href="#/product/13">Aroma Roads Air Diffuser</a>
                                            </div>
                                            <div class="col-md-4">1 X £8.55 = £8.55</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" style={{padding: '0 .15rem'}}>
                        <div class="card">
                            <div class="list-group list-group-flush">
                                <div class="list-group-item">
                                    <h2>Order Summary</h2>
                                </div>
                                <div class="list-group-item">
                                    <div class="row"><div class="col">Items:</div>
                                        <div class="col">£8.55</div>
                                    </div>
                                </div>
                                <div class="list-group-item">
                                    <div class="row">
                                        <div class="col">Shipping:</div>
                                        <div class="col">£1.50</div>
                                    </div>
                                </div>
                                <div class="list-group-item">
                                    <div class="row">
                                        <div class="col">Tax:</div>
                                        <div class="col">£0.00</div>
                                    </div>
                                </div>
                                <div class="list-group-item">
                                    <div class="row">
                                        <div class="col">Total:</div>
                                        <div class="col">£10.05</div>
                                    </div>
                                </div>
                                <div class="list-group-item"></div>
                                <div class="list-group-item">
                                    <button type="button" class="btn TextGreenBtn PayBtn">Place Order</button>
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
