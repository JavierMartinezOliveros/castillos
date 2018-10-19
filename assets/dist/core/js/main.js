'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropDownTab = function () {
  function DropDownTab(thisDrop) {
    _classCallCheck(this, DropDownTab);

    this.container = thisDrop, this.controlDrop = thisDrop.find('.dropdown-btn'), this.contenDrop = thisDrop.find('.dropdown-content'), this.sliderDrop, this.indexThis;
  }

  _createClass(DropDownTab, [{
    key: 'changeDrop',
    value: function changeDrop(boton) {
      this.indexThis = this.container.find('.dropdown-btn').index(boton);
      if ($(boton).hasClass('is-active')) {
        $(this.controlDrop).removeClass('is-active');
        $(this.contenDrop).slideUp();
      } else {
        $(this.controlDrop).removeClass('is-active');
        $(boton).addClass('is-active');
        $(this.contenDrop).slideUp();
        $(this.contenDrop).eq(this.indexThis).slideDown();
      }
    }
  }]);

  return DropDownTab;
}();

$(document).ready(function () {
  $('.drop-tab').each(function () {
    var thisDrop = $(this);
    var control = new DropDownTab(thisDrop);
    var btdrop = thisDrop.find('.dropdown-btn');
    $(btdrop).on('click', function (e) {
      e.preventDefault();
      control.changeDrop($(this));
    });
  });
});
var a,
    b,
    c,
    submitContent,
    captcha,
    locked,
    validSubmit = false,
    timeoutHandle;

// Generating a simple sum (a + b) to make with a result (c)
function generateCaptcha() {
  a = Math.ceil(Math.random() * 10);
  b = Math.ceil(Math.random() * 10);
  c = a + b;
  submitContent = '<span>' + a + '</span> + <span>' + b + '</span>' + ' = <input class="submit__input" type="text" maxlength="2" size="2" required />';
  $('.submit__generated').html(submitContent);

  init();
}

// Check the value 'c' and the input value.
function checkCaptcha() {
  if (captcha === c) {
    // Pop the green valid icon
    $('.submit__generated').removeClass('unvalid').addClass('valid');
    $('.submit').removeClass('overlay');
    $('.submit__overlay').fadeOut('fast');

    $('.submit__error').addClass('hide');
    $('.submit__error--empty').addClass('hide');
    validSubmit = true;
  } else {
    if (captcha === '') {
      $('.submit__error').addClass('hide');
      $('.submit__error--empty').removeClass('hide');
    } else {
      $('.submit__error').removeClass('hide');
      $('.submit__error--empty').addClass('hide');
    }
    // Pop the red unvalid icon
    $('.submit__generated').removeClass('valid').addClass('unvalid');
    $('.submit').addClass('overlay');
    $('.submit__overlay').fadeIn('fast');
    validSubmit = false;
  }
  return validSubmit;
}

function unlock() {
  locked = false;
}

// Refresh button click - Reset the captcha
$('.submit__control i.fa-sync').on('click', function () {
  if (!locked) {
    locked = true;
    setTimeout(unlock, 500);
    generateCaptcha();
    setTimeout(checkCaptcha, 0);
  }
});

// init the action handlers - mostly useful when 'c' is refreshed
function init() {
  $('form').on('submit', function (e) {
    e.preventDefault();
    if ($('.submit__generated').hasClass('valid')) {
      // var formValues = [];
      captcha = $('.submit__input').val();
      if (captcha !== '') {
        captcha = Number(captcha);
      }

      checkCaptcha();

      if (validSubmit === true) {
        validSubmit = false;
        // Temporary direct 'success' simulation
        submitted();
      }
    } else {
      return false;
    }
  });

  // Captcha input result handler
  $('.submit__input').on('propertychange change keyup input paste', function () {
    // Prevent the execution on the first number of the string if it's a 'multiple number string'
    // (i.e: execution on the '1' of '12')
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(function () {
      captcha = $('.submit__input').val();
      if (captcha !== '') {
        captcha = Number(captcha);
      }
      checkCaptcha();
    }, 150);
  });

  // Add the ':active' state CSS when 'enter' is pressed
  $('body').on('keydown', function (e) {
    if (e.which === 13) {
      if ($('.submit-form').hasClass('overlay')) {
        checkCaptcha();
      } else {
        $('.submit-form').addClass('enter-press');
      }
    }
  }).on('keyup', function (e) {
    if (e.which === 13) {
      $('.submit-form').removeClass('enter-press');
    }
  });

  // Refresh button click - Reset the captcha
  $('.submit-control i.fa-sync').on('click', function () {
    if (!locked) {
      locked = true;
      setTimeout(unlock, 500);
      generateCaptcha();
      setTimeout(checkCaptcha, 0);
    }
  });

  // Submit white overlay click
  $('.submit-form-overlay').on('click', function () {
    checkCaptcha();
  });
}

