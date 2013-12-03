(function() {

	var Goal = function(width,height,barWidth) {
	  this.initialize(width,height,barWidth);
	}
	var p = Goal.prototype = new createjs.Container();
 	
	p.right_crossbar;
	p.left_crossbar;
	p.top_crossbar;
	p.crossbar;
	p.net;
	
	
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(width,height,barWidth) {
	    this.Container_initialize();
		var bar = 5;
		if(barWidth) bar = barWidth;
		this.net = new createjs.Shape();
		this.net.graphics.beginFill('gray').drawRect(barWidth, barWidth, width-barWidth*2,height-barWidth);
		this.addChild(this.net);
		this.crossbar = this.addChild(new createjs.Container());
		this.left_crossbar = this.crossbar.addChild(new createjs.Shape());		
		this.right_crossbar = this.crossbar.addChild(new createjs.Shape());	
		this.top_crossbar = this.crossbar.addChild(new createjs.Shape());		
		this.top_crossbar.graphics.beginFill('red').drawRect(0, 0, width,bar);
		this.left_crossbar.graphics.beginFill('red').drawRect(0, 0, bar,height);
		this.right_crossbar.graphics.beginFill('red').drawRect(0, 0, bar,height);
		this.right_crossbar.x = width-bar;

		//must enable mouseover
		this.net.cursor = 'pointer';
	}

	
 
	window.Goal = Goal;
}());