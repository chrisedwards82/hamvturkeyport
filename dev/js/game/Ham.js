(function() {

	var Ham = function(color,range) {
	  this.initialize(color,range);
	}
	var p = Ham.prototype = new createjs.Container();
 	
	p.count = 0;
	p.speed = .1;
	p.range = 100;
	p.background;
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(color,range) {
	    this.Container_initialize();
	 	this.range = range;
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(color).drawRect(0, 0, 50,50);
		this.addChild(this.background);
		this.on("tick", this.handleTick);
		this.mouseChildren = false;
	}
	p.handleTick = function(event) {
		var r = this.range*.5   
		this.background.x = r+Math.cos(p.count++*this.speed)*r-25;
		
		///	console.log(this.background.x);
	}
	
 
	window.Ham = Ham;
}());