generateCaptcha();

var formatMailForm = function () {
  function formatMailForm(thisEmail) {
    _classCallCheck(this, formatMailForm);

    this.thisEmail = thisEmail, this.valEmail = false, this.valActual = "";
  }
  // se VALIDA el formato de correo


  _createClass(formatMailForm, [{
    key: 'valConditions',
    value: function valConditions() {
      var that = this;
      that.valActual = jQuery(this.thisEmail).val();
      var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (that.valActual !== undefined) {
        if (expr.test(that.valActual)) {
          that.valEmail = true;
        } else {
          that.valEmail = false;
        }
      } else {
        that.valEmail = undefined;
      }
    }
  }]);

  return formatMailForm;
}();

function DropDown(el) {
  this.dd = el;
  this.placeholder = this.dd.children('span');
  this.opts = this.dd.find('ul.drop li');
  this.val = '';
  this.index = -1;
  this.initEvents();
}

DropDown.prototype = {
  initEvents: function initEvents() {
    var obj = this;
    obj.dd.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('active');
    });
    obj.opts.on('click', function () {
      var opt = $(this);
      obj.val = opt.text();
      obj.index = opt.index();
      obj.placeholder.text(obj.val);
      opt.siblings().removeClass('selected');
      opt.filter(':contains("' + obj.val + '")').addClass('selected');
    }).change();
  },
  getValue: function getValue() {
    return this.val;
  },
  getIndex: function getIndex() {
    return this.index;
  }
};

$(function () {
  var dd1 = new DropDown($('#motive'));
  $(document).click(function () {
    $('.wrap-drop').removeClass('active');
  });
});
if ('ontouchstart' in window) {
  var click = 'touchstart';
} else {
  var click = 'click';
}

$('.burger').on(click, function () {
  if (!$(this).hasClass('open')) {
    openMenu();
  } else {
    closeMenu();
  }
});

$('.menu ul li a').on(click, function (e) {
  e.preventDefault();
  closeMenu();
});

function openMenu() {

  $('.menu-bg').addClass('animate');

  $('.burger').addClass('open');
  $('div.x, div.z').addClass('collapse');
  $('.menu li').addClass('animate');
  $('.menu-splitL').css('left', '0');

  setTimeout(function () {
    $('div.y').hide();
    $('div.x').addClass('rotate30');
    $('div.z').addClass('rotate150');
  }, 70);
  setTimeout(function () {
    $('div.x').addClass('rotate45');
    $('div.z').addClass('rotate135');
  }, 120);
}

function closeMenu() {

  $('.menu li').removeClass('animate');
  $('.menu-splitL').css('left', '-100%');
  setTimeout(function () {
    $('.burger').removeClass('open');
    $('div.x').removeClass('rotate45').addClass('rotate30');
    $('div.z').removeClass('rotate135').addClass('rotate150');
    $('div.menu-bg').removeClass('animate');

    setTimeout(function () {
      $('div.x').removeClass('rotate30');
      $('div.z').removeClass('rotate150');
    }, 50);
    setTimeout(function () {
      $('div.y').show();
      $('div.x, div.z').removeClass('collapse');
    }, 70);
  }, 100);
}

var activeInput = function () {
  function activeInput(parent) {
    _classCallCheck(this, activeInput);

    this.parent = parent, this.thisInput = this.parent.find('input'), this.label = this.parent.find('label'), this.select = this.parent.find('select');
  }

  _createClass(activeInput, [{
    key: 'controlInput',
    value: function controlInput() {
      var that = this;
      this.thisInput.on('focus', function () {
        that.parent.addClass("active");
        if (that.thisInput.val() === 0) {
          that.parent.addClass("azul");
        }
      });
      this.thisInput.on('focusout', function () {
        if (that.thisInput.val().length !== 0) {
          that.parent.removeClass("azul");
        }
        if (that.thisInput.val() === "") {
          that.parent.removeClass("active");
        }
      });
    }
  }, {
    key: 'controSelect',
    value: function controSelect() {
      var that = this;
      function confVal() {
        if (that.select.val() === "") {
          that.parent.removeClass("active");
        } else {
          that.parent.addClass("active");
        }
      }
      this.select.on('change', confVal);
    }
  }]);

  return activeInput;
}();

