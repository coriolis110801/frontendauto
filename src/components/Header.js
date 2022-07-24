import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import {CART_CLEAR_ITEMS} from '../constants/cartConstants'
function Header(props) {

	const userLogin = useSelector(state => state.userLogin)
	const cartItems = useSelector(state => state.cart.cartItems)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = (e) => {
		dispatch({ type: CART_CLEAR_ITEMS })
		dispatch(logout())
	}

    return (
        <header>
           <div className="head">Free UK Delivery - Orders over £100</div>
	<div className="maxWidth">
		<div className="header flex-between">
			<a href="/"><div className="logo"></div></a>
			<div className="flex-center shop nav">
				<div className="flex-center nav-first shop-nav active line1rem" >
					<a href="#"><div>Shop</div></a>
					<img src="./images/index/up1.png" className="down" />
					<img src="./images/index/UP.png" className="down-y" />
					<div className="imgUl">
						<div className="flex-center wrap" >
							<Link to="/store/3" className="carui_box">
								<img src="./images/index/carui1.png" className="carUi" />
								<div className="carName">
									<div>Chemical</div>
									<div>Products</div>
								</div>
							</Link>
							<Link to="/store/4" className="carui_box" >
								<img src="./images/index/carui2.png" className="carUi" />
								<div className="carName">
									<div>Air</div>
									<div>Fresheners</div>
								</div>
							</Link>
							<Link to="/store/6" className="carui_box" >
						
								<img src="./images/index/carui3.png" className="carUi" />
								<div className="carName">
									<div>H.P. Pump</div>
									<div>and Parts</div>
								</div>
							</Link>
							<Link to="/store/7" className="carui_box" >
						
								<img src="./images/index/carui4.png" className="carUi" />
								<div className="carName">
									<div>Vacuum</div>
									<div>Cleaners</div>
								</div>
							</Link>
							<Link to="/store/8" className="carui_box" >
							
								<img src="./images/index/carui5.png" className="carUi" />
								<div className="carName">
									<div>Aerosol</div>
									<div>Products</div>
								</div>
						
							</Link>
							<Link to="/store/5" className="carui_box" >
							
								<img src="./images/index/carui6.png" className="carUi" />
								<div className="carName">
									<div>Compression</div>
									<div>Sprayers</div>
								</div>
					
							</Link>
							<Link to="/store/9" className="carui_box" >
							
								<img src="./images/index/carui7.png" className="carUi" />
								<div className="carName">
									<div>Valeting</div>
									<div>Accessories</div>
								</div>
						
							</Link>
							<Link to="/store/20" className="carui_box" >
							
								<img src="./images/index/carui8.png" className="carUi" />
								<div className="carName">
									<div>Pipe Fixing</div>
									<div>And Fitting</div>
								</div>
							</Link>
							<Link to="/store/12" className="carui_box" >
							
								<img src="./images/index/carui12.png" className="carUi" />
								<div className="carName">
									<div>Microfibre</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<Link to="/shapes"><div className="design nav-item" >Design My Air Freshener</div></Link>
				<Link to="/about"><div className="about nav-item">About</div></Link>
				<Link to="/contact"><div className="about nav-item">Contact</div></Link>
				
				{userInfo&&userInfo.token?<Link to="/account"><div className="lorR nav-item">My Account</div></Link>:''}
				{userInfo&&userInfo.token?
					<Link to="/login" onClick={logoutHandler}><div className="lorR nav-item">Log Out</div></Link>:
					<Link to="/login"><div className="lorR nav-item">Login/Register</div></Link>}
				<div className="flex-center" >
					<img src="./images/index/search.png" className="search" />
					<input placeholder="" className="ipt"/>
				</div>
			</div>
			<div className="flex-center">
				<Link to="/cart" className="relative">
					<img src="./images/index/box.png" className="box" />
					<div className="round-num">{cartItems || 0}</div>
				</Link>
				<button className="all">
					<img src="./images/index/menu.png" />
				</button>
			</div>
		</div>
		<div className="mask"></div>
		<div className="right-menu">
			<div className="flex-center" >
				<div>Shop</div>
				<img src="./images/index/down3.png" />
			</div>
			<div className="shopContent">
				<div><Link to="/store/3">Chemical Products</Link></div>
				<div><Link to="/store/4">Air Fresheners</Link></div>
				<div >
					<Link to="/store/6">H.P. Pump and Parts</Link>
				</div>
				<div><Link to="/store/7">Vacuum Cleaners</Link></div>
				<div><Link to="/store/8">Aerosol Products</Link></div>
				<div >
					<Link to="/store/5">Compression Sprayers</Link>
				</div>
				<div >
					<Link to="/store/9">Valeting Accessories</Link>
				</div>
				<div >
					<Link to="/store/20">
					Pipe Fixing andFitting
					</Link>
				</div>
				<div >
					<Link to="/store/12">
					Microfibre
					</Link>
				</div>
			</div>
			<div className="line"></div>
			<div className="mask_bottom">
			
				<Link to="/shapes">
					<div>Design My</div>
					<div>Air Freshener</div>
				</Link>
				<Link to="/about">About</Link>
				<Link to="/contact">Contact</Link>
				{userInfo&&userInfo.token?
					<Link to="/account">My Account</Link>:''}
				{userInfo&&userInfo.token?
					<a onClick={logoutHandler} to="/logout">Log Out</a>:
					<Link to="/login">Login / Register</Link>}
				<div className="flex-center">
					<img src="./images/index/search.png" className="mask_search" />
					<input placeholder="" className="mask_ipt" />
				</div>
			</div>
		</div>
	</div>
        </header>
    )
}

export default Header
