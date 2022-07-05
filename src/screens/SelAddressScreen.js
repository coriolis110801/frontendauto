import React, { useState, useEffect } from 'react'
import '../css/AddressScreen.css'
import { getAddress, getZtAddress, deleteAddress, saveAddress } from '../actions/addressActions'
import { saveShippingAddress } from '../actions/cartActions'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import LoadSpinner from '../components/LoadSpinner'
import Loader from '../components/Loader'
function SelAddressScreen({ history }) {
	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin
	const addInfo = useSelector(state => state.addresses)
	const messageInfo = useSelector(state => state.message)
	const pickUpAddr = useSelector(state => state.pickUpAddr.ztAddress)
	const [show, setShow] = useState(false);
	// const [email, setEmail] = useState('');
	const [deliverType, setDeliverType] = useState('deliver')
	const cart = useSelector(state => state.cart)
	const defaultVal = cart.shippingAddress ||  {
		address: '',
		city: '',
		county: '',
		country: '',
		gs: '',
		phone: '',
		postcode: '',
		status: 0,
		uname: '',
		email: ''
	};
	const [addressObj, setAddressObj] = useState(defaultVal);
	// const [isBoxs, setIsBoxs] = useState(false);
	const dispatch = useDispatch()
	useEffect(() => {
		if (userInfo) dispatch(getAddress())
		dispatch(getZtAddress())
		
	}, [dispatch])


	const deleteAddressHandle = (id) => {
		return () => {
			dispatch(deleteAddress(id))
		}
	}
	const showAddress = (item = defaultVal) => {
		return () => {
			console.log(111)
			setAddressObj(item);
			setShow(true);
		}
	}
	const closeAddress = () => {
		setAddressObj({});
		setShow(false);
	}
	const saveAddressHanle = () => {
		if(userInfo) {
			dispatch(saveAddress(addressObj, closeAddress));
		}else {
			dispatch(saveShippingAddress(addressObj, ()=>{
				history.push('/placeorder/tourists-shipping');
			}));
			
		}
	}
	const changeIptHandle = (key) => {
		return (e) => {
			// if (key == 'email') {
			// 	setEmail(e.target.value);
			// 	return;
			// }
			let obj = { ...addressObj };
			obj[key] = e.target.value;
			// console.log(obj);
			setAddressObj(obj);
		}
	}
	const navTo = (item) => {
		return () => {
			dispatch(saveShippingAddress(item, ()=>{
				history.push('/placeorder/' + item.id);
			}));
		}
	}
	const navTo2 = () => {
		return () => {
			// console.log(cart&&cart.shippingAddress&&cart.shippingAddress.email)
			dispatch(saveShippingAddress({
				...pickUpAddr,
				email: addressObj&&addressObj.email
			}, ()=>{
				history.push('/placeorder/zitiquhuo');
			}));
		}
	}

	return (
		<div className="AddressScreen selAddress right">

			{
				show ? <div className="mask"></div> : ''
			}


			{addInfo && addInfo.loading2 && <Loader />}
			{messageInfo.msg ? <Message variant={messageInfo.variant}>{messageInfo.msg}</Message> : ''}

			{/* <div className="err" onClick={closeAddress}>
						<img src="./images/index/errs.png" />
					</div> */}
			<div className="inAddress" >
				<div>
					<label onClick={() => { setDeliverType('deliver') }} className={deliverType === 'deliver' ? "formCheckLabel checked" : "formCheckLabel"}></label>
				</div>
				<div className="flex-between lisOne">
					<div className="SelTitle" >Select a delivery address</div>
					{
						deliverType === 'deliver' ?
							<div>
								<p>Is the address you'd like to use displayed below? if so, click the corresponding " Deliver to this address" button Or you can <span className="textGreen">enter a new delivery address</span></p>
								{addInfo && addInfo.loading ? <div className="fullcreen"><LoadSpinner /></div>
									: <div className="w100">




										<div className="flex boxUi" style={{ marginBottom: 0,alignItems: 'stretch',justifyContent: 'flex-start' }}>

											{
												addInfo.addresses && addInfo.addresses.map((item, index) => {
													return <div key="index" className={'boxUi_item ' + (item.status == 1 ? 'boxUi_item_default' : '')}>


														<div className="boxUi_item_default_body">
															<div className="flex-center" >
																<div className="boxName">{item.uname}</div>
																{/* <div className="mar">●</div>
													<div>{item.phone}</div> */}
															</div>
															{/* <div class="boxName names">{item.gs}</div> */}

															<div className="select_item">
																<div >{item.country}</div>
																<div>{item.county}</div>
																<div>{item.city}</div>
																<div>{item.address}</div>
																{/* <div>County</div>
													<div>Country</div> */}
															</div>
															<div style={{position: "absolute", bottom: '.1rem', left: 0}}>
																<div className="TextYellowBtn btn" onClick={navTo(item)}>delivery to this address</div>
																<div className="flex-between" style={{ marginTop: '.1rem', padding: '0.1rem' }}>


																	<div className="TextGreenBtn btn" onClick={deleteAddressHandle(item.id)}>Edit</div>
																	<div className="TextGreenBtn btn" onClick={showAddress(item)} >Delete</div>

																</div>


															</div>
														</div>
													</div>

												})
											}
										</div>

									</div>
								}
								{
									!userInfo || !userInfo.email ? <div className="lis_item flex-center" style={{ margin: '0.5rem 0' }}>
										<div className="subjectOne">Email:</div>
										<input placeholder="" onChange={changeIptHandle('email')} value={addressObj.email} className="entryOne" />

									</div> : ''
								}

								<div className="SelTitle">Add a new address</div>
								<div className="lis_item flex-center">
									<div className="subjectOne">County:</div>
									<input placeholder="" onChange={changeIptHandle('county')} value={addressObj.county} className="entryOne" />
								</div>
								<div className="flex-center lis_item layui-form">
									<div className="subjectOne">Country:</div>
									<select className="countrySel" onChange={changeIptHandle('country')} value={addressObj.country}>
										<option value="volvo">Name Here</option>
										<option value="saab">Saab</option>
										<option value="opel">Opel</option>
										<option value="audi">Audi</option>
									</select>

								</div>
								<div className="lis_item flex-center">
									<div className="subjectOne">City:</div>
									<input placeholder="" onChange={changeIptHandle('city')} value={addressObj.city} className="entryOne" />
								</div>
								<div className="lis_item flex-center">
									<div className="subjectOne">Full Name:</div>
									<input placeholder="" onChange={changeIptHandle('uname')} value={addressObj.uname} className="entryOne" />
								</div>
								<div className="lis_item flex-center">
									<div className="subjectOne">Address:</div>
									<input placeholder="" className="entryOne" onChange={changeIptHandle('address')} value={addressObj.address} />
								</div>
								<div className="lis_item flex-center">
									<div className="subjectOne">Company:</div>
									<input placeholder="" className="entryOne" onChange={changeIptHandle('gs')} value={addressObj.gs} />
								</div>

								<div className="lis_item flex-center">
									<div className="subjectOne">Phone Number:</div>
									<input placeholder="" className="entryOne" onChange={changeIptHandle('phone')} value={addressObj.phone} />
								</div>

								<div className="lis_item flex-center">
									<div className="subjectOne">Postcode:</div>
									<input placeholder="" className="entryOne" onChange={changeIptHandle('postcode')} value={addressObj.postcode} />
								</div>

								<div className="TextYellowBtn btn" style={{display: 'inline-block'}} onClick={saveAddressHanle} >Add address</div>

							</div> : ''
					}

				</div>

			</div>
			<div className="inAddress">
				<div>
					<label onClick={() => { setDeliverType('pickingUp') }} className={deliverType === 'pickingUp' ? "formCheckLabel checked" : "formCheckLabel"}></label>
				</div>
				<div className="flex-between lisOne">
					<div className="SelTitle">Picking Up</div>
					{
						deliverType === 'pickingUp'?
						(pickUpAddr&&pickUpAddr.id? (
							<div style={{ width: '100%'}}>
							<div style={{ width: '100%', maxWidth: '500px', background: '#DEF4F2', margin: '.1rem 0', padding: '0.1rem' }}>
									<div className="boxName">{pickUpAddr.dizhi}</div>
									<div style={{margin: '0.1rem 0'}}>{pickUpAddr.dz1}</div>
									<div style={{margin: '0.1rem 0'}}>{pickUpAddr.dz2}</div>
									<div style={{margin: '0.1rem 0'}}>{pickUpAddr.dz3}</div>
									<div style={{margin: '0.1rem 0'}}>{pickUpAddr.postcode}</div>
									<div style={{margin: '0.1rem 0'}}>{pickUpAddr.tel}</div>
								</div>
								{
									!userInfo || !userInfo.email ? <div className="lis_item flex-center" style={{ margin: '0.5rem 0' }}>
										<div className="subjectOne">Email:</div>
										<input placeholder="" onChange={changeIptHandle('email')} value={addressObj.email} className="entryOne" />

									</div> : ''
								}

								<div className="TextYellowBtn btn" style={{display: 'inline-block', marginBottom: '.1rem'}} onClick={navTo2({})} >Next</div>
				
							</div>
						):'')
						
						:
						''

					}
				</div>

			</div>


		</div >
	)
}

export default SelAddressScreen
