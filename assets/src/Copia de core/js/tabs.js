class HandlerTabs{
  constructor(thisTab){
    this.container    = thisTab,
    this.bttab        = thisTab.find('.tabs-btns'),
    this.tabs         = thisTab.find('.tab'),
    this.indexThis,
    this.slider,
    this.paginatorOne
    //this.paginatorTwo
   }
  createSlider(){
    this.slider = jQuery(this.tabs).eq(this.indexThis).find('.tab-slider').bxSlider({
      controls: true,
      auto: true,
      responsive: true,
      touchEnabled: false,
      touchEnabled: true,
      shrinkItems: true
    });
    return true;
  }
  
  createPager(){
    this.paginatorOne = jQuery(this.tabs).eq(this.indexThis).find('.paginador').bxSlider({
      pager: true,
      pagerType: 'full',
      auto: false,
      controls: true,
      nextText: 'Sig >',
      prevText: '< Ant'
    });
    return true;
  }
  /*
  createSecondPager(){
    this.paginatorTwo = jQuery(this.tabs).eq(this.indexThis).find('.article').paginate(8);
    return true;
  }
  */
  getTab(){ 
    let sliderExist1 = false;
    let paginatorExist= false;
    //let paginatorExist = false;
    jQuery(this.tabs).eq(this.indexThis).find('.tab-slider').length > 0 ? sliderExist1 = true : sliderExist1 = false
    jQuery(this.tabs).eq(this.indexThis).find('.paginador').length > 0 ? paginatorExist = true : paginatorExist = false
    //jQuery(this.tabs).eq(this.indexThis).find('.article').length > 0 ? paginatorExist = true : paginatorExist = false
    return {
      sliderExist1,
      paginatorExist,
    //  paginatorExist
    }
  }
  changeTab(){
    const that = this;
    this.indexThis = 0;
    this.tabs.eq(0).css('display', 'block');
    this.bttab.eq(0).addClass('active');
    if (this.getTab().sliderExist1) { 
      that.createSlider();
    }
    
    if (this.getTab().paginatorExist) { 
      that.createPager();
    }
    /*
    if (this.getTab().paginatorExist1) { 
      that.createFirtsPager();
    }
    */
    /*
    if (window.matchMedia("(max-width: 768px)").matches) {
      this.tabs.eq(0).css('display', 'none');
      this.bttab.eq(0).removeClass('active');
    }
    */
  }
  botonTab(boton){
    let thisBoton = boton;
    this.indexThis = this.container.find('.tabs-btns').index(boton);
    if (!$(boton).hasClass('active')) {
      this.tabs.css({
        display: 'none',
        opacity: 0,
        right: -1000
      });
      $(this.bttab).removeClass('active');
      $(boton).addClass('active');
      $(this.tabs).hide();
      $(this.tabs).eq(this.indexThis).show();
      this.tabs.eq(this.indexThis).css('display', 'block').animate({ opacity: 1, right: 0, top: 0});

      if (this.getTab().sliderExist1) { 
        if ($(this.slider).length > 0) {
          this.slider.destroySlider();
          this.createSlider();
        }
      }
      
      if (this.getTab().paginatorExist) { 
        if ($(this.paginatorOne).length > 0) {
          this.paginatorOne.destroySlider();
          this.createPager();
        }
      }
      /*
      if (this.getTab().paginatorExist1) { 
        if ($(this.paginatorOne).length > 0) {
         // this.paginatorOne.destroy();
          this.createFirtsPager();
        }
      }
      */
      /*
      if (window.matchMedia("(max-width: 768px)").matches) {
        jQuery('.icon-menu').css('display', 'none');
        jQuery('.icon-back-t').addClass('active');
        jQuery(boton).addClass('active');
        //this.tabs.eq(this.indexThis).hide();
      }
      */
    }
  }
}

$(document).ready(function(){

  $('.container-tabs').each(function () {
    let thisTab       = $(this);
    let controlsTabs  = new HandlerTabs(thisTab);
    let bttab         = thisTab.find('.tabs-btns');
    controlsTabs.changeTab();
    jQuery(bttab).on('click', function (e) {
      e.preventDefault();
      controlsTabs.botonTab(jQuery(this));
    });
    $('.icon-back-t').on('click', function (e){
      e.preventDefault();
      jQuery('.icon-menu').css('display','block');
      jQuery('.icon-back-t').removeClass('active');
      jQuery(".cont-tabs > div").fadeOut();
    });
  });
});
