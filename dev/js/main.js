
var game, isTouchDevice = false;
$(document).ready(function(){
	//alert("let's do it");
	//isTouchDevice = true;
	if(isTouchDevice){
		//launch game on touch prompt
		$('#game').addClass('touch-to-play');
		$('#game').append('<a class="touch-spot clearfix"></a>');
		$('#gameCanvas').hide();
		$('.touch-spot').click(function(event){
			$(this).hide()
			$('#gameCanvas').show();
		 	game = new hamvturkey.Game();
		})
	} else {
		game = new hamvturkey.Game();
	}
	var desc = $("meta[name=description]").attr('content');
    var title = $(document).find("title").text();
	$('.social').shareLinks({
		media:'facebook,twitter,google,email',
		description:desc,
		title:title
	});
});
//$(window).load(function(){});




