import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import '../css/CartScreen.css'
import Confirm from '../components/Confirm'
import { CART_REQUEST_DATA } from '../constants/cartConstants'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, { Navigation,Pagination } from 'swiper';
SwiperCore.use([Navigation,Pagination]);
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


	const removeFromCartHandler = (index) => {
		return () => {
			dispatch(removeFromCart(index))
		}
	}

	// const checkoutHandler = () => {
	//     history.push('/login?redirect=shipping')
	// }
	const changeNum = (index, num) => {
		return () => {
			let arr = [...cart.itemsList]
			if (arr[index]) {
				arr[index].qty = (arr[index].qty || 0) * 1 + num;
				dispatch({
					type: CART_REQUEST_DATA,
					payload: {
						itemsList: cart.itemsList,
						cartItems: cart.itemsList.reduce((pre, now) => {
							return pre + now.qty
						}, 0),

						totalPrice: cart.itemsList.reduce((pre, now) => {
							return (pre + now.qty * now.price * (now.discount || 1)).toFixed(2)
						}, 0)
					},
				})
			}
		}
	}
	const Checkout = () => {
		if (!cart || !cart.itemsList || cart.itemsList.length == 0) {
			return;
		}
		if (userInfo) {
			history.push('/selAddress')
		} else {
			// Please log into your account or choose guest checkout
			// history.push('/login?redirect=/cart')
			setIslogin(true);
		}
	}
	const toLogin = () => {
		setIslogin(false);
		history.push('/login?redirect=/cart');
	}
	const pagination = {
	"clickable": true,
	"renderBullet": function (index, className) {
			return '<span class=\"' + className + '\"><span class="user-defined"></span></span>';
			}
	}
	return (
		<div className="CartScreen ">
			{isLogin && <Confirm okFun={toLogin} tip="Please log into your account or choose guest checkout." />}
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
							cart && cart.itemsList && cart.itemsList.map((item, index) => {
								return (
									<div className="basket-content">
										<div className="flex-between basket-content-item">
											<img src={item.image} style={{ width: '1rem', height: '1rem', marginRight: '5%' }} />
											<div className="flex-between" style={{ alignItems: 'center', flex: 1 }}>
												<div>
													<div>{item.name}</div>
													{/* <div>{item.qty}</div> */}
												</div>
												<div>{item.color}</div>
												<div>{item.combo}</div>
												<div>??{(item.price * (item.discount || 1)).toFixed(2)}</div>
												<div className="flex-center" style={{ margin: '0 1%' }}>
													<div style={{ marginRight: '0.06rem' }}>{item.qty}</div>
													<div className="flex-center" style={{ flexDirection: 'column' }}>
														<a href="javascript:void(0);" onClick={changeNum(index, 1)}><img src="./images/index/up1.png" style={{ width: '0.2rem', height: '0.2rem' }} /></a>
														<a href="javascript:void(0);" onClick={changeNum(index, -1)}><img src="./images/index/down2.png" style={{ width: '0.2rem', height: '0.2rem' }} /></a>
													</div>
												</div>
												<div className="basket-money">??{(item.price * (item.discount || 1) * item.qty).toFixed(2)}</div>
												<a href="javascript:void(0);" onClick={removeFromCartHandler(index)}><img src="./images/index/err.png" style={{ width: '0.2rem', height: '0.2rem' }} /></a>
											</div>
										</div>
									</div>

								)
							})
						}
						<div className="basket-foot flex-center">
							<div style={{ fontSize: '0.1rem' }}>??{cart.totalPrice}</div>
							<div style={{ marginRight: '8%' }}>Items: {cart.cartItems} ??? Totak</div>
						</div>
					</div>
					<div className="basket-formTwo maxWidth">
						
						<div className="basket-swiper-container">
							<div className="basket-formTwo-title">
								<img className="swiper-pre" src="./images/index/left-l.png" />
								<div ></div>
								<div ></div>
								<div ></div>
								<div ></div>
								<div ></div>
								<div ></div>
								<img className="swiper-next" src="./images/index/right-l.png" />
							</div>
							<Swiper

								direction={'horizontal'}
								loop={true}
								slidesPerView={1}
								spaceBetween="-3%"
								navigation={{
									nextEl: '.swiper-next',
									prevEl: '.swiper-pre',
									disabledClass: 'disable'
								}}
								pagination={pagination}
							>
								<SwiperSlide className="swiper-slide">
									<div>
										<div className="basket-formTwo-name">
											Product</div>
										<div className="basket-formTwo-content">
											{
												cart && cart.itemsList && cart.itemsList.map((item, index) => {
													return <div className="flex" key={index}>
														<img src={item.image} className="basket-goods-img" />
														<div style={{ flex: 1 }}></div>
														<div className="basket-goods-desc">
															<div>{item.name}</div>
															<div>??{(item.price * (item.discount || 1) * item.qty).toFixed(2)}</div>
														</div>
													</div>
												})
											}

										</div>

									</div>
								</SwiperSlide>
								<SwiperSlide className="swiper-slide">
									<div >
										<div className="basket-formTwo-name">
											Colour
										</div>
										<div className="basket-formTwo-content">
											{
												cart && cart.itemsList && cart.itemsList.map((item, index) => {
													return <div className="basket-formTwo-content">
															<div className="flex">
																<img src={item.image} className="basket-goods-img" />
																<div style={{ flex: 1 }}></div>
																<div className="basket-goods-desc">
																<div>{item.color}</div>
																</div>
															</div>
														</div>
												})
											}

										</div>
									</div>
								</SwiperSlide>		
								<SwiperSlide className="swiper-slide">
									<div >
										<div className="basket-formTwo-name">
										Offer
										</div>
										<div className="basket-formTwo-content">
											{
												cart && cart.itemsList && cart.itemsList.map((item, index) => {
													return <div className="basket-formTwo-content">
															<div className="flex">
																<img src={item.image} className="basket-goods-img" />
																<div style={{ flex: 1 }}></div>
																<div className="basket-goods-desc">
																<div>{item.combo}</div>
																</div>
															</div>
														</div>
												})
											}

										</div>
									</div>
								</SwiperSlide>		
							    <SwiperSlide className="swiper-slide">
									<div >
										<div className="basket-formTwo-name">
										Price
										</div>
										<div className="basket-formTwo-content">
											{
												cart && cart.itemsList && cart.itemsList.map((item, index) => {
													return <div className="basket-formTwo-content">
															<div className="flex">
																<img src={item.image} className="basket-goods-img" />
																<div style={{ flex: 1 }}></div>
																<div className="basket-goods-desc">
																<div>??{(item.price * (item.discount || 1)).toFixed(2)}</div>
																</div>
															</div>
														</div>
												})
											}

										</div>
									</div>
								</SwiperSlide>		
								<SwiperSlide className="swiper-slide">
									<div >
										<div className="basket-formTwo-name">
										Quality
										</div>
										<div className="basket-formTwo-content">
											{
												cart && cart.itemsList && cart.itemsList.map((item, index) => {
													return <div className="basket-formTwo-content">
															<div className="flex">
																<img src={item.image} className="basket-goods-img" />
																<div style={{ flex: 1 }}></div>
																<div className="basket-goods-desc">
																<div className="flex-center" style={{ margin: '0 1%' }}>
																	<div style={{ marginRight: '0.06rem' }}>{item.qty}</div>
																	<div className="flex-center" style={{ flexDirection: 'column' }}>
																		<a href="javascript:void(0);" onClick={changeNum(index, 1)}><img src="./images/index/up1.png" style={{ width: '0.2rem', height: '0.2rem' }} /></a>
																		<a href="javascript:void(0);" onClick={changeNum(index, -1)}><img src="./images/index/down2.png" style={{ width: '0.2rem', height: '0.2rem' }} /></a>
																	</div>
																</div>
																</div>
															</div>
														</div>
												})
											}

										</div>
									</div>
								</SwiperSlide>		
								<SwiperSlide className="swiper-slide">
									<div >
										<div className="basket-formTwo-name">
										Total
										</div>
										<div className="basket-formTwo-content">
											{
												cart && cart.itemsList && cart.itemsList.map((item, index) => {
													return <div className="basket-formTwo-content">
															<div className="flex">
																<img src={item.image} className="basket-goods-img" />
																<div style={{ flex: 1 }}></div>
																<div className="basket-goods-desc">
																<div>??{(item.price * (item.discount || 1) * item.qty).toFixed(2)}</div>
																</div>
															</div>
														</div>
												})
											}

										</div>
									</div>
								</SwiperSlide>		
							
							</Swiper>

						</div>

						<div className="basket-formTwo-footer">
							<div>Items: cart.cartItems ??? Total:</div>
							<div>??{cart.totalPrice}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="cont">
				<div className="maxWidth" style={{ position: 'relative' }}  >
					<div className="flex-center secction">
						<div className="left">
						</div>
						<div className="right">
							<div className={!cart || !cart.itemsList || cart.itemsList.length == 0 ? 'jixu disabled' : 'jixu'} style={{ 'margin-top': '0.01rem;' }} onClick={Checkout}>Continue to Checkout</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartScreen