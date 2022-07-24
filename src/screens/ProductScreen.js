import React, { useState, useEffect } from 'react'
import LoadSpinner from '../components/LoadSpinner'
import Message from '../components/Message'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
// 增加以下代码以使用"自动轮播"功能
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails,queryProductTotal } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import Confirm from '../components/Confirm'
import SelectItem from '../components/SelectItem'
import '../css/ProductScreen.css'
SwiperCore.use([ Navigation]);
function ProductScreen({ match, history }) {
    // image
    const [image, setImage] = useState('')
    const [productId, setProductId] = useState(match.params.id)
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState('');
    const [combo, setCombo] = useState('');
    const [tip, setTip] = useState('');
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    const productList = useSelector(state => state.productList)
    const { loading2, products } = productList
    const [slidesPerView,setSlidesPerView] = useState(4)
    const [nowItem, setNowItem] = useState(null);
    const [show, setShow] = useState(false);
    useEffect(() => {

        dispatch(listProductDetails(productId))
        if(!products || products.length==0)dispatch(listProducts(''))
        resize()
        window.onresize = resize
    }, [dispatch, productId])
    const resize = () => {
        let w = window.innerWidth*1
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
    const addCart = ()=>{
        if(!color) {
            //please choose type
            setTip('please choose type');
            return;
        }
        if(!combo) {
            setTip('please choose combo');
            return;
        }
        dispatch(addToCart(product.info, qty, color, combo));
    }
    const changeIptHandle = (key) => {
        return (e) => {
            
            if(key == 'color') {
                setColor(e.target.value);
                dispatch(queryProductTotal( e.target.value, combo, product))
            }else if(key == 'combo') {
                setCombo(e.target.value);
                dispatch(queryProductTotal( color, e.target.value, product))
            }
        }
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
    const goBack = () => {
        history.goBack()
    }
    return (
        <div className="product">
            {show ? <SelectItem item={nowItem} noFun={noFun} /> : ''}
            {tip&&<Confirm okFun={()=>setTip('')}   tip={tip} confirmText="OK" />}
            {loading || loading2 ? <div className="fullcreen"><LoadSpinner /></div>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <div className="maxWidth">
                            <div className="mob-title">
                                <div className="product-name">Product Name Here</div>
                                <div className="flex-center">
                                    <a style={{cursor: 'pointer'}} onClick={goBack}>
                                        <div className="new-btn">GO BACK</div>
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
                                        <a style={{cursor: 'pointer'}} onClick={goBack}>
                                            <div className="new-btn">GO BACK</div>
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
                                            <select className="downPutOne lis" value={color} onChange={changeIptHandle('color')}>
                                                <option value="">Please Choose</option>
                                                {
                                                    product&&product.colors&&product.colors.map((item,index) => {
                                                        return <option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div className="layui-form lis">
                                            <select className="downPutOne lis"  value={combo} onChange={changeIptHandle('combo')}>
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
                                            <div className="quantity-btn" onClick={()=>setQty(qty-1>0?(qty-1) : 1)}>-</div>
                                            <input type="text" onChange={(e)=>setQty(e.target.value*1 || 1)} value={qty} />
                                            <div className="quantity-btn" onClick={()=>setQty((qty+1)>product.ftotal ? product.ftotal : (qty+1))}>+</div>
                                        </div>
                                        {
                                            product.ftotal > 0 ? <div className="stock-pc inStock">
                                                <img src="./images/index/gou.png" />
                                                <div>In stock</div>
                                            </div>:<div className="stock-mb notInStock">
                                                <img src="./images/index/cha.png" />
                                                <div>Not in stock</div>
                                            </div> 
                                        }
                                        
                                        {
                                            product&&product.info?
                                            <div className="flex-center goods-price">
                                                {
                                                    product.info.discount==1?'':<div className="del-price">£{(product.info.price * qty).toFixed(2)}</div>
                                                }
                                                
                                                <div className="now-price">£{(product.info.price * product.info.discount * qty).toFixed(2)}</div>
                                            </div>
                                            :''
                                        }
                                        
                                        <div className="add-basket-btn" onClick={addCart}>
                                                            Add to Basket
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
                                            products&&products.map((item,index) => {
                                                return  <SwiperSlide><div  style={{marginLeft: '15%'}}>
                                                            <div className="swiperImg">
                                                                <img src={item.image} />
                                                            </div>
                                                            <div className="swiper-price">£{item.discount===1?item.price:((item.price*item.discount).toFixed(2))}</div>
                                                            <div className="swiper-btn-wrap flex-center">
                                                                <Link onClick={handleLink(item.id)} to={'/product/'+item.id} className="btnLeft flex">View Details</Link>
                                                                <div className="flex btnRight" onClick={selectAddCart(item)}>
                                                                    <img src="./images/index/box2.png" className="btnImg" />
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
