import React, { useState, useEffect } from 'react'
import '../css/OrderScreen.css'
// getMyOrder
import { getMyOrder, deleteMyOrder } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Confirm from '../components/Confirm'
import LoadSpinner from '../components/LoadSpinner'
import { Swiper, SwiperSlide,useSwiperSlide } from 'swiper/react/swiper-react'
// 增加以下代码以使用"自动轮播"功能
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
SwiperCore.use([ Navigation, Autoplay]);
// import { messageUpdate } from '../actions/messageActions'
function OrderScreen({ history }) {
	const orderInfo = useSelector(state => state.order)
	const messageInfo = useSelector(state => state.message)
	// default=1, null=True, verbose_name='订单状态；0完成；1未付款；2已付款；3已发货')
	const [status, setStatus] = useState();
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [isDelete, setIsDelete] = useState(false);
	const [id, setId] = useState();
	
	const dispatch = useDispatch()
	console.log(orderInfo,789)
	useEffect(() => {
		dispatch(getMyOrder({
			pageIndex: pageIndex,
			pageSize: pageSize,
			status: status ===''?undefined:status
		}));
	}, [dispatch])
	const clickHandle = (s) => {
		return () => {
			setStatus(s);
			dispatch(getMyOrder({
				pageIndex: pageIndex,
				pageSize: pageSize,
				status: s
			}));
		}
	}
	const changeIndexHanle = (index) => {
		return () => {
			setPageIndex(index);
			dispatch(getMyOrder({
				pageIndex: pageIndex,
				pageSize: pageSize,
				status: status
			}));
		}
	}
	const deleteOrder = (userorderid) => {
		return () => {
			setId(userorderid);
			setIsDelete(true);
		
		}
	}
	const deleteOrderCon = () => {
		setIsDelete(false);
		dispatch(deleteMyOrder(id,pageIndex, pageSize, status));
	}
	const noFun = () => {
		setIsDelete(false);
	}
	const [indexObj,setIndexObj] = useState({
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0
	})
	const clickSwiperNav=(index, num)=> {
		return ()=>{
			console.log(index, num,888)
			if(num < 0) return;
			if(num>5) return;
			let obj = {...indexObj}
			obj[index] = num;
			// console.log(obj[0],7777);
			// console.dir(Swiper)
			setIndexObj(obj);
		}
	}
	return (
		<div className="right OrderScreen">
			{isDelete&&<Confirm okFun={deleteOrderCon} noFun={noFun}  tip="do you really want to delete this order?" />}
			{messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message> }
			{orderInfo && orderInfo.loading?<div className="fullcreen"><LoadSpinner /></div>: 
			<div>

			<div className="topName flex-center">
				<div className="welcome font-normal">My Orders</div>
			</div>
			<div className="detail">
				Here you could easily manage your past orders and billing.
					</div>
			<div className="flex-between selectItem">
				<form method="get" className="flex radio-wrap">
					<label className="labelItem">All Orders<input type="radio" name="cheakRadios" onChange={clickHandle()} checked={status===undefined} /></label>
					<label className="labelItem">Unpaid<input type="radio" name="cheakRadios" onChange={clickHandle(1)} checked={status===1}/></label>
					<label className="labelItem">Pending<input type="radio" name="cheakRadios" onChange={clickHandle(2)} checked={status===2}/></label>
					<label className="labelItem">Delivered<input type="radio" name="cheakRadios" onChange={clickHandle(3)} checked={status===3}/></label>
					<label className="labelItem">Completed<input type="radio" name="cheakRadios" onChange={clickHandle(0)} checked={status===4}/></label>
				</form>
			</div>
			<div className="main-wrap">
				<div className="paging-content">
					<ul className="pageItem paging1 active">
						<li  >


							<div className="basket-contents" >
								{/* <div className="title maxWidth">Your Basket</div> */}
								<div >
									
									{
										orderInfo&&orderInfo.orders&&orderInfo.orders.map((item, index) => {
											return <table  key={index}>
														<thead>
															<tr>
																<th></th>
																<th>Item</th>
																<th>Quantity</th>
																<th>Price</th>
																
																<th>Status</th>
																<th>Total</th>
																<th>Actions</th>
																
																
																
																
																
															</tr>
															<tr>
																<th colspan="7" >
																	<div className="basket-top-time">
																	<div>Date Ordered: {item.date_added} ● Order Number: {item.userorderid}</div>
																	<img src="./images/index/errs.png" className="err" onClick={deleteOrder(item.userorderid)} />
																	</div>
																</th>
															</tr>
														</thead>
														<tbody>
															{
																item.details.map((it, idx) => {
																	return <tr key={idx}>
																		<td><img src={it.product.image || it.product.image_new} className="box1" /></td>
																		<td>{it.product.name}</td>
																		<td>{it.item_count}</td>
																		<td>£{it.price}</td>
																		{idx==0?<td rowspan={item.details.length}>
																			{
																				item.addressid_id === null ? <div>
																					<div className="textGreen">To Pay and Deliver</div>
																					<div>{item.addressid.address}</div>
																					<div>{item.addressid.city}</div>
																					<div>{item.addressid.postcode}</div>
																				</div> : (item.status==1?'Unpaid':(item.status==2?'Pending':(item.status===3?'Delivered':(item.status===0?'Completed':''))))
																			}
																			
																		</td>:''}
																		{idx==0?<td rowspan={item.details.length} className="textGreen">£{item.price}</td>:''}
																		{idx==0?<td rowspan={item.details.length}>
																			{item.status === 1 ? <div className="payNow basket-btn">Pay Now</div> : ''}
																			{item.status == 0 ? <div className="basket-btn">Amend</div>: ''}
																			{item.status !== 1  ? <div className="basket-btn">Download invoice</div>: ''}
																			
																		</td>:''}
																	</tr>
																})
															}
														</tbody>
													</table>
		
										})
									}
									
								</div>
							</div>
							{
								orderInfo&&orderInfo.orders.map((item,index) => {
									return  <div
									className="orderDetail"

								>
									<div className="basket-formTwo-footer"
										>
										<div>
											Date Ordered: {item.date_added} ● Order Number: {item.userorderid}
										</div>
										<img src="./images/index/errs.png"
											className="err" onClick={deleteOrder(item.userorderid)} />
									</div>
									<div className="basket-formTwo-title">
										<img onClick={clickSwiperNav(index, (indexObj[index] || 0)-1)} className={'swiper-pre'+index} src="./images/index/left-l.png" />
										<div className={'dot ' + (indexObj[index]==0 || !indexObj[index]?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[index]==1?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[index]==2?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[index]==3?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[index]==4?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[index]==5?'active':'')}  ></div>
										<img className={'swiper-next'+index} onClick={clickSwiperNav(index, (indexObj[index] || 0)+1)} src="./images/index/right-l.png" />
									</div>
									{/* <div className="basket-swiper-container">
										<div className="swiper-wrapper"> */}
										<Swiper
									
											direction={'horizontal'}
											navigation={{
												nextEl: '.swiper-next'+index,
												prevEl: '.swiper-pre'+index,
												disabledClass: 'disable'
											}}
										>
											<SwiperSlide>
												{
													item.details.map((it, idx)=>{
														return <div>
															{idx==0?<div className="basket-formTwo-name"> Item</div>:''}
															
															<div className="basket-formTwo-content">
																<div className="flex">
																<img src={it.product.image || it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																		<div>{it.product.name}</div>
																	</div>
																</div>
															</div>
														
														</div>
													})
												}
											</SwiperSlide>
											<SwiperSlide>
												{
													item.details.map((it, idx)=>{
														return <div>
															
															{idx==0?<div className="basket-formTwo-name"> Quantity </div>:''}
															<div className="basket-formTwo-content">
																<div className="flex">
																<img src={it.product.image || it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																		<div>{it.item_count}</div>
																	</div>
																</div>
															</div>
														
														
														</div>
													})		
												}
											</SwiperSlide>
											<SwiperSlide>
											{
													item.details.map((it, idx)=>{
														return <div>
															{idx==0?<div className="basket-formTwo-name">
																Price
															</div>:''}
															
															<div className="basket-formTwo-content">
																<div className="flex">
																<img src={it.product.image || it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																		<div>£{it.price}</div>
																	</div>
																</div>
															</div>
											
														</div>
													})
											}
											</SwiperSlide>
											<SwiperSlide>
												{
													item.details.map((it, idx) => {
														return <div>
															
														{idx==0?<div className="basket-formTwo-name">Status</div>:''}
														<div className="basket-formTwo-content">
															<div className="flex">
															<img src={it.product.image || it.product.image_new} className="basket-goods-img" />
																<div className="flex"></div>
																<div className="basket-goods-desc">
																	{
																		item.addressid_id === null ? <div>
																		<div className="textGreen">To Pay and Deliver</div>
																		<div>{item.addressid.address}</div>
																		<div>{item.addressid.city}</div>
																		<div>{item.addressid.postcode}</div>
																	</div> : (item.status==1?'Unpaid':(item.status==2?'Pending':(item.status===3?'Delivered':(item.status===0?'Completed':''))))
																	}
																	
																</div>
															</div>
														</div>
													
														</div>
													})
												}
											</SwiperSlide>
											<SwiperSlide>
											{
													item.details.map((it, idx) => {
														return <div >
															
																
																{idx==0?<div className="basket-formTwo-name">
																Total
																</div>:''}
																<div className="basket-formTwo-content">
																	<div className="flex">
																		<img src={it.product.image || it.product.image_new} className="basket-goods-img" />
																		<div className="flex"></div>
																		<div className="basket-goods-desc"> div>£{item.price}</div>
																		
																	</div>
																</div>
															
															
															</div>
													})
												}
											</SwiperSlide>
											<SwiperSlide>
												{
													item.details.map((it, idx) => {
														return <div>
															
														{idx==0?<div className="basket-formTwo-name">
													Actions
														</div>:''}
												<div className="basket-formTwo-content">
													<div className="flex">
													<img src={it.product.image || it.product.image_new} className="basket-goods-img" />
														<div className="flex"></div>
														<div className="basket-goods-desc">
															{item.status === 1 ? <div className="payNow basket-btn">Pay Now</div> : ''}
															{item.status == 0 ? <div className="basket-btn">Amend</div>: ''}
															{item.status !== 1  ? <div className="basket-btn">Download invoice</div>: ''}
														</div>
													</div>
												</div>
											
														</div>
													})
												}
											</SwiperSlide>
										{/* </div>
									</div> */}
									
								{/* </div> */}
							
									</Swiper>
									</div>
								})
							}



						</li>
					</ul>
					
				</div>
				{/* <div className="result-text result-text-mb">Results: 1 - 4 of 20</div> */}
				{
					orderInfo.pageArr&&orderInfo.pageArr.length>0?	<div className="paging flex">
					<div className="result-text result-text-pc">Results: {pageIndex} - {pageIndex} of {orderInfo.pageArr&&orderInfo.pageArr.length || 0}</div>
		<span className="prev" onClick={pageIndex>1?changeIndexHanle(pageIndex-1):()=>{}}></span>
		<div className="page-btn">
			
			<ul className="btn-list">
				{/* <li className="active">1</li> */}
				
				{
					orderInfo.pageArr&&orderInfo.pageArr.map(item=>{
					return <li onClick={changeIndexHanle(item)} className={item == pageIndex?'active':''} key={item}>{item}</li>
					})
				}
			</ul>
		</div>
		<span className="next" onClick={pageIndex<orderInfo.total?changeIndexHanle(pageIndex+1):()=>{}}></span>
	</div>
:''
				}
			</div>
			<div class="pageTest"></div>
			</div> }
			
		</div>
	)
}

export default OrderScreen
