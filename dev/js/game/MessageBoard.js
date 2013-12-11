this.hamvturkey = this.hamvturkey || {};
(function(){
	//
	var Messageboard = function() {
	  this.initialize();
	}
	var p = Messageboard.prototype = new createjs.Container();
	//
	p.Container_initialize = p.initialize;
	
	p.initialize = function() {
	    this.Container_initialize();
	}
	hamvturkey.Messageboard = Messageboard;
}());