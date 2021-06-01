var swiper = new Swiper(".mySwiper", {
  
  effect: "coverflow",
   grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",

  coverflowEffect: {
    rotate: 50,
    stretch: 20,
    depth: 100,
    modifier: 1,
    slideShadows: true,
    freeModeMomentum: true,
  },


  pagination: {
    el: ".swiper-pagination",
  }
});