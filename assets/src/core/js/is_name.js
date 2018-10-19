
class nameFormat {
  constructor(thisName) {
    this.thisName = thisName,
    this.valName = false,
    this.valActual = '';
  }

  valConditions() {
    var that = this;
    var valThis = jQuery(this.thisName).val();

    if (valThis.length < 2) {
      jQuery(this.thisName).parent('.wrrp_campo').addClass('errorcampo');
      jQuery(this.thisName).parent('.wrrp_campo').find('.alerta_errorcampo').html('Debes ingresar tu nombre');
    } else {
      jQuery(this.thisName).parent('.wrrp_campo').removeClass('errorcampo');
    }

    if (valThis.length > 2 ) {
      that.valName = true;
    } else {
      that.valName = false;
    }

  }

  thisKeyUp() {

    var that = this;
    that.valActual = jQuery(this.thisName).val();

    //var nuevoValor = that.formatoName(that.valActual);
    //jQuery(this.thisName).val(nuevoValor);
    that.valConditions();

    jQuery(this.thisName).keyup(function() {
      that.valActual = jQuery(this).val();
      //nuevoValor = that.formatoName(that.valActual);
      //jQuery(this).val(nuevoValor);
      that.valConditions();
    });

    jQuery(this.thisName).bind('input propertychange', function() {
      that.valConditions();
    }),
    jQuery(this.thisname).on('blur', function() {
      that.valConditions();
      if (that.valName) {
        jQuery(this).parent('.wrrp_campo').removeClass('errorcampo');
      } else {
        jQuery(this).parent('.wrrp_campo').addClass('errorcampo');
        jQuery(this).parent('.wrrp_campo').find('.alerta_errorcampo').html('El número ingresado es incorrecto');
      }
    });
  }
}
