import React, { useState, useEffect } from 'react'
import LoadSpinner from '../components/LoadSpinner'
import Message from '../components/Message'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
// 增加以下代码以使用"自动轮播"功能
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { Link } from 'react-router-dom'
import '../css/ProductScreen.css'
SwiperCore.use([ Navigation]);
function ProductScreen({ match }) {
    // image
    const [image, setImage] = useState('')
    const [productId, setProductId] = useState(match.params.id)
    
   
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    const [slidesPerView,setSlidesPerView] = useState(4)
    useEffect(() => {

        dispatch(listProductDetails(productId))
        resize()
        window.onresize = resize
    }, [dispatch, productId])
    const resize = () => {
        let w = window.innerWidth*1
        console.log(w)
        if(w<540){
            setSlidesPerView(1)
        }else if(w< 640){
            setSlidesPerView(2)
        }else if(w<935) {
            setSlidesPerView(3)
        }else {
            setSlidesPerView(4)
        }
    }
    const handleImg = (e) => {
        setImage(e.target.src);
    }
    const handleLink = (productId) => {
        return () => {
            setProductId(productId);
        }
    }
    return (
        <div className="product">
            {loading ? <div className="fullcreen"><LoadSpinner /></div>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <div className="maxWidth">
                            <div className="mob-title">
                                <div className="product-name">Product Name Here</div>
                                <div className="flex-center">
                                    <a href="###">
                                        <div className="new-btn">New</div>
                                    </a>
                                    <a href="###">
                                        <div className="buy-btn">Buy One Get One Free</div>
                                    </a>
                                </div>
                            </div>

                            <div className="top-wrap" >
                                <div className="left">
                                    <div className="scroll-content">
                                        <div className="scroll-content-wrap">
                                            <div className="left-swiper-container">
                                                <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                {
                                                        product&&product.imgs && product.imgs.map(item => {
                                                            return  <div className="small-img"><img onClick={handleImg}  src={item} /></div>
                                                                
                                                        })
                                                        
                                                    }
                                                     </div>
                                                    
                                                </div>
                                                <div className="swiper-scrollbar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pro-img-box">
                                        <div className="product-img">
                                            <img className="main-img" src={image?image:(product&&product.info && product.info.image)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="left-mob">
                                    <div className="product-img">
                                    <img className="main-img" src={image?image:(product&&product.info && product.info.image)} />
                                    </div>
                                    <div className="scroll-imgs">
                                        
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="product-name">Product Name Here</div>
                                    <div className="flex-center">
                                        <a href="###">
                                            <div className="new-btn">New</div>
                                        </a>
                                        <a href="###">
                                            <div className="buy-btn">Buy One Get One Free</div>
                                        </a>
                                    </div>
                                    <div className="black">
                                        <div className="goods-desc">
                                            <div className="sku-here" >Details:</div>
                                            <div>
                                               {product&&product.info&&product.info.info}
							                </div>
                                        </div>
                                        <div className="layui-form lis">
                                            <select className="downPutOne lis">
                                                <option value="">Please Choose</option>
                                                {
                                                    product&&product.colors&&product.colors.map((item,index) => {
                                                        return <option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div className="layui-form lis">
                                            <select className="downPutOne lis">
                                                <option value="">Please Choose</option>
                                                {
                                                    product&&product.combos&&product.combos.map((item,index) => {
                                                        return <option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div className="quantity-input flex-center">
                                            <div className="quantity-label">Quantity:</div>
                                            <div className="quantity-btn">-</div>
                                            <input type="text" value="1" />
                                            <div className="quantity-btn">+</div>
                                        </div>

                                        <div className="stock-mb notInStock">
                                            <img src="./img/index/cha.png" />
                                            <div>Not in stock</div>
                                        </div>
                                        {
                                            product&&product.info?
                                            <div className="flex-center goods-price">
                                                <div className="del-price">£{product.info.price}</div>
                                                <div className="now-price">£{product.info.price * product.info.discount}</div>
                                            </div>
                                            :''
                                        }
                                        
                                        <a href="###">
                                            <div className="add-basket-btn">
                                                                Add to Basket
                                            </div>
                                        </a>
                                        <div className="stock-pc inStock">
                                            <img src="./images/index/gou.png" />
                                            <div>In stock</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="also-like">You May Also Like...</div>
                                 
                                    <Swiper

                                        direction={'horizontal'}

                                        loop={true}
                                        slidesPerView={slidesPerView}
                                        spaceBetween="-3%"
                                        
                                        navigation={{
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev',
                                            disabledClass: 'disable'
                                        }}
                                        

                                    >

                                        {
                                            product&&product.products&&product.products.map((item,index) => {
                                                return  <SwiperSlide><div  style={{marginLeft: '15%'}}>
                                                            <div class="swiperImg">
                                                                <img src={item.image} />
                                                            </div>
                                                            <div class="swiper-price">£{item.discount===1?item.price:(item.price*item.discount)}</div>
                                                            <div class="swiper-btn-wrap flex-center">
                                                                <Link onClick={handleLink(item.id)} to={'/product/'+item.id} className="btnLeft flex">View Details</Link>
                                                                <div class="flex btnRight">
                                                                    <img src="./images/index/box2.png" class="btnImg" />
                                                                    <div>+</div>
                                                                </div>
                                                            </div>
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
            }
        </div >
    )
}

export default ProductScreen
