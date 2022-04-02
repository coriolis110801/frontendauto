import React, { useState } from 'react'
import '../css/OrderScreen.css'

function OrderScreen({ history }) {

	return (
		<div class="right OrderScreen">
			<div class="topName flex-center">
				<div class="welcome font-normal">My Orders</div>
			</div>
			<div class="detail">
				Here you could easily manage your past orders and billing.
					</div>
			<div class="flex-between selectItem">
				<form method="get" class="flex radio-wrap">
					<label class="labelItem">All Orders<input type="radio" name="cheakRadios" /></label>
					<label class="labelItem">Unpaid<input type="radio" name="cheakRadios" /></label>
					<label class="labelItem">Pending<input type="radio" name="cheakRadios" /></label>
					<label class="labelItem">Delivered<input type="radio" name="cheakRadios" /></label>
					<label class="labelItem">Completed<input type="radio" name="cheakRadios" /></label>
				</form>
				<div class="layui-form flex-center selects">
					<div className="SortBy">Sort by:</div>
					<select class="downPutOne lis">
						<option value="volvo">Lowest Price First</option>
						<option value="saab">Saab</option>
						<option value="opel">Opel</option>
						<option value="audi">Audi</option>
					</select>

				</div>
			</div>
			<div class="main-wrap">
				<div class="paging-content">
					<ul class="pageItem paging1 active">
						<li id="swiper_box">
						

							{/* <div class="basket-contents" >
								<div class="title maxWidth">Your Basket</div>
								<div class="basket-form maxWidth">
									<div class="basket-top-time flex-between">
										<div>Date Ordered: 19/10/2021,19:17 ● Order Number:#31</div>
										<img src="./images/index/errs.png"
											className="err" />
									</div>
									<div class="basket-content"
									>
										<div class="flex-between basket-content-item">
											<img src="./images/index/box1.png"
												className="box1" />
											<div class="flex-between basket-center-content productInfo"
											>
												<div>Product Name Here</div>
												<div>1</div>
												<div>£00.00</div>
												<div>
													<div className="textGreen">To Pay and Deliver</div>
													<div>50 Auto Squeak Rood</div>
													<div>Leeds,West Yorkshire</div>
													<div>LS15 4TA</div>
												</div>
												<div className="nowPrice">£00.00</div>
												<div>
													<div class="basket-btn"
														className="payNow">Pay Now</div>
													<div class="basket-btn">Amend</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="basket-formTwo maxWidth">
									<div class="basket-formTwo-title">
										<img class="swiper-pre" src="./images/index/left-l.png" />
										<div class="dot active"></div>
										<div class="dot"></div>
										<div class="dot"></div>
										<div class="dot"></div>
										<div class="dot"></div>
										<div class="dot"></div>
										<img class="swiper-next" src="./images/index/right-l.png" />
									</div>
									<div class="basket-swiper-container">
										<div class="swiper-wrapper">
											<div class="swiper-slide">
												<div class="basket-formTwo-name">
													Item
														</div>
												<div class="basket-formTwo-content">
													<div class="flex">
														<img src="./images/index/box1.png"
															class="basket-goods-img" />
														<div className="flex"></div>
														<div class="basket-goods-desc">
															<div>Product Name Here</div>
														</div>
													</div>
												</div>
											</div>
											<div class="swiper-slide">
												<div class="basket-formTwo-name">
													Quantity
														</div>
												<div class="basket-formTwo-content">
													<div class="flex">
														<img src="./images/index/box1.png"
															class="basket-goods-img" />
														<div className="flex"></div>
														<div class="basket-goods-desc">
															<div>1</div>
														</div>
													</div>
												</div>
											</div>
											<div class="swiper-slide">
												<div class="basket-formTwo-name">
													Price
														</div>
												<div class="basket-formTwo-content">
													<div class="flex">
														<img src="./images/index/box1.png"
															class="basket-goods-img" />
														<div className="flex"></div>
														<div class="basket-goods-desc">
															<div>£00.00</div>
														</div>
													</div>
												</div>
											</div>
											<div class="swiper-slide">
												<div class="basket-formTwo-name">
													Status
														</div>
												<div class="basket-formTwo-content">
													<div class="flex">
														<img src="./images/index/box1.png"
															class="basket-goods-img" />
														<div className="flex"></div>
														<div class="basket-goods-desc">
															<div className="textGreen">To Pay and Deliver</div>
															<div>50 Auto Squeak Rood</div>
															<div>Leeds,West Yorkshire</div>
															<div>LS15 4TA</div>
														</div>
													</div>
												</div>
											</div>
											<div class="swiper-slide">
												<div class="basket-formTwo-name">
													Total
														</div>
												<div class="basket-formTwo-content">
													<div class="flex">
														<div>£00.00</div>
													</div>
												</div>
											</div>
											<div class="swiper-slide">
												<div class="basket-formTwo-name">
													Actions
														</div>
												<div class="basket-formTwo-content">
													<div class="flex">
														<img src="./images/index/box1.png"
															class="basket-goods-img" />
														<div className="flex"></div>
														<div class="basket-goods-desc">
															<div class="basket-btn"
																className="payNow">Pay
																		Now</div>
															<div class="basket-btn">Amend</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="basket-formTwo-footer"
									>
										<div>
											<div>Data Ordered:19/10/2021</div>
											<div>19:17 ● Order</div>
											<div>Number:#31</div>
										</div>
										<img src="./images/index/errs.png"
											className="err" />
									</div>
								</div>
							</div>

							 */}


						</li>
					</ul>
					<ul class="pageItem paging2">
						<li></li>
					</ul>
					<ul class="pageItem paging3">
						<li></li>
					</ul>
					<ul class="pageItem paging4">
						<li></li>
					</ul>
					<ul class="pageItem paging5">
						<li></li>
					</ul>
					<ul class="pageItem paging6">
						<li></li>
					</ul>
					<ul class="pageItem paging7">
						<li></li>
					</ul>
					<ul class="pageItem paging8">
						<li></li>
					</ul>
					<ul class="pageItem paging9">
						<li></li>
					</ul>
					<ul class="pageItem paging10">
						<li></li>
					</ul>
					<ul class="pageItem paging11">
						<li></li>
					</ul>
					<ul class="pageItem paging12">
						<li></li>
					</ul>
					<ul class="pageItem paging13">
						<li></li>
					</ul>
					<ul class="pageItem paging14">
						<li></li>
					</ul>
					<ul class="pageItem paging15">
						<li></li>
					</ul>
					<ul class="pageItem paging16">
						<li></li>
					</ul>
					<ul class="pageItem paging17">
						<li></li>
					</ul>
					<ul class="pageItem paging18">
						<li></li>
					</ul>
					<ul class="pageItem paging19">
						<li></li>
					</ul>
					<ul class="pageItem paging20">
						<li></li>
					</ul>
					<ul class="pageItem paging21">
						<li></li>
					</ul>
				</div>
				<div class="result-text result-text-mb">Results: 1 - 4 of 20</div>
				<div class="paging flex">
					<div class="result-text result-text-pc">Results: 1 - 4 of 20</div>
					<span class="prev"></span>
					<div class="page-btn">
						<ul class="btn-list">
							<li class="active">1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li>8</li>
							<li>9</li>
							<li>10</li>
							<li>11</li>
							<li>12</li>
							<li>13</li>
							<li>14</li>
							<li>15</li>
							<li>16</li>
							<li>17</li>
							<li>18</li>
							<li>19</li>
							<li>20</li>
						</ul>
					</div>
					<span class="next"></span>
				</div>
			</div>
		</div>
	)
}

export default OrderScreen
