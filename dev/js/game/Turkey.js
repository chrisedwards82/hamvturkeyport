(function() {
 
	var Turkey = function(color) {
	  this.initialize(color);
	}
	var p = Turkey.prototype = new createjs.Container();
 	
	p.count = 0;
	p.background;
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(color) {
	    this.Container_initialize();
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(color).drawCircle(0, 0, 50);
		this.addChild(this.background);
		this.on("tick", this.handleTick);
		
	}
	p.handleTick = function(event) {       
		p.alpha = Math.cos(p.count++*0.1)*0.4+0.6;
	}
 
	window.Turkey = Turkey;
}());