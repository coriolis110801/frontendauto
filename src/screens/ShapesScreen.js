import React, { useState, useEffect } from 'react'
import { getShapes } from '../actions/designActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import LoadSpinner from '../components/LoadSpinner'
import '../css/ShapesScreen.css'
function ShapesScreen({ history }) {
	const designInfo = useSelector(state => state.designInfo)
	const messageInfo = useSelector(state => state.message)
	// console.log(designInfo.shapes,8888);
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getShapes());
	}, [dispatch])


	return (
		<div className="right ShapesScreen">
			{messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>}
			{designInfo && designInfo.loading&& <div className="fullcreen"><LoadSpinner /></div> }
			<div className="maxWidth" style={{padding: '0 0.5rem'}}>
				<div className="title">Design Your Own Air Freshener</div>
				<div className="flex-between secction">
					<div className="cont">
						Select from the shapes below to start designing your custom air fre shener, or uploadyour own (PNG or JPG) using a template. There are plenty of scents to pick from: scentone, scent two, scent three, scent four, scent five, scent six, scent seven, scent eight, scentnine and scent ten.
					</div>
					<div className="btn">Request a Sample</div>
				</div>
			</div>
			<div className="car">
				<div className="maxWidth">
					<div className="name">We use height quality masterials for the best results.</div>
				</div>
			</div>
			<div className="maxWidth">
				<div className="uls flex-center">
					{
						designInfo.shapes&&designInfo.shapes.map((item,i)=>{
							return (
								<div className="ulBox" key={i}>
									<img src={item.image} style={{width: "100%"}} />
							<div className="money">{item.name} Starts form... £{item.price * item.discount}</div>
									{/* <div className="flex btnRight" style={{color: 'white'}}>
										Choose Template and Start
										<img src="./images/index/box2.png" className="btnImg" />
										<div>+</div>
									</div> */}
									<Link to={'/freshener/'+item.id}  className="flex btnRight" style={{color: 'white'}}>
										Choose Template and Start
									</Link>
								</div>
							)
						})
					}
					
				</div>
			</div>
		</div>
	)
}

export default ShapesScreen
