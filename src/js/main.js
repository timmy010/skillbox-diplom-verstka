var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
    slidesPerView: 3,
    // spaceBetween: 30,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  })