import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer(props) {
    console.log('footer', props)
    return (
        <footer>
            <div className="bottom">
                <img src="./images/index/logo1.png" className="botmImg" />
                <div className="flex bottomBox">
                    <div className="btmUl">About</div>
                    <div className="btmUl">Contact</div>
                    <div className="btmUl">Delivery & Returns</div>
                    <div className="btmUl">Terms & Conditions</div>
                    <div className="btmUl">Privacy Policy</div>
                </div>
                <div>Customer Support Team: 07701079246 / 07455025081</div>
            </div>
            <div className="foot">Copyright © 2021 AutoSqueak. All rights reserved.</div>

        </footer>
    )
}

export default Footer
