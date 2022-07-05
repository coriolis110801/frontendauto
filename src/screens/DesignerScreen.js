import React, { useState, useEffect } from 'react'
import '../css/DesignerScreen.css'
import { hide } from '../actions/headFootAction'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import DesignImg from '../components/DesignImg'
import { Pixie } from "pixie";
function DesignerScreen({ history }) {
	const [tab, setTab] = useState(1)
	const [pixie, setPixie] = useState()
	const [imgBase64Front, setImgBase64Front] = useState('')
	const [imgBase64Back, setImgBase64Back] = useState('')
	const [backState, setBackState] = useState()
	const [frontState, setFrontState] = useState()
	const [showPreview, setShowPreview] = useState(true)
	const [show, setShow] = useState(false)
	const [towimgbase64data, setTowimgbase64data] = useState()
	const designInfo = useSelector(state => state.designInfo)
	const messageInfo = useSelector(state => state.message)
	const dispatch = useDispatch()
	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin
	console.log(designInfo, designInfo.fresheners.image);




	let pixieUrl = 'https://www.autosqueak.com', //配置域名
	cW = 1278,	//初始画布宽高
	cH = 723,

	imgArr = [
	  {
		url: designInfo.fresheners.image,  //配置显示照片
		thumbnail: designInfo.fresheners.image,
	  },
	];
	useEffect(() => {
		let productname = ''
  
		let imgName = ''
		if (imgName == "") {
		  imgName = 'Untitled'
		}
		const imgObj = new Image()
		imgObj.setAttribute('crossOrigin', 'anonymous');
		imgObj.onload = function (e) {
			//画图
			const canvas = document.createElement('canvas')
			canvas.width = imgObj.width
			canvas.height = imgObj.height
			
			let ctx = canvas.getContext('2d')
			console.log(canvas,ctx,789,e)
			ctx.clearRect(0,0,canvas.width, canvas.height)
			
			ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
			const data = canvas.toDataURL('image/png');
			setImgBase64Front(data);
			setImgBase64Back(data);
			let init = ()=> {
				let options = {
					selector: '#container',
					// 初始化画图插件
					watermarkText: 'Pixie Demo',
					baseUrl: "",
					image: data,
					tools: {
					  resize: {
						maxWidth: 360,
						maxHeight: 360
					  },
					  export: {
						defaultFormat: 'png', //png, jpeg or json
						defaultName: 'image', //default name for downloaded photo file
						defaultQuality: 1, //works with jpeg only, 0 to 1
					  },
					  stickers: {
						replaceDefault: true,
						items: [
						  {
							name: 'emoticons',
							list: ['happy', 'sad', 'angry'],
							type: 'svg',
							thumbnailUrl: 'images/stickers/emoticons/happy.svg'
						  },
						  {
							name: 'xin',
							list: ['ma', 'niu'],
							type: 'svg',
							thumbnailUrl: 'images/stickers/xin/niu.svg'
						  },
						  {
							name: 'socialmedia',
							list: ['Facebook', 'Instagram1', 'Instagram2', 'Instagram3', 'google', 'google2', 'Linkedin', 'Snapchat'],
							type: 'svg',
							thumbnailUrl: 'images/stickers/socialmedia/Facebook.svg'
						  },
						  {
							name: 'flags',
							list: ['England', 'Kurdistan', 'Albania', 'France', 'Germany','Italy'],
							type: 'svg',
							thumbnailUrl: 'images/stickers/flags/England.svg'
						  },
						  {
							name: 'text',
							list: ['Open 7 days', 'Thanks for your custom', 'Find us on', 'Full Valets', 'Mini Valets','9AM-6PM', 'Buffing polish', 'Your local car wash', 'Your valeting specialist', 'warning1','warning2'],
							type: 'svg',
							thumbnailUrl: 'images/stickers/text/phrase.svg'
						  },
						  {
							name: 'icon',
							list: ['email1', 'email2', 'home1', 'home2', 'phone1', 'phone2', 'phone3'],
							type: 'svg',
							thumbnailUrl: 'images/stickers/icon/home1.svg'
						  },
						]
					  }
					},
					ui: {
					  allowZoom: true,
					  toolbar: {
						replaceDefaultLeftItems: true,
						replaceDefaultCenterItems: true,
						replaceDefaultRightItems: true,
						leftItems: [
						  {
							type: 'button',
							showInCompactMode: true,
							text: imgName,
							icon: 'edit',
							action: function (event) {
							  window.event.cancelBubble = true;
							  
							}
						  },
						  {
							type: 'button',
							showInCompactMode: true,
							icon: 'image-fill',
							text: '添加图片',
							action: 'openOverlayImage'
						  },
						  {
							type: 'button',
							text: ''
						  },
						],
						centerItems: [
						  {
							type: 'zoomWidget',
							showInCompactMode: true,
							condition: {'tools.zoom.allowUserZoom': true},
						  },
						 
		  
						],
						rightItems: [
						  {
							type: 'button',
							icon: 'undo',
							action: function () {
							 
							  //pixie.getTool('history').undo()
							}
						  },
						  {
							type: 'button',
							icon: 'redo',
							action: function () {
							  //pixie.getTool('history').redo()
							}
						  },
		  
						  {
							type: 'button',
							text: 'Preview',
							icon: 'eye-fill',
							showInCompactMode: true,
							action: function () {
							  
							}
						  },
		  
						]
					  },
					  nav: {
						position: 'top',
						replaceDefault: true,
						items: [
						  {name: 'text', icon: 'images/text-box-custom.svg', action: 'text'},
						  {
							name: 'add-image', icon: 'images/image-fill.svg', action: function () {
							 
							}
						  },
						  {name: 'background', icon: 'images/background-custom.svg', action: 'background'},
						  {name: 'stickers', icon: 'images/sticker-custom.svg', action: 'stickers'},
						  {name: 'merge', icon: 'images/merge-custom.svg', action: 'merge'},
						  {
							name: 'Duplicate to Other Side', icon: 'images/bag-push.svg', action: function () {
							 
							}
						  },
						]
					  },
					  openImageDialog: {
						
					  },
					},
		  
		  
					onLoad: function () {
						
						
					  
					},
		  
		  
					onMainImageLoaded: function () {
						
						//let resizeTool = pixie.getTool('resize');
						//resizeTool.apply(cW, cH, false);
					  //console.log(cW, cH);
					}
				}
				Pixie.init(options).then(instance=>{
					setPixie(instance);
					if(instance) {
						let stateData = instance.getState()
						console.log(stateData,'stateData')
						if(stateData) {
							setBackState(JSON.parse(JSON.stringify(stateData)))
							setFrontState(JSON.parse(JSON.stringify(stateData)))
						}
					}
					
				})
			}
			init('#container')
		}
		imgObj.src = designInfo.fresheners.image
		
		
		dispatch(hide())
	}, [dispatch, designInfo])
	////两图合并
	const drawAndShareImage = (e) => {
		if(pixie) {
			if(tab == 1) {
				setImgBase64Front(pixie.tools.export.getDataUrl())
				
			}else {
				setImgBase64Back(pixie.tools.export.getDataUrl())
			}
		}
		let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = 800; // 400
        canvas.height = 300; // 150

        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#fff";
        context.fill();

        let frontImage = new Image();
        frontImage.src =  imgBase64Front;
        frontImage.crossOrigin = 'Anonymous';
        frontImage.onload = function () {
          let w = 400, h = 400 * frontImage.height / frontImage.width
          let y = (300 - h) / 2
          context.drawImage(frontImage, 0, y, w, h);
			
        }

        let backImage = new Image();
        backImage.src = imgBase64Back;   //你自己本地的图片或者在线图片
        backImage.crossOrigin = 'Anonymous';
        backImage.onload = function () {
          let w = 400, h = 400 * backImage.height / backImage.width
          let y = (300 - h) / 2
          context.drawImage(backImage, 400, y, w, h);

          let base64 = canvas.toDataURL("image/png");
		  setTowimgbase64data(base64)
		  setShow(true)
        }
	}

	// 上传数据的函数
	const upload = () => {
        if (imgBase64Front === '' || imgBase64Back === '') {
          //document.getElementById('bt-shop').innerHTML = '请确保正反面都应用了变更'
          return false;
		}
		return true
	}
	const cancelBubble = () => {
		window.event.cancelBubble = true
	}
	const toggle = (num) => {
		return (e) => {
			e.stopPropagation();
			setTab(num)
			if(num == 1) {
				if(pixie) {
					
					let backState = pixie.getState()
					if(backState) setBackState(JSON.parse(JSON.stringify(backState)))
					setImgBase64Back(pixie.tools.export.getDataUrl())
					if(frontState) pixie.tools.import.loadState(frontState)
				}
			}else {
				if(pixie) {
					let frontState = pixie.getState()
					setImgBase64Front(pixie.tools.export.getDataUrl())
					if(frontState) setFrontState(JSON.parse(JSON.stringify(frontState)))
					if(backState) pixie.tools.import.loadState(backState)
				}
			}
		}
	}
	
	const AddBasket = (e) => {
		e.preventDefault();
		console.log(upload(),99)
		if(upload()){
			//上传数据的函数后
			drawAndShareImage()

		}
	}

	return (
		<div className="DesignerScreen">
			 {show?<DesignImg noFun={()=>{setShow(false)}} okFun={upload} ><div style={{fontSize: '36px'}}>ADD TO CART</div>< img src={towimgbase64data} /></DesignImg> : ''}
			<div id="preview-wrap" onClick={toggle(1)} style={{ display: showPreview ? 'none' : 'block' }}>
				<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<div onClick={cancelBubble}
						style={{ background: '#fff', width: '800px', boxShadow: '0 5px 15px rgb(0 0 0 / 50%)' }}>
						<div style={{ display: 'line-block', fontSize: '36px', color: '#9f9f9f', padding: '16px 0', textAlign: 'center' }}>
							Note: Please click apply after operation.

						</div>
						<img id="testdiv" src="./images/design/fgh.gif" style={{ width: '100%', height: '50vh' }} />
						<div style={{ clear: 'both' }}></div>
						<div style={{ borderTop: '1px solid #e5e5e5', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
							<div style={{ fontSize: '14px' }}></div>
							<div className="save-btn" onClick={()=>setShowPreview(false)}>Back to Design</div>

						</div>
					</div>
				</div>
			</div>
			<div className="preview__header" data-view="ctaHeader" data-item-id="10721475" style={{ position: 'fixed', width: '100%', top: 0 }}>
				<div id="js-preview__actions" className="preview__actions">
					<div className="preview__action--buy">
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<a href="#"><div className="logo"></div></a>
							<div className="toggle-wrap">
								<div style={{ background: '#FFC008' }} onClick={toggle(1)} id="front">Front Design</div>
								<div style={{ background: '#87CAD2' }} onClick={toggle(2)} id="rear">Rear Design</div>
							</div>

							<a className="header-buy-now e-btn--3d -color-primary" onClick={AddBasket} id="endbtn">Add To Basket</a>
							<img id="end1btn" src="" className="header-buy-now e-btn--3d -color-primary" width="90" height="40" style={{ display: 'none' }} />
						</div>

					</div>
				</div>
			</div>
			<div id="container" style={{ marginTop: '54px', height: 'calc(100vh - 54px)' }} />
		</div>
	)
}

export default DesignerScreen
