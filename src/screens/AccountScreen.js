import React, { useState } from 'react'
import '../css/AccountScreen.css'
import EditPwdScreen from './EditPwdScreen'
import AddressScreen from './AddressScreen';
import OrderScreen from './OrderScreen';
function Account({ history }) {
	const [menu, setMenu] = useState('1-2');
	const handleMenu = (val) => {
		return () => {
			setMenu(val);
		}
	}
	return (
		<div className="accountScreen">
			<div className="maxWidth" >
				<div className="flex-between center">
					<div className="left">
						<div className={menu === '1-1' || menu === '1-2' ? 'name title' : 'name'}>My Details</div>
						<div className={menu === '1-1' ? 'titlee' : ''} onClick={handleMenu('1-1')}>Change Password</div>
						<div className={menu === '1-2' ? 'titlee' : ''} onClick={handleMenu('1-2')}>Manage Address</div>
						<div className={menu === '2-0' ? 'name title' : 'name'} onClick={handleMenu('2-0')}>My Orders</div>
						<div className={menu === '3-0' ? 'name title' : 'name'} onClick={handleMenu('3-0')}>My Designs</div>
					</div>
					
					{
						menu === '1-2' ?
							<AddressScreen />
							: ''
					}
					{
						menu === '1-1' ? <EditPwdScreen />:''
					}
					{
						menu === '2-0' ? <OrderScreen />:''
					}
					
					
				</div>
			</div>

		</div >
	)
}

export default Account
