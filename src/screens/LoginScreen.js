import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login, register } from '../actions/userActions'
import { messageUpdate } from '../actions/messageActions'
import '../css/LoginScreen.css'
function LoginScreen({ location, history }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [regEmail, setRegEmail] = useState('')
	const [regPassword, setRegPassword] = useState('')
	const [conPassword, setConPassword] = useState('')

	

	const dispatch = useDispatch()

	const redirect = location.search ? location.search.split('=')[1] : '/'
	console.log(redirect, 5555);
	const userLogin = useSelector(state => state.userLogin)
	const { loading, userInfo } = userLogin
	const messageInfo = useSelector(state => state.message)
	const userRegister = useSelector(state => state.userRegister)
	const loading2 = userRegister.loading;
	const userInfo2 = userRegister.userInfo;
	useEffect(() => {
		if (userInfo || userInfo2) {
			history.push(redirect==='/cart'?'/selAddress':redirect);
		}
	}, [history, userInfo, redirect])

	const submitLogHandler = (e) => {
		if(!email.trim()) {
			
			dispatch(messageUpdate('please input login email'))
		}else if(!password.trim()) {
			dispatch(messageUpdate('please input login password'))
		}else {
			// dispatch(messageUpdate(''))
			dispatch(login(email, password))
		}
		// e.preventDefault()
		// console.log(email, password);
		
	}
	const submitRegHandler = (e) => {
        e.preventDefault()
		if(!regEmail.trim()) {
			dispatch(messageUpdate('please input register email'))
		}else if(!regPassword.trim()) {

			dispatch(messageUpdate('please input register password'))
		}else if (regPassword !== conPassword) {
			dispatch(messageUpdate('Passwords do not match'))
        } else {
            dispatch(register(regEmail, regPassword))
        }

    }
	const handleEmail = (e) => {
		setEmail(e.target.value);
	}
	const handlePassword = (e) => {
		setPassword(e.target.value);
	}
	const handleRegEmail = (e) => {
		setRegEmail(e.target.value);
	}
	const handleRegPassword = (e) => {
		setRegPassword(e.target.value);
	}
	const handleConPassword = (e) => {
		setConPassword(e.target.value);
	}

	return (
		<div>
			{messageInfo.msg && <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>}
			{loading && <Loader />}
			{loading2 && <Loader />}
			
			<div className="login">
				
				<div className="maxWidth padLR" >
					<div className="title">Access Your Account{loading}11</div>
					<div className="content">
						Login using your details below to access your account. If you're newhere, pleasecreate an account ro receive exclusive benefits. By providing us with your details,ordering from AutoSqueak will be a faster and pleasant experience.
				</div>
				</div>
				<div className="sec2">
					<div className="maxWidth secction flex-center" >
						<div className="left">
							
							<div className="name">Login</div>
							<div className="cont">Welcome back to AutoSqueak</div>
							<div className="uil">
								<div className="flex-center lis">
									<input placeholder="Email Address" value={email} onChange={handleEmail} />
								</div>
								<div className="flex-center lis">
									<input type="password" placeholder="Password" value={password} onChange={handlePassword} />
								</div>
							</div>
							<div className="loginBtn" onClick={submitLogHandler}>Login</div>
							<div className="flex botm">
								<div>Forgotten your details?</div>
								<div className="here">Click here</div>
							</div>
						</div>
						{
							redirect!=='/cart' ?<div className="left">
							<div className="name">Create an Account</div>
							<div className="cont contTwo">To receive exclusive benefite</div>
							<div className="uil">
								<div className="flex-center lis">
									<input placeholder="Email Address" value={regEmail} onChange={handleRegEmail} />
								</div>
								<div className="flex-center two">
									<div className="flex-center lis">
										<input type="password"  placeholder="Password" value={regPassword} onChange={handleRegPassword}/>
									</div>
									<div className="flex-center lis right">
										<input type="password" placeholder="Confirm Password" value={conPassword} onChange={handleConPassword}/>
									</div>
								</div>
							</div>
							<div className="loginBtn" onClick={submitRegHandler}>Register</div>
						</div>
						:
						<div className="right">
							<div className="name nameTwo">Purchase as a Guest</div>
							<div className="place">
								To purchase as a guest, you just need to provide us with the essential details to place your order.
							</div>
							<div className="place">
								To save your details for future purchases, please sign up to AutoSqueak and create your account.
							</div>
							<div className="register" style={{marginTop: '0.6rem'}}>
							<Link to='/selAddress' className="register">Continue as a Guest</Link>
							</div>
						</div>
						}
						
					</div>
					<div className="tips maxWidth">
						Sorry Captcha is incorrect Or Invalid password format
				</div>
				</div>

			</div>
		</div>
	)
}

export default LoginScreen