jQuery(document).ready(function () {

  $('.wrrp_campo').each(function () {
    var thisInp = $(this);
    var newActiveInput = new activeInput(thisInp);
    var inp = thisInp.find('input');

    newActiveInput.controlInput();
    $(inp).on('click', function (e) {
      e.preventDefault();
      newActiveInput.controlInput($(this));
    });
    ingresaPhone.thisKeyUp(); // => Inicia el formato del celular
  });

  /* comportamiento inputs */
});

/* jshint expr: true */
/* jshint unused: false */
/*
/*
TODO:
  1. Agregar ejemplo
  2. Remover jshint
  3. Cambiar nombre de clase a isMobile
*/

var siMovil = function () {
  function siMovil() {
    _classCallCheck(this, siMovil);
  }

  _createClass(siMovil, [{
    key: 'getMobile',
    value: function getMobile() {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    }
  }, {
    key: 'getIphone',
    value: function getIphone() {
      return (/iPhone|iPad|iPod/i.test(navigator.userAgent)
      );
    }
  }, {
    key: 'itsMobile',
    get: function get() {
      return this.getMobile();
    }
  }, {
    key: 'itsIphone',
    get: function get() {
      return this.getIphone();
    }
  }]);

  return siMovil;
}();
/*
Usage:

*/

var nameFormat = function () {
  function nameFormat(thisName) {
    _classCallCheck(this, nameFormat);

    this.thisName = thisName, this.valName = false, this.valActual = '';
  }

  _createClass(nameFormat, [{
    key: 'valConditions',
    value: function valConditions() {
      var that = this;
      var valThis = jQuery(this.thisName).val();

      if (valThis.length < 2) {
        jQuery(this.thisName).parent('.wrrp_campo').addClass('errorcampo');
        jQuery(this.thisName).parent('.wrrp_campo').find('.alerta_errorcampo').html('Debes ingresar tu nombre');
      } else {
        jQuery(this.thisName).parent('.wrrp_campo').removeClass('errorcampo');
      }

      if (valThis.length > 2) {
        that.valName = true;
      } else {
        that.valName = false;
      }
    }
  }, {
    key: 'thisKeyUp',
    value: function thisKeyUp() {

      var that = this;
      that.valActual = jQuery(this.thisName).val();

      //var nuevoValor = that.formatoName(that.valActual);
      //jQuery(this.thisName).val(nuevoValor);
      that.valConditions();

      jQuery(this.thisName).keyup(function () {
        that.valActual = jQuery(this).val();
        //nuevoValor = that.formatoName(that.valActual);
        //jQuery(this).val(nuevoValor);
        that.valConditions();
      });

      jQuery(this.thisName).bind('input propertychange', function () {
        that.valConditions();
      }), jQuery(this.thisname).on('blur', function () {
        that.valConditions();
        if (that.valName) {
          jQuery(this).parent('.wrrp_campo').removeClass('errorcampo');
        } else {
          jQuery(this).parent('.wrrp_campo').addClass('errorcampo');
          jQuery(this).parent('.wrrp_campo').find('.alerta_errorcampo').html('El número ingresado es incorrecto');
        }
      });
    }
  }]);

  return nameFormat;
}();

$(document).ready(function () {
  $('.banner-slider').each(function () {
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
    touchEnabled: true
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
    touchEnabled: true
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
    touchEnabled: true
  });

  $('.test-slider').each(function () {
    $(this).bxSlider({
      controls: true,
      auto: true,
      responsive: true,
      touchEnabled: false
    });
  });

  $('.slider-lineas').each(function () {
    $(this).bxSlider({
      controls: true,
      auto: true,
      responsive: true,
      touchEnabled: false
    });
  });
  $(".follow").click(function () {
    var mueche = $(this).find(".share-rrss");
    console.log(mueche);
    $(mueche).toggleClass("is-open");
  });
});

// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2lqbmpqazdlMDBsdnRva284cWd3bm11byJ9.V6Hg2oYJwMAxeoR9GEzkAA';

// This adds the map
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mapbox/light-v9',
  // initial position in [long, lat] format
  center: [-75.5228838, 10.400422],
  // initial zoom
  zoom: 13,
  scrollZoom: false
});

