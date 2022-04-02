import React, { useState } from 'react'
import '../css/EditPwdScreen.css'

function EditPwdScreen({ history }) {

	return (
		<div className="EditPwdScreen right">
			
						<div className="topName flex-center">
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
									<input placeholder="●●●●●●●●●●●●●" type="password" id="user-new-password" className="entry" aria-multiline="newpwd" name="newpwd"/>
								</div>
								<div className="lis_item flex-center">
									<div className="subject">Current Password:</div>
									<input placeholder="●●●●●●●●●●●●●" type="password" id="user-old-password" className="entry" name="pwd" />
								</div>
								<div className="lis_item flex-center">
									<div className="subject">Confirm New Password:</div>
									<input placeholder="●●●●●●●●●●●●●" type="password" id="user-confirm-password" className="entry"  name="newpwd1"/>
								</div>
								<div className="lis_item flex-center hide" >
									<div className="subject">Confirm New Password:</div>
									<input placeholder="●●●●●●●●●●●●●" type="password" className="entry" />
								</div>
								<div className="saveTwo">Save Changes</div>
							</div>
						</div>
				
				
		</div >
	)
}

export default EditPwdScreen
