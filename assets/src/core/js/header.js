if( 'ontouchstart' in window ){ var click = 'touchstart'; }
	else { var click = 'click'; }

	$('.burger').on(click, function(){
			if( !$(this).hasClass('open') ){ openMenu(); } 
			else { closeMenu(); }
	});	
	
	$('.menu ul li a').on(click, function(e){
		e.preventDefault();
		closeMenu();
	});

	function openMenu(){
		
		$('.menu-bg').addClass('animate');					

		$('.burger').addClass('open');	
		$('div.x, div.z').addClass('collapse');
		$('.menu li').addClass('animate');
		$('.menu-splitL').css('left', '0');
		
		setTimeout(function(){ 
			$('div.y').hide(); 
			$('div.x').addClass('rotate30'); 
			$('div.z').addClass('rotate150'); 
		}, 70);
		setTimeout(function(){
			$('div.x').addClass('rotate45'); 
			$('div.z').addClass('rotate135');  
		}, 120);		
	}
	
	function closeMenu(){

		$('.menu li').removeClass('animate');
		$('.menu-splitL').css('left', '-100%');
		setTimeout(function(){ 			
			$('.burger').removeClass('open');	
			$('div.x').removeClass('rotate45').addClass('rotate30'); 
			$('div.z').removeClass('rotate135').addClass('rotate150');				
			$('div.menu-bg').removeClass('animate');			
			
			setTimeout(function(){ 			
				$('div.x').removeClass('rotate30'); 
				$('div.z').removeClass('rotate150'); 			
			}, 50);
			setTimeout(function(){
				$('div.y').show(); 
				$('div.x, div.z').removeClass('collapse');
			}, 70);
		}, 100);															
	}