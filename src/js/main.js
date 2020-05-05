$(function(){
	// Слайдер
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// Плавный скролл якорей

	$('body').on('click', '.menu__link', function(e) {
		e.preventDefault();
		let whatidoLink = $(this).attr('href');
		document.querySelector(whatidoLink).scrollIntoView({ behavior: 'smooth' });
	});

	// POPUP Форма

	// Вызов формы

	$('.button').on('click', function(e) {
		e.preventDefault();
		$('.popup__container').fadeIn();
		$("body").addClass("fixed");
	});

	$('.popup__close').click(function() {
		$(this).parents('.popup__container').fadeOut();
		$("body").removeClass("fixed");
		return false;
	});        	
 
	// Закрытие по клавише Esc.
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup__container').fadeOut();
		}
	});
	
	// Клик по фону, но не по окну.
	$('.popup__container').click(function(e) {
		if ($(e.target).closest('.popup__form').length == 0) {
			$(this).fadeOut();				
		}
	});
});