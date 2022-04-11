import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import '../css/CartScreen.css'
import Confirm from '../components/Confirm'
function CartScreen({ match, location, history }) {
   const [isLogin, setIslogin] = useState(false);
   
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo } = userLogin
    
    const cart = useSelector(state => state.cart)
    // const { itemsList } = cart
// console.log(cart.itemsList, 99991)
    useEffect(() => {
        
    }, [dispatch])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    const Checkout = () => {
        if (userInfo) {
			history.push('/selAddress')
		}else {
            // Please log into your account or choose guest checkout
            // history.push('/login?redirect=/cart')
            setIslogin(true);
        }
    }
    const toLogin = () => {
        setIslogin(false);
        history.push('/login?redirect=/cart');
    }
    return (
        <div className="CartScreen ">
            {isLogin&&<Confirm okFun={toLogin}   tip="Please log into your account or choose guest checkout." />}
            <div className="maxWidth">
				<div className="basket-contents">
					<div className="title maxWidth">Your Basket</div>
					<div className="basket-form maxWidth">
						<div className="flex-center basket-top">
							<div>Total</div>
							<div>Quantity</div>
							<div>Price</div>
							<div>Offer</div>
							<div>Colour</div>
							<div>Product</div>
						</div>
						{
                            cart&&cart.itemsList&&cart.itemsList.map((item, index) => {
                                return (
                                    <div className="basket-content">
							<div className="flex-between basket-content-item">
								<img src={item.image} style={{width: '1rem', height: '1rem',marginRight: '5%'}} />
								<div className="flex-between" style={{alignItems: 'center', flex: 1}}>
									<div>
                                    <div>{item.name}</div>
                                    {/* <div>{item.qty}</div> */}
									</div>
                                    <div>{item.color}</div>
                                    <div>{item.combo}</div>
                                    <div>£{item.price * item.qty}</div>
									<div className="flex-center" style={{margin: '0 1%'}}>
										<div style={{marginRight: '0.06rem'}}>{item.qty}</div>
										<div className="flex-center" style={{flexDirection: 'column'}}>
											<a href="javascript:void(0);"><img src="./images/index/up1.png" style={{width: '0.2rem', height: '0.2rem'}} /></a>
											<a href="javascript:void(0);"><img src="./images/index/down2.png" style={{width: '0.2rem', height: '0.2rem'}} /></a>
										</div>
									</div>
									<div className="basket-money">£{item.price * item.qty}</div>
									<a href="javascript:void(0);"><img src="./images/index/err.png" style={{width: '0.2rem', height: '0.2rem'}} /></a>
								</div>
							</div>
						</div>
						
                                )
                            })
                        }
                        <div className="basket-foot flex-center">
                    <div style={{fontSize: '0.1rem'}}>£{cart.totalPrice}</div>
							<div style={{marginRight: '8%'}}>Items: {cart.cartItems} ● Totak</div>
						</div>
					</div>
					<div className="basket-formTwo maxWidth">
						<div className="basket-formTwo-title">
							<img className="swiper-pre" src="./images/index/left-l.png" />
							<div className="dot active"></div>
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
							<img className="swiper-next" src="./images/index/right-l.png" />
						</div>
						<div className="basket-swiper-container">
							<div className="swiper-wrapper">
								<div className="swiper-slide">
									<div className="basket-formTwo-name">
										Product
									</div>
									<div className="basket-formTwo-content">
										<div className="flex">
											<img src="./images/index/box1.png" className="basket-goods-img" />
											<div style={{flex: 1}}></div>
											<div className="basket-goods-desc">
												<div>Product Name Here</div>
												<div>0</div>
											</div>
										</div>
									</div>
								</div>
								<div className="swiper-slide">
									<div className="basket-formTwo-name">
										Colour
									</div>
									<div className="basket-formTwo-content">
										<div className="flex">
											<img src="./images/index/box1.png" className="basket-goods-img" />
											<div style={{flex: 1}}></div>
											<div className="basket-goods-desc">
												<div>Green</div>
											</div>
										</div>
									</div>
								</div>
								<div className="swiper-slide">
									<div className="basket-formTwo-name">
										Offer
									</div>
									<div className="basket-formTwo-content">
										<div className="flex">
											<img src="./images/index/box1.png" className="basket-goods-img" />
											<div style={{flex: 1}}></div>
											<div className="basket-goods-desc">
												<div>Combo</div>
											</div>
										</div>
									</div>
								</div>
								<div className="swiper-slide">
									<div className="basket-formTwo-name">
										Price
									</div>
									<div className="basket-formTwo-content">
										<div className="flex">
											<img src="./images/index/box1.png" className="basket-goods-img" />
											<div style={{flex: 1}}></div>
											<div className="basket-goods-desc">
												<div>£00.00</div>
											</div>
										</div>
									</div>
								</div>
								<div className="swiper-slide">
									<div className="basket-formTwo-name">
										Quality
									</div>
									<div className="basket-formTwo-content">
										<div className="flex">
											<img src="./images/index/box1.png" className="basket-goods-img" />
											<div style={{flex: 1}}></div>
											<div className="basket-goods-desc flex">
												<div style={{marginRight: '0.2re'}}>1</div>
												<div className="flex" style={{flexDirection: 'column'}}>
													<a href="javascript:void(0);"><img src="./images/index/up1.png" style={{width: '0.2rem', height: '0.2rem'}} /></a>
													<a href="javascript:void(0);"><img src="./images/index/down2.png" style={{width: '0.2rem', height: '0.2rem'}} /></a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="swiper-slide">
									<div className="basket-formTwo-name">
										Total
									</div>
									<div className="basket-formTwo-content">
										<div className="flex">
											<img src="./images/index/box1.png" className="basket-goods-img" />
											<div style={{flex: 1}}></div>
											<div className="basket-goods-desc">
												<div>£00.00</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="basket-formTwo-footer">
							<div>Items: 1 ● Total:</div>
							<div>£00.00</div>
						</div>
					</div>
				</div>
			</div>
			<div className="cont">
				<div className="maxWidth" style={{position: 'relative'}}  >
					<div className="flex-center secction">
						<div className="left">
						</div>
						<div className="right">
							<div className="jixu"  style={{'margin-top': '0.01rem;'}} onClick={Checkout}>Continue to Checkout</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    )
}

export default CartScreen