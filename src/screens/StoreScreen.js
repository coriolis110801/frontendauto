import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadSpinner from '../components/LoadSpinner'
import Message from '../components/Message'
import SelectItem from '../components/SelectItem'
import '../css/HomeScreen.css';
import 'swiper/swiper-bundle.min.css';
import { listProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
function StoreScreen({match }) {
    const dispatch = useDispatch()
    const id = match.params.id
    const productList = useSelector(state => state.productList)
    const messageInfo = useSelector(state => state.message)
    const imgs = {
        3: './images/index/carui1.png',
        4: './images/index/carui2.png',
        5: './images/index/carui6.png',
        6: './images/index/carui3.png',
        7: './images/index/carui4.png',
        8: './images/index/carui5.png',
        9: './images/index/carui7.png',
        20: './images/index/carui8.png',
        12: './images/index/carui12.png'
    }
    const { loading, products, title } = productList
    const [nowItem, setNowItem] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(listProducts('',true,id))

    }, [dispatch, id])
 
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
            {show ? <SelectItem item={nowItem} noFun={noFun} /> : ''}

            {messageInfo.msg ? <Message variant={messageInfo.variant}>{messageInfo.msg}</Message> : ''}
            {loading ? <div className="fullcreen"><LoadSpinner /></div>
                : messageInfo.msg ? ''
                    :
                    <div>

                        <div className="maxWidth">
                            <div>
                                <div>
                                    <div>
                                        <div className="ul-title" style={{margin: '0.4rem 0.5rem 0.5rem 0.5rem'}}>{title}</div>
                                        <div className="imgs" style={{height: '3.7rem',background:' url('+imgs[id]+')', marginBottom: '0.6rem'}}></div>
                                        <div className="uls flex-center">

                                            {
                                                products && products.map((item, index) => {
                                                    return <div className="ulBox">
                                                        <Link to={'/product/' + item.id}><img src={item.image} /></Link>
                                                        <div className="money" style={{'justify-content': 'center'}}>{item.name}</div>
                                                        <div className="money">


                                                            {item.discount !== 1 ? <div><del>£{(item.price).toFixed(2)}</del><span style={{color: '#FFC008','marginLeft': '0.2rem'}}>£{(item.discount * item.price).toFixed(2)}</span></div> : <span style={{color: '#FFC008','marginLeft': '0.2rem'}}>£{(item.price).toFixed(2)}</span>}

                                                        </div>
                                                        <div className="flex-center">
                                                            <Link to={'/product/' + item.id} className="btnLeft flex">View Details</Link>
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
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </div >
    )
}

export default StoreScreen
