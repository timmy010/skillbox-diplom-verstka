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

	// Плавный скролл якорей

	$('body').on('click', '.menu__link', function(e) {
		e.preventDefault();
		let whatidoLink = $(this).attr('href');
		document.querySelector(whatidoLink).scrollIntoView({ behavior: 'smooth' });
	});

	// Клик по пункту мобильного меню

	$('body').on('click', '.menu__link', function(e) {
		e.preventDefault();

		if (windowWindth <= 768 && menu.is(':visible')) {
			menu.hide();
			burger.css({
				'backgroundImage' : 'url(../../img/burger.svg)',
				'width' : '24',
			});
			$('.header__container').removeClass('header__container--mobile-menu-opened')
			$('body').removeClass('fixed');
			
			let whatidoLink = $(this).attr('href');
			document.querySelector(whatidoLink).scrollIntoView({ behavior: 'smooth' });
		}
		
	});

	// POPUP Форма

	let popupName = $('.popup__input-name'),
		popupPhone = $('.popup__input-phone'),
		popupComment = $('.popup__textarea-comment');

	// Вызов формы

	$('.button').on('click', function(e) {
		e.preventDefault();
		$('.popup__container').fadeIn(100, 'linear');
		$("body").addClass("fixed");
	});

	$('.popup__close').click(function() {
		$(this).parents('.popup__container').fadeOut(100, 'linear');
		$("body").removeClass("fixed");
		return false;
	});        	
 
	// Закрытие по клавише Esc.
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup__container').fadeOut(100, 'linear');
			$("body").removeClass("fixed");
		}
	});

	// Клик по фону, но не по окну.
	$('.popup__container').click(function(e) {
		if ($(e.target).closest('.popup__form').length == 0) {
			$(this).fadeOut(100, 'linear');
			$("body").removeClass("fixed");				
		}
	});

	// Form InputMask Plugin

	$(popupPhone).inputmask({
		"mask": "+7 (999) 999-9999",
	});

	// Доработка формы

	function clearForm() {
		popupName.val('');
		popupPhone.val('');
		popupComment.val('');
	}

	function send() {
		$.ajax({
			type: "POST",
			url: "../../send.php",
			data: $('.popup__form').serializeArray()
		}).done(function() {
			console.log('Аякс отправлен');
			alert('Спасибо! Ваша заявка принята.');
			$(this).find('input').val('');
			$('.popup__form').trigger('reset');
		});
	};

	function validationForm(){
		popupComment.next('p').remove();

		if (popupName.val().length !== 0 && popupPhone.val().length !== 0) {
			popupName.removeClass('popup__error');
			popupPhone.removeClass('popup__error');
			popupComment.next('p').remove();
			popupPhone.next('p').remove();
			
			if (popupPhone.inputmask("isComplete")){
			  } else {
				popupPhone.addClass('popup__error');
				popupPhone.after(`<p class="popup__error-text">*Поле заполнено неверно!</p>`)
			  }
			send();  
			clearForm();	  
		} else {
			popupComment.next('p').remove();
			popupPhone.next('p').remove();
			popupName.addClass('popup__error');
			popupPhone.addClass('popup__error');
			popupComment.after(`<p class="popup__error-text">*Заполните все поля, отмеченные *!</p>`)
			clearForm();
		}
	};

	$('.popup__button').on('click', function(e) {
		e.preventDefault();
		validationForm();
	});

	//Адаптивность

	let windowWindth = $(window).width();

	if (windowWindth > 320 && windowWindth <= 1220) {
		$('.portfolio__button').text('Узнать стоимость');
	} else {
		$('.portfolio__button').text('Заказать проект');
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
			$('.header__container').addClass('header__container--mobile-menu-opened')
			$('body').addClass('fixed');
			
			burger.css({
				'backgroundImage' : 'url(../../img/close.svg)',
				'margin-right' : '10px'
			});
		} else {
			$('.header__container').removeClass('header__container--mobile-menu-opened')
			$('body').removeClass('fixed');
			
			burger.css({
				'backgroundImage' : 'url(../../img/burger.svg)',
				'margin-right' : '0'
			});
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
				$('body').addClass('fixed');
				
                burger.css({
					'backgroundImage' : 'url(../../img/close.svg)',
					'margin-right' : '10px'
				});
            } else {
				$('.header__container').removeClass('header__container--mobile-menu-opened')
				$('body').removeClass('fixed');
				
                burger.css({
					'backgroundImage' : 'url(../../img/burger.svg)',
					'margin-right' : '0'
				});
            }
        });
    });
});