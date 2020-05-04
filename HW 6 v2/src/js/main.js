$(function(){
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
});