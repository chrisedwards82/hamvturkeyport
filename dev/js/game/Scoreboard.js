this.hamvturkey = this.hamvturkey || {};
(function(){
	
	var Scoreboard = function(width,height,barWidth,alpha) {
	  this.initialize(width,height,barWidth,alpha);
	}
	var p = Scoreboard.prototype = new createjs.Container();
 	
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(width,height,barWidth,alpha) {
	    this.Container_initialize();
		
	}
	hamvturkey.Scoreboard = Scoreboard;
}());