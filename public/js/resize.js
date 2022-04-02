(function(win, doc) {
	function initNav() {
		var navItemList = $('.nav-item')
		console.log($('.nav'),999)
		$('.nav').on('click', '.nav-item', function() {
			navItemList.removeClass('active')
			$(this).addClass('active')
		})
		$('.shop-nav').on('mouseenter', function() {
			$('.imgUl').stop().slideDown(100)
		})
		$('.shop-nav').on('mouseleave', function() {
			$('.imgUl').stop().slideUp(100)
		})
		$('.all').on('click', function() {
			$('.right-menu').stop().fadeIn()
			$('header .mask').stop().fadeIn()
		})
		$('header .mask').on('click', function() {
			$('.right-menu').stop().fadeOut()
			$(this).stop().fadeOut()
		})
	}
	window.onload = function() {
		this.console.log(111)
		initNav();
	}
	if (!win.addEventListener) return;
	var html = document.documentElement;

	function setFont() {
		var cliWidth = html.clientWidth;
		if (cliWidth > 640) {
			cliWidth = 640;
		}
		html.style.fontSize = 100 * (cliWidth / 640) + "px";
	}
	win.addEventListener("resize", setFont, false);
	doc.addEventListener("DOMContentLoaded", setFont, false);
	
	
})(window, document);