var stores = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-75.5228838, 10.400422]
    },
    "properties": {
      "phoneFormatted": "(202) 234-7336",
      "phone": "2022347336",
      "address": "Bosque, Av. Pedro Vélez No. 20 - 65",
      "city": "Cartagena",
      "country": "Colombia"
    }
  }, {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-74.770554, 10.982090]
    },
    "properties": {
      "phoneFormatted": "(202) 507-8357",
      "phone": "2025078357",
      "address": "Cra. 43 No 6 - 89",
      "city": "Barranquilla",
      "country": "Colombia"
    }
  }, {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-74.121216, 4.645990]
    },
    "properties": {
      "phoneFormatted": "(202) 387-9338",
      "phone": "2023879338",
      "address": "Calle 17A No 69 - 52",
      "city": "Bogotá",
      "country": "Colombia"
    }
  }, {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-75.612968, 6.157165]
    },
    "properties": {
      "phoneFormatted": "(202) 337-9338",
      "phone": "2023379338",
      "address": "Unidad industrial Vegas de Sabaneta Cra. 48 No. 61 sur 115 Bodega 121",
      "city": "Medellín",
      "country": "Bogota"
    }
  }]
};
// This adds the data to the map
map.on('load', function (e) {
  // This is where your '.addLayer()' used to be, instead add only the source without styling a layer
  map.addSource("places", {
    "type": "geojson",
    "data": stores
  });
  // Initialize the list
  buildLocationList(stores);
});

// This is where your interactions with the symbol layer used to be
// Now you have interactions with DOM markers instead
stores.features.forEach(function (marker, i) {
  // Create an img element for the marker
  var el = document.createElement('div');
  el.id = "marker-" + i;
  el.className = 'marker';
  // Add markers to the map at all points
  new mapboxgl.Marker(el, { offset: [0, -23] }).setLngLat(marker.geometry.coordinates).addTo(map);

  el.addEventListener('click', function (e) {
    // 1. Fly to the point
    flyToStore(marker);

    // 2. Close all other popups and display popup for clicked store
    createPopUp(marker);

    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    var activeItem = document.getElementsByClassName('is-active');
    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove('is-active');
    }

    var listing = document.getElementById('listing-' + i);
    listing.classList.add('is-active');
  });
});

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false }).setLngLat(currentFeature.geometry.coordinates).setHTML('<h3>Molino 3 Castillos</h3>' + '<h4>' + currentFeature.properties.address + '</h4>').addTo(map);
}

function buildLocationList(data) {
  for (var i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];
    var prop = currentFeature.properties;

    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';
    listing.id = "listing-" + i;

    var link = listing.appendChild(document.createElement('div'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = i;
    link.innerHTML = prop.city;

    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.address;
    /*
    if (prop.phone) {
      details.innerHTML += ' &middot; ' + prop.phoneFormatted;
    }
    */

    link.addEventListener('click', function (e) {
      // Update the currentFeature to the store associated with the clicked link
      e.preventDefault();
      var clickedListing = data.features[this.dataPosition];

      // 1. Fly to the point
      flyToStore(clickedListing);

      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedListing);

      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName('is-active');

      if (activeItem[0]) {
        activeItem[0].classList.remove('is-active');
      }
      this.parentNode.classList.add('is-active');
    });
  }
}
(function ($) {

  var paginate = {
    startPos: function startPos(pageNumber, perPage) {
      return pageNumber * perPage;
    },
    getPage: function getPage(items, startPos, perPage) {
      var page = [];
      items = items.slice(startPos, items.length);
      for (var i = 0; i < perPage; i++) {
        page.push(items[i]);
      }
      return page;
    },
    totalPages: function totalPages(items, perPage) {
      return Math.ceil(items.length / perPage);
    },
    createBtns: function createBtns(totalPages, currentPage) {
      var pagination = $('<div class="pagination" />');
      pagination.append('<span class="pagination-button">< Ant</span>');

      for (var i = 1; i <= totalPages; i++) {
        if (totalPages > 5 && currentPage !== i) {
          if (currentPage === 1 || currentPage === 2) {
            if (i > 5) continue;
          } else if (currentPage === totalPages || currentPage === totalPages - 1) {
            if (i < totalPages - 4) continue;
          } else {
            if (i < currentPage - 2 || i > currentPage + 2) {
              continue;
            }
          }
        }

        var pageBtn = $('<span class="pagination-button page-num" />');
        if (i == currentPage) {
          pageBtn.addClass('active');
        }

        pageBtn.text(i);

        pagination.append(pageBtn);
      }

      pagination.append($('<span class="pagination-button">Sig ></span>'));

      return pagination;
    },

    createPage: function createPage(items, currentPage, perPage) {
      $('.pagination').remove();

      var container = items.parent(),
          items = items.detach().toArray(),
          startPos = this.startPos(currentPage - 1, perPage),
          page = this.getPage(items, startPos, perPage);

      $.each(page, function () {
        if (this.window === undefined) {
          container.append($(this));
        }
      });
      var totalPages = this.totalPages(items, perPage),
          pageButtons = this.createBtns(totalPages, currentPage);

      container.after(pageButtons);
    }
  };

  $.fn.paginate = function (perPage) {
    var items = $(this);
    if (isNaN(perPage) || perPage === undefined) {
      perPage = 2;
    }
    if (items.length <= perPage) {
      return true;
    }

    if (items.length !== items.parent()[0].children.length) {
      items.wrapAll('<div class="pagination-items" />');
    }
    paginate.createPage(items, 1, perPage);

    // handle click events on the buttons
    $(document).on('click', '.pagination-button', function (e) {
      // get current page from active button
      var currentPage = parseInt($('.pagination-button.active').text(), 10),
          newPage = currentPage,
          totalPages = paginate.totalPages(items, perPage),
          target = $(e.target);

      // get numbered page
      newPage = parseInt(target.text(), 10);
      if (target.text() == '«') newPage = 1;
      if (target.text() == '»') newPage = totalPages;

      // ensure newPage is in available range
      if (newPage > 0 && newPage <= totalPages) {
        paginate.createPage(items, newPage, perPage);
      }
    });
  };
})(jQuery);

