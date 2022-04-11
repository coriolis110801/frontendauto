import React, { useState, useEffect } from 'react'
import '../css/AddressScreen.css'
import { getAddress, setDefaultAddress, deleteAddress, saveAddress } from '../actions/addressActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import LoadSpinner from '../components/LoadSpinner'
import Loader from '../components/Loader'
function AddressScreen({ history }) {
	const addInfo = useSelector(state => state.addresses)
	const messageInfo = useSelector(state => state.message)
	const [show, setShow] = useState(false);
	const defaultVal = {
		address: '',
		city: '',
		county: '',
		gs: '',
		phone: '',
		postcode: '',
		status: 0,
		uname: '',
	};
	const [addressObj, setAddressObj] = useState(defaultVal);
	// const [isBoxs, setIsBoxs] = useState(false);
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAddress())
	}, [dispatch])
	const setDefaultHandle = (id) => {
		return () => {
			dispatch(setDefaultAddress(id))
		}
	}

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
	// function changBox(){

	// 	$('.boxCli').hide()
	// 	$('.boxs').show()
	// }
	// const changBox = () => {
	// 	setIsBoxs(true)
	// }
	// const downBox = () => {
	// 	setIsBoxs(false)
	// }
	const closeAddress = () => {
		setAddressObj({});
		setShow(false);
	}
	const saveAddressHanle = () => {
		dispatch(saveAddress(addressObj, closeAddress))
	}
	const changeIptHandle = (key) => {
		return (e) => {
			let obj = { ...addressObj };
			obj[key] = e.target.value;
			// console.log(obj);
			setAddressObj(obj);
		}
	}

	return (
		<div className="AddressScreen right">
			
			{
				show ? <div className="mask"></div> : ''
			}

			{
				show ? <div className="addressBox">
					<div className="err" onClick={closeAddress}>
						<img src="./images/index/errs.png" />
					</div>
					<div className="account_titleOne">Add an Address</div>
					<div className="flex-between lisOne">
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
						{/* <div className="lis_item flex-center">
											<div className="subjectOne">Address Line 2:</div>
											<input placeholder="" className="entryOne" onChange={changeIptHandle('phone')} value={addressObj.phone}/>
										</div> */}
						<div className="lis_item flex-center">
							<div className="subjectOne">Phone Number:</div>
							<input placeholder="" className="entryOne" onChange={changeIptHandle('phone')} value={addressObj.phone} />
						</div>
					
						<div className="lis_item flex-center">
							<div className="subjectOne">Postcode:</div>
							<input placeholder="" className="entryOne" onChange={changeIptHandle('postcode')} value={addressObj.postcode} />
						</div>
						{/* <div className="two lis_item select">
											<div className="flex-center">
											{isBoxs?<div className="boxs" onClick={downBox}></div>:<div className="boxCli" onClick={changBox}></div>}
												
											<div className="subjectThree">Save as Default</div>
											</div>
										</div> */}
						<div className="save" onClick={saveAddressHanle}>Save Changes</div>
					</div>
				</div>
					: ''
			}
			{addInfo && addInfo.loading2  && <Loader />}
			{messageInfo.msg ? <Message variant={messageInfo.variant}>{messageInfo.msg}</Message> : ''}
			{addInfo && addInfo.loading ? <div className="fullcreen"><LoadSpinner /></div>
				: <div>
					<div className="topName flex-center">
						<div className="welcome">Your </div>
						<div className="peopleName">  Addresses</div>
					</div>
					<div className="detail">
						Click 'Add Address' to add a new address and click 'pencil button' to edit the selected address. Delivery options and delivery speeds may vary for different locations.
						</div>

					<div className="account_titleOne">Saved Addresses</div>
					<div className="flex-center boxUi">
						<div className="add flex" onClick={showAddress()}>
							<img src="./images/index/add1.png" className="addImg" />
							<div className="addContent">Add Address</div>
						</div>
						{
							addInfo.addresses && addInfo.addresses.map((item, index) => {
								return <div key="index" className={'boxUi_item ' + (item.status == 1 ? 'boxUi_item_default' : '')}>
									{
										item.status == 1 ? <div className="boxUi_item_header">
											<div>Default:</div>
											<img src="images/index/logo.png" />
										</div> : ''
									}

									<div className="boxUi_item_default_body">
										<div className="flex-center" >
											<div className="boxName">{item.uname}</div>
											<div className="mar">●</div>
											<div>{item.phone}</div>
										</div>
										<div class="boxName names">{item.gs}</div>

										<div className="select_item">
											<div >{item.country}</div>
											<div>{item.county}</div>
											<div>{item.city}</div>
											<div>{item.address}</div>
											{/* <div>County</div>
													<div>Country</div> */}
										</div>
										<div className="flex-center modify">
											<img src="images/index/errs.png" className="errs" onClick={deleteAddressHandle(item.id)} />
											<img src="images/index/bi.png" className="bi" onClick={showAddress(item)} />
										</div>
										{
											item.status != 1 ?<div onClick={setDefaultHandle(item.id)} className="default flex">Default</div>:''
										}
										
									</div>
								</div>

							})
						}
					</div>

				</div>
			}


		</div >
	)
}

export default AddressScreen
