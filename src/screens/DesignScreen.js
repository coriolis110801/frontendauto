import React, { useState, useEffect } from 'react'
import '../css/DesignScreen.css'
import { getMyDesign, deleteMyDesign } from '../actions/designActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import LoadSpinner from '../components/LoadSpinner'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
// 增加以下代码以使用"自动轮播"功能
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
SwiperCore.use([ Navigation, Autoplay]);
function DesignScreen({ history }) {
	const designInfo = useSelector(state => state.designInfo)
	const messageInfo = useSelector(state => state.message)
	const dispatch = useDispatch()
	console.log(designInfo,789)
	const [pageIndex, setPageIndex] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [isDelete, setIsDelete] = useState(false);
	const [id, setId] = useState();
	useEffect(() => {
		dispatch(getMyDesign({
			pageIndex: 1,
			pageSize: 5
		}));
	}, [dispatch])
	const changeIndexHanle = (index) => {
		return () => {
			setPageIndex(index);
			dispatch(getMyDesign({
				pageIndex: pageIndex,
				pageSize: pageSize
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
		dispatch(deleteMyDesign(id,pageIndex, pageSize));
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
			if(num>3) return;
			let obj = {...indexObj}
			obj[index] = num;
			// console.log(obj[0],7777);
			// console.dir(Swiper)
			setIndexObj(obj);
		}
	}
	return (
		<div className="right DesignScreen">
			{messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message> }
			{designInfo && designInfo.loading&& <div className="fullcreen"><LoadSpinner /></div> }
			<div className="topName flex-center">
				<div className="welcome">My Designs</div>
			</div>
			<div className="flex-between createUl">
				<div className="detail">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.Duis nonlacinia turpis. Nunc
					pretium lacinia dolor aciaculis. Nullam ut viverra ve lit. N unc pretium laciniadolor ac
					iaculis. Nullam ut viverra velit.
							</div>
				<div className="create">Create A New Design</div>
			</div>
			<div className="main-wrap">
				<div className="paging-content">
					<ul className="pageItem paging1 active">
						<li  >


							<div className="basket-contents" >
								{/* <div className="title maxWidth">Your Basket</div> */}
								<div >
									
									
											<table  >
														<thead>
															<tr>
																<th>Artwork</th>
																<th className="orderID">Order ID</th>
																<th>Name</th>
																<th>Date Created</th>
																
																<th>Actions</th>
															</tr>
															
														</thead>
														<tbody>
															{
																designInfo&&designInfo.designs&&designInfo.designs.map((item, index) => {
																	return <tr>
																		<td>
																		<img src={item.product.image || item.product.image_new} className="goods-img-l" />
																		</td>
																		<td >{item.id}</td>
																		<td><div className="flex">
																			<input placeholder="Design Name" value={item.name} className="inputName" />
																			<div className="edit-btn">edit</div>
																		</div></td>
																		<td>{item.date_created}</td>
																		<td>
																			<div className="basket-btn PayOrder">Pay-Order</div>
																			<div className="basket-btn">Remove</div>
																		</td>
																	</tr>
																})
															}
														</tbody>
													</table>
		
									
									
								</div>
							</div>
							 <div
									className="orderDetail"

								>
									
									<div className="basket-formTwo-title">
										<img onClick={clickSwiperNav(0, (indexObj[0] || 0)-1)} className={'swiper-pre'} src="./images/index/left-l.png" />
										<div className={'dot ' + (indexObj[0]==0 || !indexObj[0]?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[0]==1?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[0]==2?'active':'')}  ></div>
										<div className={'dot ' + (indexObj[0]==3?'active':'')}  ></div>
										<img className={'swiper-next'} onClick={clickSwiperNav(0, (indexObj[0] || 0)+1)} src="./images/index/right-l.png" />
									</div>
									
										<Swiper
									
											direction={'horizontal'}
											navigation={{
												nextEl: '.swiper-next',
												prevEl: '.swiper-pre',
												disabledClass: 'disable'
											}}
										 >
											<SwiperSlide>
												{
													designInfo.designs.map((it, idx)=>{
														return <div>
															{idx==0?<div className="basket-formTwo-name">
																<span>Artwork</span> 
																<span>Order ID</span>
															</div>:''}
															
															<div className="basket-formTwo-content">
																<div className="flex">
																<img src={it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																		<div>{it.id}</div>
																	</div>
																</div>
															</div>
														
														</div>
													})
												}
											</SwiperSlide>
											<SwiperSlide>
												{
													designInfo.designs.map((it, idx)=>{
														return <div>
															
															{idx==0?<div className="basket-formTwo-name"> 
																<span>Artwork</span> 
																<span>Name</span>
															 </div>:''}
															<div className="basket-formTwo-content">
																<div className="flex">
																<img src={it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																		<div>{it.name}</div>
																	</div>
																</div>
															</div>
														
														
														</div>
													})		
												}
											</SwiperSlide>
											<SwiperSlide>
											{
													designInfo.designs.map((it, idx)=>{
														return <div>
															{idx==0?<div className="basket-formTwo-name">
																
																<span>Artwork</span> 
																<span>Date Created</span>
															</div>:''}
															
															<div className="basket-formTwo-content">
																<div className="flex">
																<img src={it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																		<div>{it.date_created}</div>
																	</div>
																</div>
															</div>
											
														</div>
													})
											}
											</SwiperSlide>
											<SwiperSlide>
											{
													designInfo.designs.map((it, idx)=>{
														return <div>
															{idx==0?<div className="basket-formTwo-name">
																
																<span>Artwork</span> 
																<span>Actions</span>
															</div>:''}
															
															<div className="basket-formTwo-content flex">
															<img src={it.product.image_new} className="basket-goods-img" />
																	<div className="flex"></div>
																	<div className="basket-goods-desc">
																	<div className="basket-btn PayOrder">Pay-Order</div>
																			<div className="basket-btn">Remove</div>
																	</div>
															
															</div>
											
														</div>
													})
											}
											</SwiperSlide>
									
											
								{/* </div> */}
							
									</Swiper>
									</div>
							



						</li>
					</ul>
					
				</div>
				{/* <div className="result-text result-text-mb">Results: 1 - 4 of 20</div> */}
				{
					designInfo.pageArr&&designInfo.pageArr.length>0?	<div className="paging flex">
					<div className="result-text result-text-pc">Results: {pageIndex} - {pageIndex} of {designInfo.pageArr&&designInfo.pageArr.length || 0}</div>
		<span className="prev" onClick={pageIndex>1?changeIndexHanle(pageIndex-1):()=>{}}></span>
		<div className="page-btn">
			
			<ul className="btn-list">
				{/* <li className="active">1</li> */}
				
				{
					designInfo.pageArr&&designInfo.pageArr.map(item=>{
					return <li onClick={changeIndexHanle(item)} className={item == pageIndex?'active':''} key={item}>{item}</li>
					})
				}
			</ul>
		</div>
		<span className="next" onClick={pageIndex<designInfo.total?changeIndexHanle(pageIndex+1):()=>{}}></span>
	</div>
:''
				}
				<div className="pageTest"></div>
			</div>
			
		</div>
	)
}

export default DesignScreen
