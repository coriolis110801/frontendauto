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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nonlacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio.
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nonlacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio.
					</div>
					<div className="secctItem">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nonlacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio.
					</div>
				</div>
				<div>
					<div className="topTitle">Get in Touch</div>
					<div className="topCont">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nonlacinia turpis. Nunc pretium lacinia dolor ac iaculis. Nullam utviverra velit. Phasellus quis dui massa. Aliquam leo odio, dictum eumassa non, venenatis vehicula nunc. Cu rabitur at tincidunt justo, uttristique odio.
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
