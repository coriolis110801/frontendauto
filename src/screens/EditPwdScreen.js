import React, { useState } from 'react'
import '../css/EditPwdScreen.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { changePwd } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { messageUpdate } from '../actions/messageActions'
function EditPwdScreen({ history }) {
	const [param, setParam] = useState({
		password: '',
		newPassword: '',
		conPassword: ''
	});
	const dispatch = useDispatch();
	const messageInfo = useSelector(state => state.message)
	const userUpdateProfile = useSelector(state => state.userUpdateProfile)
	const { loading } = userUpdateProfile
	const changeIptHandle = (key) => {
		return (e) => {
			let obj = {...param};
			obj[key] = e.target.value;
			setParam(obj);
		}
	}
	const SaveChanges = () => {
		if(!param.password.trim()) {
			dispatch(messageUpdate('please input Current Password!'))
		}else if(!param.newPassword.trim()) {
			dispatch(messageUpdate('please input new Password!'))
		}else if(param.newPassword!=param.conPassword) {
			dispatch(messageUpdate('Inconsistent password entered twice!'))
		}else {
			dispatch(changePwd(param))
		} 
	}
	return (
		<div className="EditPwdScreen right">
			{messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>}
			{loading && <Loader />}
						<div className="topName flex-center">
							{loading}111
							<div className="welcome">Account /</div>
							<div className="peopleName">Address</div>
						</div>
						<div className="detail">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non lacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio.
						</div>
						<div className="account">
							<div className="account_titleTwo">Change Password</div>
							<div className="flex-between lisTwo">
								<div className="lis_item flex-center">
									<div className="subject">New Password:</div>
									<input placeholder="" type="password" id="user-new-password" onChange={changeIptHandle('newPassword')} value={param.newPassword} className="entry" aria-multiline="newpwd" name="newpwd"/>
								</div>
								<div className="lis_item flex-center">
									<div className="subject">Current Password:</div>
									<input placeholder="" type="password" id="user-old-password" className="entry" name="pwd" onChange={changeIptHandle('password')} value={param.password}  />
								</div>
								<div className="lis_item flex-center">
									<div className="subject">Confirm New Password:</div>
									<input placeholder="" type="password" id="user-confirm-password" className="entry"  name="newpwd1" onChange={changeIptHandle('conPassword')} value={param.conPassword} />
								</div>
								<div className="lis_item flex-center hide" >
									<div className="subject">Confirm New Password:</div>
									<input placeholder="" type="password" className="entry" onChange={changeIptHandle('conPassword')} value={param.conPassword}  />
								</div>
								<div className="saveTwo" onClick={SaveChanges}>Save Changes</div>
							</div>
						</div>
				
				
		</div >
	)
}

export default EditPwdScreen
