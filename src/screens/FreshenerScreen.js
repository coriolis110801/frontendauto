import React, { useState, useEffect } from 'react'
import { getFresheners, saveScents } from '../actions/designActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import LoadSpinner from '../components/LoadSpinner'
import { Link } from 'react-router-dom'
import '../css/FreshenerScreen.css'
function FreshenerScreen({ match, history }) {
	const [scents, setScents] = useState([]);
	const designInfo = useSelector(state => state.designInfo)
	const messageInfo = useSelector(state => state.message)
	const id = match.params.id
	const [showTip, setShowTip] = useState({});
	const [totalObj, setTotalObj] = useState({
		quantity: 0,
		total: 0
	});
	const colorList = [{
		"id": 3,
		"title": "White",
		"slug": "white",
		"color": "#ffffff",
		"premium": false,
		"attribute_id": 61
	}, {
		"id": 4,
		"title": "Yellow",
		"slug": "yellow",
		"color": "#eae81a",
		"premium": true,
		"attribute_id": 62
	}, {
		"id": 1,
		"title": "Red",
		"slug": "red",
		"color": "#ff3333",
		"premium": true,
		"attribute_id": 48
	}, {
		"id": 10,
		"title": "Purple",
		"slug": "purple",
		"color": "#6c55aa",
		"premium": true,
		"attribute_id": 73
	}, {
		"id": 8,
		"title": "PInk",
		"slug": "pink",
		"color": "#ff80c0",
		"premium": true,
		"attribute_id": 71
	}, {
		"id": 9,
		"title": "Orange",
		"slug": "orange",
		"color": "#ff8000",
		"premium": true,
		"attribute_id": 72
	}, {
		"id": 7,
		"title": "Green",
		"slug": "green",
		"color": "#008000",
		"premium": true,
		"attribute_id": 64
	}, {
		"id": 6,
		"title": "Brown",
		"slug": "brown",
		"color": "#b66924",
		"premium": true,
		"attribute_id": 65
	}, {
		"id": 2,
		"title": "Blue",
		"slug": "blue",
		"color": "#128fff",
		"premium": true,
		"attribute_id": 49
	}, {
		"id": 5,
		"title": "Black",
		"slug": "black",
		"color": "#000000",
		"premium": true,
		"attribute_id": 63
	}]
	const scentList = [{
		title: 'Baby Powder'
	},
	{
		title: 'Black Raspberry Vanilla'
	},
	{
		title: 'Cherry'
	},
	{
		title: 'Cinnamon'
	},
	{
		title: 'Citrus'
	},
	{
		title: 'Dark Ice'
	},
	{
		title: 'Fresh Air'
	},
	{
		title: 'Guava'
	},
	{
		title: 'Jasmine'
	},
	{
		title: 'Lemon'
	},
	{
		title: 'Fragrance'
	},
	{
		title: 'NuCar'
	},
	{
		title: 'Paris Hilton Replica'
	},
	{
		title: 'Peach'
	},
	{
		title: 'Pina'
	},
	{
		title: 'Strawberry'
	},
	{
		title: 'Sweet Pea'
	},
	{
		title: 'Vanilla'
	},
	]
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getFresheners(id));
		addScent();
	}, [])
	const getPriceOfNum = (i) => {
		let jg1 = 4.86;
		if (4 <= i && i <= 10) {
			jg1 -= 0.20
		} else if (11 <= i && i <= 20) {
			jg1 -= 0.15
		} else if (21 <= i && i <= 49) {
			jg1 = 1.66
		} else if (50 <= i && i <= 99) {
			jg1 = 1.36
		} else if (100 <= i && i <= 199) {
			jg1 = 1.06
		} else if (200 <= i && i <= 299) {
			jg1 = 0.91
		} else if (300 <= i && i <= 499) {
			jg1 = 0.6
		} else if (500 <= i && i <= 999) {
			jg1 = 0.46
		} else if (1000 <= i && i <= 1999) {
			jg1 = 0.44
		} else if (2000 <= i && i <= 2999) {
			jg1 = 0.41
		} else if (i >= 3000) {
			jg1 = 0.4
		}
		return jg1;
	}
	const addScent = () => {
		let flag = false;
		let newList = [];
		for(let i in scents) {
			let item = scents[i]
			var index = newList.findIndex((item2, index) => {
				return item.scent === item2.scent && item.color === item2.color
			})
			if (index < 0) {
				newList.push(scents[i])
				let showTipObj = {...showTip}
				showTipObj[i] = item.quantity < 3
				setShowTip(showTipObj);
			} else {
				flag = true
				newList[index].quantity = scents[i].quantity*1 + scents[index].quantity*1
			}
			if(item.quantity < 3) {
				flag = true
			}
			
		}
		if(flag) {
			setScents(newList);
			calcTotal(newList);
			return;
		}
		let obj = {
			scent: scentList[0].title,
			color: 0,
			quantity: 1
		}
		newList.push(obj);
		setScents(newList);
		calcTotal(newList);
	}
	const handleChange = (index, key) => {
		return (e) => {
			let arr = [...scents];
			arr[index][key] = e.target.value;
			setScents(arr);
			calcTotal(arr);
		}
	}
	const deleteScent = (index) => {
		return () => {
			if(scents.length <= 1) return;
			let arr = [...scents];
			arr.splice(index, 1);
			setScents(arr);
			calcTotal(arr);
		}
	}
	const calcTotal = (scents) => {
		let Qty = 0;
		let Sum = 0;
		scents.map(item=>{
			Qty+=item.quantity * 1;
			Sum+=(getPriceOfNum(item.quantity) * item.quantity) * 1
		});
		setTotalObj({
			quantity: Qty,
			total: Sum.toFixed(2)
		})
	}
	const startDesign = () => {
		let flag = false;
		let newList = [];
		for(let i in scents) {
			let item = scents[i]
			var index = newList.findIndex((item2, index) => {
				return item.scent === item2.scent && item.color === item2.color
			})
			if (index < 0) {
				newList.push(scents[i])
				let showTipObj = {...showTip}
				showTipObj[i] = item.quantity < 3
				setShowTip(showTipObj);
			} else {
				newList[index].quantity = scents[i].quantity*1 + scents[index].quantity*1
			}
			if(item.quantity < 3) {
				flag = true
			}
			
		}
		setScents(newList);
		calcTotal(newList);
		if(flag)  return 
		// console.log('1111') 
		dispatch(saveScents(scents, ()=> {
			history.push('/designer')
		}));
	}

	return (
		<div className="right FreshenerScreen">
			{messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>}
			{designInfo && designInfo.loading && <div className="fullcreen"><LoadSpinner /></div>}
			<div className="maxWidth" style={{ padding: '0 0.5rem' }}>
				<div className="title">Design Your Own Air Freshener</div>
				<div className="flex-between secction">
					<div className="cont">
						Select from the shapes below to start designing your custom air fre shener, or uploadyour own
						(PNG or JPG) using a template. There are plenty of scents to pick from: scentone, scent two,
						scent three, scent four, scent five, scent six, scent seven, scent eight, scentnine and scent
						ten.
					</div>
					<div className="btn">Request a Sample</div>
				</div>
			</div>

			<div style={{ backgroundColor: ' rgb(232,244,244)' }}>
				<div className="maxWidth" style={{ padding: '0 0.5rem' }}>
					<div className="content">
						<div className="left">
							<div className="left_title">Chosen Shape: {designInfo && designInfo.fresheners && designInfo.fresheners.size}</div>
							<div className="flex-center lis_title">
								<div>Scent</div>
								<div>Color</div>
								<div>Quantity</div>
								<div>Subtotal</div>
							</div>
							<div className="list_content">
								{
									scents.map((item, index) => {
										return <div className="flex-between cart-item">
											<div style={{display: 'flex',width:' 100%'}}>
												<div className="selectLi">
													<div className="downPutOne flex-between scent-select">
														<select value={item.scent} onChange={handleChange(index, 'scent')}>
															{
																scentList.map((item, i)=>{
																return <option value={item.title}>{item.title}</option>
																})
															}
														</select>
													</div>
												</div>
												<div className="flex-center selectLi">
													<div className="colorBox" style={{background: colorList[item.color].color}}></div>
													<div className="downPutOne flex-between color-select">
														<select value={item.color} onChange={handleChange(index, 'color')}>
															{
																colorList.map((item, i)=>{
																return <option value={i}>{item.title}</option>
																})
															}
														</select>
													</div>
												</div>
												<div className="selectLi flex-center" >
													<input placeholder="" value={item.quantity} min="1" type="number" className="iptQuantity" onChange={handleChange(index, 'quantity')} />
													{ showTip[index] && <div className="limit-tip">Minimum order quantity is 3pcs</div> }
												</div>
												<div className="selectLi subTotal" style={{color: '#666'}}>£{(getPriceOfNum(item.quantity) * item.quantity).toFixed(2)}</div>
											</div>
											<div className="deleteBox">
												<div className="delete" onClick={deleteScent(index)}>delete</div>
											</div>
										</div>
									})
								}
							</div>
											<div className="tips">

											</div>


											<div className="add" onClick={addScent}>Add a Scent</div>
											<div className="tips">
												<div>Minimum Quantity of 3 per line</div>
												<div>Quantities less than 500 will not be considered in any total quantity raye
									discounts</div>
												<div>*Premium string Additional costs may apply.</div>
											</div>
											<Link to='/shapes' className="backts">
											Back to Shapes
											</Link>
										</div>
							<div className="right">
								<div className="right_title">Product Summary</div>
								<div className="scent">
									<div className="flex-between">
										<div>Quantity:</div>
										<div className="totalQuantity">{totalObj.quantity}</div>
									</div>
								</div>
								<div className="subtotal">
									<div className="flex-between">
										<div>Subtotal:</div>
										<div>£{totalObj.total}</div>
									</div>
									<div className="flex-between">
										<div>Standard Shipping (UK):</div>
										<div>£{totalObj.total}</div>
									</div>
								</div>
								<div>
									<div className="flex-center">
										<div className="selectName">Country</div>
										<div className="layui-form downPutOne">
											<select>
												<option value="volvo">America</option>
												<option value="saab">Saab</option>
												<option value="opel">Opel</option>
												<option value="audi">Audi</option>
											</select>
										</div>

									</div>
									<div className="flex-center">
										<div className="selectName">Delivery</div>
										<div className="layui-form downPutOne">
											<select >
												<option value="volvo">America</option>
												<option value="saab">Saab</option>
												<option value="opel">Opel</option>
												<option value="audi">Audi</option>
											</select>
										</div>

									</div>
									<div className="flex-between" style={{ marginTop: '0.2rem' }}>
										<div>
											<div className="total" style={{ fontWeight: 600 }}>Total:</div>
											<div className="vat">Including £00.00 in VAT</div>
										</div>
										<div className="money total-price">£00.00</div>
									</div>
								</div>
								<div className="save sDesign2" onClick={startDesign}>Start Design 2</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}

export default FreshenerScreen
