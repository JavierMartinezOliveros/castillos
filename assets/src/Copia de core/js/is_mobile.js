/* jshint expr: true */
/* jshint unused: false */
/*
/*
TODO:
  1. Agregar ejemplo
  2. Remover jshint
  3. Cambiar nombre de clase a isMobile
*/

class siMovil {
  get itsMobile() {
    return this.getMobile();
  }
  get itsIphone() {
    return this.getIphone();
  }
  getMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  getIphone() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
}
/*
Usage:

*/
