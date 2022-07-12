import React from 'react'
import '../css/AboutScreen.css'

function About({ history }) {

    return (
        <div className="about">
           <div className="bgAbout">
				<div className="top maxWidth">
					<img src="./images/index/car1.png" className="aboutCar" />
					<div className="aboutCont">
						<div className="topName">About Us</div>
						<div>
						AutoSqueak is a leading supplier of car cleaning products. AutoSqueak is strongly committed to customer care & shopping experience, and our continual devotion to product research & development will always ensure we create the best value for our customers.
						</div>
					</div>
					<div className="aboutCarTwo">
						<img src="./images/index/car1.png"   />
					</div>
				</div>
			</div>
			<div className="maxWidth">
				<div className="secction flex">
					<div className="secctItem mr1">
						Head office and branches are open from 9am to 6pm Monday to Friday, and our team will be happy to advise on our products.
					</div>
					<div className="secctItem">
						For information call us on 07701079246 / 07455025081 to speak to one of our dedicated team.
					</div>
				</div>
				<div>
					<div className="topTitle">Get in Touch</div>
					<div className="topCont">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nonlacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio3.
					</div>
				</div>
			</div>
			<div className="operate">
				<div className="flex secctBtn maxWidth">
					<div className="title">Check Out Our Products</div>
					<div className="btns">Shop Now</div>
				</div>
			</div>
        </div >
    )
}

export default About