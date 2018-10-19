$(document).ready(function(){

  $('.banner-slider').each(function(){
     $(this).bxSlider({
      controls: true,
      auto: true,
      responsive: true,
      touchEnabled: false
      //pager: ($(this).find("> div").length > 1) ? true: false,
     });
  });

  $('.client-carrusel').bxSlider({
    slideWidth: 205,
    slideMargin: 40,
    infiniteLoop: true,
    controls: false,
    maxSlides: 6,
    minSlides: 2,
    moveSlides: 1,
    auto: true,
    pager: false,
    autoHover: true,
    responsive: true,
    touchEnabled: true,
  }); 

  $('.fund-carrusel').bxSlider({
    slideWidth: 250,
    slideMargin: 30,
    infiniteLoop: true,
    controls: false,
    maxSlides: 6,
    minSlides: 2,
    moveSlides: 1,
    auto: true,
    pager: false,
    autoHover: true,
    responsive: true,
    touchEnabled: true,
  }); 

  $('.video-carrusel').bxSlider({
    slideWidth: 150,
    slideMargin: 50,
    infiniteLoop: true,
    shrinkItems: false,
    controls: true,
    maxSlides: 6,
    minSlides: 2,
    moveSlides: 1,
    auto: true,
    pager: false,
    autoHover: true,
    responsive: true,
    touchEnabled: true,
  }); 

  $('.test-slider').each(function(){
    $(this).bxSlider({
     controls: true,
     auto: true,
     responsive: true,
     touchEnabled: false
    });
  });

  $('.slider-lineas').each(function(){
    $(this).bxSlider({
     controls: true,
     auto: true,
     responsive: true,
     touchEnabled: false
    });
  });
  $(".follow").click(function(){
    var mueche = $(this).find(".share-rrss");
    console.log(mueche);
    $(mueche).toggleClass("is-open");
  });
});