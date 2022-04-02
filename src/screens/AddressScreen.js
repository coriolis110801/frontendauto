import React, { useState } from 'react'
import '../css/AddressScreen.css'

function AddressScreen({ history }) {

	return (
		<div className="AddressScreen right">
								<div className="topName flex-center">
									<div className="welcome">Your </div>
									<div className="peopleName">  Addresses</div>
								</div>
								<div className="detail">
									Click 'Add Address' to add a new address and click 'pencil button' to edit the selected address. Delivery options and delivery speeds may vary for different locations.
						</div>
								<div className="mask"></div>
								<div className="addressBox">
									<div className="err" onclick="closeAddress()">
										<img src="./images/index/errs.png" />
									</div>
									<div className="account_titleOne">Add an Address</div>
									<div className="flex-between lisOne">
										<div className="lis_item flex-center">
											<div className="subjectOne">County:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="flex-center lis_item layui-form">
											<div className="subjectOne">Country:</div>
											<select className="countrySel">
												<option value="volvo">Name Here</option>
												<option value="saab">Saab</option>
												<option value="opel">Opel</option>
												<option value="audi">Audi</option>
											</select>

										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">City:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">Full Name:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">Address Line 1:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">Company:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">Address Line 2:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">Phone Number:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="one lis_item select">
											<div className="flex-center">
												<div className="boxs" onclick="downBox()"></div>
												<div className="boxCli" onclick="changBox()"></div>
												<div className="subjectThree">Save as Default</div>
											</div>
										</div>
										<div className="lis_item flex-center">
											<div className="subjectOne">Postcode:</div>
											<input placeholder="" className="entryOne" />
										</div>
										<div className="two lis_item select">
											<div className="flex-center">
												<div className="boxs" onclick="downBox()"></div>
												<div className="boxCli" onclick="changBox()"></div>
												<div className="subjectThree">Save as Default</div>
											</div>
										</div>
										<div className="save">Save Changes</div>
									</div>
								</div>
								<div className="account_titleOne">Saved Addresses</div>
								<div className="flex-center boxUi">
									<div className="add flex" onclick="showAddress()">
										<img src="./images/index/add1.png" className="addImg" />
										<div className="addContent">Add Address</div>
									</div>
									<div className="boxUi_item boxUi_item_default">
										<div className="boxUi_item_header">
											<div>Default:</div>
											<img src="img/index/logo.png" />
										</div>
										<div className="boxUi_item_default_body">
											<div className="flex-center" >
												<div className="boxName">Joe Bloggs</div>
												<div className="mar">●</div>
												<div>07123456789</div>
											</div>
											<div className="boxName names">Company Name Here</div>
											<div className="select_item">
												<div>Address Line 1</div>
												<div>Address Line 2</div>
												<div>Town / City</div>
												<div>County</div>
												<div>Country</div>
											</div>
											<div className="flex-center modify">
												<img src="img/index/errs.png" className="errs" />
												<img src="img/index/bi.png" className="bi" onclick="showAddress()" />
											</div>

											<div className="default flex">Default</div>
										</div>
									</div>
									<div className="boxUi_item">
										<div className="flex-center" >
											<div className="boxName">Joe Bloggs</div>
											<div className="mar">●</div>
											<div>07123456789</div>
										</div>
										<div className="boxName names">Company Name Here</div>
										<div className="select_item">
											<div>Address Line 1</div>
											<div>Address Line 2</div>
											<div>Town / City</div>
											<div>County</div>
											<div>Country</div>
										</div>
										<div className="flex-center modify">
											<img src="img/index/errs.png" className="errs" />
											<img src="img/index/bi.png" className="bi" />
										</div>

										<div className="default flex">Default</div>
									</div>
									<div className="boxUi_item">
										<div className="flex-center" >
											<div className="boxName">Joe Bloggs</div>
											<div className="mar">●</div>
											<div>07123456789</div>
										</div>
										<div className="boxName names">Company Name Here</div>
										<div className="select_item">
											<div>Address Line 1</div>
											<div>Address Line 2</div>
											<div>Town / City</div>
											<div>County</div>
											<div>Country</div>
										</div>
										<div className="flex-center modify">
											<img src="img/index/errs.png" className="errs" />
											<img src="img/index/bi.png" className="bi" />
										</div>

										<div className="default flex">Default</div>
									</div>
									<div className="boxUi_item">
										<div className="flex-center" >
											<div className="boxName">Joe Bloggs</div>
											<div className="mar">●</div>
											<div>07123456789</div>
										</div>
										<div className="boxName names">Company Name Here</div>
										<div className="select_item">
											<div>Address Line 1</div>
											<div>Address Line 2</div>
											<div>Town / City</div>
											<div>County</div>
											<div>Country</div>
										</div>
										<div className="flex-center modify">
											<img src="img/index/errs.png" className="errs" />
											<img src="img/index/bi.png" className="bi" />
										</div>

										<div className="default flex">Default</div>
									</div>
									<div className="boxUi_item">
										<div className="flex-center" >
											<div className="boxName">Joe Bloggs</div>
											<div className="mar">●</div>
											<div>07123456789</div>
										</div>
										<div className="boxName names">Company Name Here</div>
										<div className="select_item">
											<div>Address Line 1</div>
											<div>Address Line 2</div>
											<div>Town / City</div>
											<div>County</div>
											<div>Country</div>
										</div>
										<div className="flex-center modify">
											<img src="img/index/errs.png" className="errs" />
											<img src="img/index/bi.png" className="bi" />
										</div>

										<div className="default flex">Default</div>
									</div>
									<div className="boxUi_item">
										<div className="flex-center" >
											<div className="boxName">Joe Bloggs</div>
											<div className="mar">●</div>
											<div>07123456789</div>
										</div>
										<div className="boxName names">Company Name Here</div>
										<div className="select_item">
											<div>Address Line 1</div>
											<div>Address Line 2</div>
											<div>Town / City</div>
											<div>County</div>
											<div>Country</div>
										</div>
										<div className="flex-center modify">
											<img src="img/index/errs.png" className="imgOne" />
											<img src="img/index/bi.png" className="imgTwo" />
										</div>
										<div className="default flex">Default</div>
									</div>
								</div>
						

		</div >
	)
}

export default AddressScreen
