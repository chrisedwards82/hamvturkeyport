
var game, isTouchDevice = false;
$(document).ready(function(){
	//alert("let's do it");
	//isTouchDevice = true;
	if(isTouchDevice){
		//launch game on touch prompt
		$('#game').addClass('touch-to-play');
		$('#game').append('<a class="touch-spot></a>"');
		$('.touch-spot').click(function(event){
			$(this).parent().removeChild($this);
		 	game = new hamvturkey.Game();
		})
	} else {
		game = new hamvturkey.Game();
	}
	$('.social').shareLinks({
		media:'facebook,twitter,google,tumblr,email',
		description:"The battle for ultimate holiday meat supremacy.",
		title:"Ham vs. Turkey"
	});
});
//$(window).load(function(){});




