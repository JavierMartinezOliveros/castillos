class formatMailForm {
  constructor(thisEmail) {
    this.thisEmail = thisEmail,
    this.valEmail = false,
    this.valActual = "";
  }
  // se VALIDA el formato de correo
  valConditions() {
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
}

function DropDown(el) {
  this.dd = el;
  this.placeholder = this.dd.children('span');
  this.opts = this.dd.find('ul.drop li');
  this.val = '';
  this.index = -1;
  this.initEvents();
}

DropDown.prototype = {
  initEvents: function () {
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
  getValue: function () {
      return this.val;
  },
  getIndex: function () {
      return this.index;
  }
};

$(function () {
  var dd1 = new DropDown($('#motive'));
  $(document).click(function () {
      $('.wrap-drop').removeClass('active');
  });
});