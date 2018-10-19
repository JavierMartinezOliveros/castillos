class activeInput {
    constructor(parent) {
      this.parent = parent,
      this.thisInput = this.parent.find('input'),
      this.label = this.parent.find('label'),
      this.select = this.parent.find('select');
    }
  
    controlInput() {
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
  
    controSelect() {
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
  }
  
  jQuery(document).ready(function(){
  
    $('.wrrp_campo').each(function () {
      let thisInp       = $(this);
      let newActiveInput = new activeInput(thisInp);
      let inp            = thisInp.find('input');
  
      newActiveInput.controlInput();
      $(inp).on('click', function (e) {
        e.preventDefault();
        newActiveInput.controlInput($(this));
      });
      ingresaPhone.thisKeyUp(); // => Inicia el formato del celular
    });
  
    /* comportamiento inputs */
  
  });
  