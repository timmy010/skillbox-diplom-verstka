$(function(){
	// Cлайдер
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
		breakpoints: {
			770: {
				slidesPerView: 2,
				spaceBetween: 35,
			},
			1220: {
				slidesPerView: 3,
				spaceBetween: 30,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			}
		},
	});

	//Анимация 

	new WOW().init();

	// Функции скролла

	function disableScroll() {
		let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
		$('body').addClass("fixed");
		$('body').css('padding-right', paddingOffset);
	}

	function enableScroll() {
		$('body').removeClass("fixed");
		$('body').css('padding-right', '0');
	}

	// Клик по пункту меню

	$('body').on('click', '.menu__link', function(e) {

		if (window.location.pathname=='/') {
			e.preventDefault();
			let whatidoLink = $(this).attr('href');
			document.querySelector(whatidoLink).scrollIntoView({ behavior: 'smooth' });
		}

		if (windowWindth <= 768 && menu.is(':visible')) {
			menu.hide();
			burger.css({
				'backgroundImage' : 'url(../../img/burger.svg)',
				'width' : '24',
			});
			$('.header__container').removeClass('header__container--mobile-menu-opened');
			enableScroll();
			
			let whatidoLink = $(this).attr('href');
			document.querySelector(whatidoLink).scrollIntoView({ behavior: 'smooth' });
		}
		
	});

	// POPUP Форма

	let popupName = $('.popup__input-name'),
		popupPhone = $('.popup__input-phone'),
		popupButton = $('.popup__button'),
		popupComment = $('.popup__textarea-comment'),
		scrollNow = window.pageYOffset; 

	function clearForm() {
		popupName.val('');
		popupPhone.val('');
		popupComment.val('');
	}

	function clearError() {
		popupName.removeClass('popup__error');
		popupPhone.removeClass('popup__error');
		popupButton.next('p').remove();
		popupPhone.next('p').remove();
	}

	function showSmth(whatOpen) {
		whatOpen.fadeIn(100, 'linear');
	}

	function closeSmth(whatClose) {
		whatClose.fadeOut(100, 'linear');
	}

	function showThanks() {
		$('body').append(`
			<div class="message">
				<h3 class="message__title">Спасибо за заявку!</h3>
				<p class="message__text">Я свяжусь с Вами через 5 минут, чтобы обсудить Вашу задачу</p>
			</div>
		`);
		setTimeout(function () {
			closeSmth($('.message'));
			closeSmth($('.popup__container'));
		}, 3000);
	}

	// Вызов формы

	$('.button').on('click', function() {
		clearError();
		showSmth($('.popup__container'));
		scrollNow = window.pageYOffset;
		disableScroll();
	});

	$('.button--callback').on('click', function() {
		showSmth($('.popup__form-callback'));
	});

	$('.button--other').on('click', function() {
		showSmth($('.popup__form'));
	});

	$('.popup__close').click(function() {
		closeSmth($(this).parents('.popup__container'));
		closeSmth($(this).parents('.popup__form'));
		enableScroll();
		window.scrollTo(0, scrollNow);
		return false;
	});
 
	// Закрытие по клавише Esc.
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			closeSmth($('.popup__container'));
			closeSmth($(this).find('.popup__form'));
			enableScroll();
			window.scrollTo(0, scrollNow);
		}
	});

	// Клик по фону, но не по окну.
	$('.popup__container').click(function(e) {
		if ($(e.target).closest('.popup__form').length == 0 && $(e.target).closest('.popup__form-callback').length == 0) {
			closeSmth($(this));
			closeSmth($(this).find('.popup__form'));
			enableScroll();
			window.scrollTo(0, scrollNow);			
		}
	});

	// Form InputMask Plugin

	$(popupPhone).inputmask({
		"mask": "+7 (999) 999-9999",
	});

	//Доработка формы

	function send(form) {
		$.ajax({
			type: "POST",
			url: "../../send.php",
			data: form.serializeArray()
		}).done(function() {
			closeSmth($('.popup__form'));
			showThanks();
		});
	};

	function validationForm(form, popupName, popupPhone){
		popupButton.next('p').remove();

		if (popupName.val().length !== 0 && popupPhone.val().length !== 0) {
			clearError();
			
			if (popupPhone.inputmask("isComplete")){
			  } else {
				popupPhone.addClass('popup__error');
				popupPhone.after(`<p class="popup__error-text">*Поле заполнено неверно!</p>`)
			  }
			send(form);
			clearForm();	  
		} else {
			clearError();
			popupName.addClass('popup__error');
			popupPhone.addClass('popup__error');
			popupButton.after(`<p class="popup__error-text">*Заполните все поля, отмеченные *!</p>`)
			clearForm();
		}
	};

	$('.popup__button').on('click', function(e) {
		e.preventDefault();
		let form = $(this).parents('form');
		popupName = form.find('input[name="name"]');
		popupPhone = form.find('input[name="phone"]');
		validationForm(form, popupName, popupPhone);
	});

	//Адаптивность

	let windowWindth = $(window).width();

	if (windowWindth > 320 && windowWindth <= 1220) {
		$('.portfolio__button').text('Узнать стоимость');
	} else {
		$('.portfolio__button').text('Заказать проект');
	}

	if ($('.popup__form').is(':visible')) {
		disableScroll();
	} else {
		enableScroll();
	}

	if (windowWindth <= 320) {
		mySwiper.slideTo(2);
		$('.swiper-slide').each(function(){
			let link = $(this).find('.swiper-slide__img');
			if (link.attr('src') === 'img/site_det.png') {
				link.attr('src', 'img/site_det-mobile.png');
			}
		});
    } else {
		$('.swiper-slide').each(function(){
			let link = $(this).find('.swiper-slide__img');
			if (link.attr('src') === 'img/site_det.png') {
				link.attr('src', 'img/site_det.png');
			}
		});
	}

	if (windowWindth <= 768) {
		$('.header__button').text('');
		$('.header__burger').css({
			'width' : '24px',
			'height' : '18px',
			'background-size' : '24px 18px',
		});
    } else {
		$('.header__button').text('Заказать звонок');
		$('.header__burger').css({
			'width' : '45px',
			'height' : '45px',
			'background-size' : '45px',
		});
	}

    $(window).resize(function() {
		windowWindth = $(window).width();

		if (windowWindth > 1220) {
			$('.header__menu').css('display', 'block');
		} else {
			$('.header__menu').css('display', 'none');
		}

		if (menu.is(':visible')) {
			$('.header__container').addClass('header__container--mobile-menu-opened');
			disableScroll();
			
			burger.css({
				'backgroundImage' : 'url(../../img/close.svg)',
				'margin-right' : '10px'
			});
		} else {
			$('.header__container').removeClass('header__container--mobile-menu-opened');
			enableScroll();
			
			burger.css({
				'backgroundImage' : 'url(../../img/burger.svg)',
				'margin-right' : '0'
			});
		}

		if ($('.popup__form').is(':visible')) {
			disableScroll();
		} else {
			enableScroll();
		}
		
		if (windowWindth > 320 && windowWindth <= 1220) {
			$('.portfolio__button').text('Узнать стоимость');
		} else {
			$('.portfolio__button').text('Заказать проект');
		}

        if (windowWindth <= 768) {
			$('.header__button').text('');
    	} else {
			$('.header__button').text('Заказать звонок');
		}

		if (windowWindth <= 320) {
			mySwiper.slideTo(2);
			$('.swiper-slide').each(function(){
				let link = $(this).find('.swiper-slide__img');
				if (link.attr('src') === 'img/site_det.png') {
					link.attr('src', 'img/site_det-mobile.png');
				}
			});
		} else {
			$('.swiper-slide').each(function(){
				let link = $(this).find('.swiper-slide__img');
				if (link.attr('src') === 'img/site_det-mobile.png') {
					link.attr('src', 'img/site_det.png');
				}
			});
		}

		if (windowWindth <= 768) {
			$('.header__button').text('');
			$('.header__burger').css({
				'width' : '24px',
				'height' : '18px',
				'background-size' : '24px 18px',
			});
		} else {
			$('.header__button').text('Заказать звонок');
			$('.header__burger').css({
				'width' : '45px',
				'height' : '45px',
				'background-size' : '45px',
			});
		}
	});
	
	//Мобильное меню

	let burger = $('.header__burger'),
		menu = $('.header__menu');
	
	burger.click(function(e){
        e.preventDefault();
        menu.toggle(300, function() {
            if (menu.is(':visible')) {
				$('.header__container').addClass('header__container--mobile-menu-opened')
				disableScroll();
				
                burger.css({
					'backgroundImage' : 'url(../../img/close.svg)',
					'margin-right' : '10px'
				});
            } else {
				$('.header__container').removeClass('header__container--mobile-menu-opened')
				enableScroll();
				
                burger.css({
					'backgroundImage' : 'url(../../img/burger.svg)',
					'margin-right' : '0'
				});
            }
        });
    });
});