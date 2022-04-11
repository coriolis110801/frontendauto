import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
// 增加以下代码以使用"自动轮播"功能
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import { useDispatch, useSelector } from 'react-redux'
import LoadSpinner from '../components/LoadSpinner'
import Message from '../components/Message'
import SelectItem from '../components/SelectItem'
import '../css/HomeScreen.css';
import 'swiper/swiper-bundle.min.css';
import {listProducts} from '../actions/productActions'
import { Link } from 'react-router-dom'
SwiperCore.use([ Navigation, Autoplay]);
function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const messageInfo = useSelector(state => state.message)
    
    const {  loading, products, products1 } = productList
    const [nowItem, setNowItem] = useState(null);
    const [show, setShow] = useState(false);
    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])
    function changShow() {

    }
    const selectAddCart = (item, index) => {
        return () => {
            setNowItem(item);
            setShow(true);
        }
    }
    const noFun = () => {
        setNowItem({});
        setShow(false);
    }
    return (
        <div className="home">
            {show?<SelectItem item={nowItem} noFun={noFun}  /> : ''}

            {messageInfo.msg ? <Message variant={messageInfo.variant}>{messageInfo.msg}</Message>:''}
            {loading ? <div className="fullcreen"><LoadSpinner /></div>
                : messageInfo.msg ? ''
                :
                <div>

                    <div className="maxWidth">
                        <div>
                            <div>
                                <div className="car">
                                    <div className="content absolute">
                                        <div className="title">Call to Action</div>
                                        <div className="title">to Go Here</div>
                                        <div className="cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                                        nonlacinia turpis Nunc pretium lacinia dolor ac iaculis Nullam ut viverra velit.
                                        Phasellus quis dui massa. Aliquam leo odio, dictum eu massa non,venenatis vehicula
                                                nunc Curabitur at tincid unt justo, ut tristique odio.</div>
                                        <div className="btn" onClick={changShow}>Shop Now</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="ul-title">What's New?</div>
                                    <div className="uls flex-center">
                                        
                                        {
                                            products&&products.map((item, index) => {
                                                return <div className="ulBox">
                                                            <img src={item.image} />
                                                            <div className="moneytext">{item.name}</div>
                                                            <div className="money">
                                                                
                                                                
                                                                {item.discount!==1?<div><del>£{item.price}</del><span>£{item.discount * item.price}</span></div>:<span>{ item.price}</span>}
                                                                
                                                            </div>
                                                            <div className="flex-center">
                                                                <Link to={'/product/'+item.id} className="btnLeft flex">View Details</Link>
                                                                <div className="flex btnRight" onClick={selectAddCart(item)}>
                                                                    <img src="./images/index/box2.png" className="btnImg" />
                                                                    <div>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
    
    
                                            })
                                        }

                                        
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="swiperTitle">DisCover More</div>
                                 
                                    <Swiper

                                        direction={'horizontal'}

                                        loop={true}
                                        slidesPerView={3}
                                        spaceBetween="-3%"
                                        autoplay
                                        navigation={{
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev',
                                            disabledClass: 'disable'
                                        }}
                                        

                                    >

                                        {
                                            products1&&products1.map((item,index) => {
                                                return  <SwiperSlide><div className="swiperImg">
                                                            <img src={item.image} />
                                                            <div className="name flex">{item.name}</div>
                                                        </div></SwiperSlide>
                                            })
                                        }

                                        
                                        
                                    </Swiper>
                                    <img src="./images/index/left.png" 
                                        className="swiper-button-prev swiper-button " />
                                    <img src="./images/index/right.png" 
                                        className="swiper-button-next swiper-button" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div >
    )
}

export default HomeScreen
