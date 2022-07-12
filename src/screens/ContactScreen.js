import React from 'react'
import '../css/ContactScreen.css'

function ContactScreen({ history }) {

    return (
        <div className="contact">
          <div className="maxWidth">
				<div className="topTitle">Get in Touch</div>
				<div className="topCont">
				Get in touch with our team via Email & phone, or click the right-bottom corner live chat button to speak to our customer service.
				</div>
			</div>
			<div className="bg">
				<div className="maxWidth flex-center center">
					<div className="content">
						<div className="flex-center lis">
							<input placeholder="Name"  className="iput"/>
						</div>
						<div className="flex-center lis">
							<input placeholder="Email Address"  className="iput"/>
						</div>
						<div className="lis" >
							<textarea className="iput" rows="1" placeholder="Message"></textarea>
						</div>
						<div className="sub">Submit</div>
					</div>
					<div className="care">
						<div className="one">Address</div>
						<div>AutoSqeak</div>
						<div>Unit 12</div>
						<div>14-16 Wadsworth Rd</div>
						<div>London</div>
						<div>UB6 7LD</div>
						<div className="one">Contact Information:</div>
						<div className="tel">07455025081</div>
						<div>info@autosqueak.com</div>
					</div>
				</div>
			</div>
			<div className="bg2">
				<div className="maxWidth flex secctBtn">
					<div className="title">Check Out Our Products</div>
					<div className="btns">Shop Now</div>
				</div>
			</div>
        </div >
    )
}

export default ContactScreen