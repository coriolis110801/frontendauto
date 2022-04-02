import React from 'react'
import '../css/ContactScreen.css'

function ContactScreen({ history }) {

    return (
        <div className="contact">
          <div className="maxWidth">
				<div className="topTitle">Get in Touch</div>
				<div className="topCont">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nonlacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio.
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
						<div>Address Line1</div>
						<div>Address Line2</div>
						<div>City</div>
						<div>Postcode</div>
						<div className="one">Contact Information:</div>
						<div className="tel">0113 000 000</div>
						<div>address@mail.com</div>
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
