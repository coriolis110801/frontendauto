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
                    <div className="btmUl">Comtact</div>
                    <div className="btmUl">Delivery & Returns</div>
                    <div className="btmUl">Terns & Conditions</div>
                    <div className="btmUl">Privacy Policy</div>
                </div>
                <div>Contact Details to Go Here</div>
            </div>
            <div className="foot">All Content @ 2021 Auto Clean. Company Information to Go Here.</div>

        </footer>
    )
}

export default Footer