$(document).ready(function () {
  $('.article-loop').paginate(8);
});

var HandlerTabs = function () {
  function HandlerTabs(thisTab) {
    _classCallCheck(this, HandlerTabs);

    this.container = thisTab, this.bttab = thisTab.find('.tabs-btns'), this.tabs = thisTab.find('.tab'), this.indexThis, this.slider, this.paginatorOne;
    //this.paginatorTwo
  }

  _createClass(HandlerTabs, [{
    key: 'createSlider',
    value: function createSlider() {
      var _jQuery$eq$find$bxSli;

      this.slider = jQuery(this.tabs).eq(this.indexThis).find('.tab-slider').bxSlider((_jQuery$eq$find$bxSli = {
        controls: true,
        auto: true,
        responsive: true,
        touchEnabled: false
      }, _defineProperty(_jQuery$eq$find$bxSli, 'touchEnabled', true), _defineProperty(_jQuery$eq$find$bxSli, 'shrinkItems', true), _jQuery$eq$find$bxSli));
      return true;
    }
  }, {
    key: 'createPager',
    value: function createPager() {
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

  }, {
    key: 'getTab',
    value: function getTab() {
      var sliderExist1 = false;
      var paginatorExist = false;
      //let paginatorExist = false;
      jQuery(this.tabs).eq(this.indexThis).find('.tab-slider').length > 0 ? sliderExist1 = true : sliderExist1 = false;
      jQuery(this.tabs).eq(this.indexThis).find('.paginador').length > 0 ? paginatorExist = true : paginatorExist = false;
      //jQuery(this.tabs).eq(this.indexThis).find('.article').length > 0 ? paginatorExist = true : paginatorExist = false
      return {
        sliderExist1: sliderExist1,
        paginatorExist: paginatorExist
        //  paginatorExist
      };
    }
  }, {
    key: 'changeTab',
    value: function changeTab() {
      var that = this;
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
  }, {
    key: 'botonTab',
    value: function botonTab(boton) {
      var thisBoton = boton;
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
        this.tabs.eq(this.indexThis).css('display', 'block').animate({ opacity: 1, right: 0, top: 0 });

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
  }]);

  return HandlerTabs;
}();

$(document).ready(function () {

  $('.container-tabs').each(function () {
    var thisTab = $(this);
    var controlsTabs = new HandlerTabs(thisTab);
    var bttab = thisTab.find('.tabs-btns');
    controlsTabs.changeTab();
    jQuery(bttab).on('click', function (e) {
      e.preventDefault();
      controlsTabs.botonTab(jQuery(this));
    });
    $('.icon-back-t').on('click', function (e) {
      e.preventDefault();
      jQuery('.icon-menu').css('display', 'block');
      jQuery('.icon-back-t').removeClass('active');
      jQuery(".cont-tabs > div").fadeOut();
    });
  });
});