import React from 'react'
import { Link } from 'react-router-dom'
function Footer(props) {
    console.log('footer', props)
    return (
        <footer>
            <div className="bottom">
                <img src="./images/index/logo1.png" className="botmImg" />
                <div className="flex bottomBox">
                    <div className="btmUl"><Link to='/about'>About</Link></div>
                    <div className="btmUl"><Link to='/contact'>Contact</Link></div>
                    <div className="btmUl"><Link to='/termsdelivery'>Delivery & Returns</Link></div>
                    <div className="btmUl"><Link to='/condition'>Terms & Conditions</Link></div>
                    <div className="btmUl"><Link to='/privatepolicy'>Privacy Policy</Link></div>
                </div>
                <div>Customer Support Team: 07701079246 / 07455025081</div>
            </div>
            <div className="foot">Copyright © 2021 AutoSqueak. All rights reserved.</div>

        </footer>
    )
}

export default Footer
