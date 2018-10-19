class DropDownTab{
	constructor(thisDrop){
		this.container    = thisDrop,
		this.controlDrop  = thisDrop.find('.dropdown-btn'),
		this.contenDrop   = thisDrop.find('.dropdown-content'),
		this.sliderDrop,
		this.indexThis;
	}
	changeDrop(boton){
		this.indexThis  = this.container.find('.dropdown-btn').index(boton);
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
}

$(document).ready(function(){
	$('.drop-tab').each(function(){
		let thisDrop       = $(this);
		let control        = new DropDownTab(thisDrop);
		let btdrop         = thisDrop.find('.dropdown-btn');
		$(btdrop).on('click', function (e) {
			e.preventDefault();
			control.changeDrop($(this));
		});
	});

});