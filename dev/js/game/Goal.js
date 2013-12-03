(function() {

	var Goal = function(width,height,barWidth) {
	  this.initialize(width,height,barWidth);
	}
	var p = Goal.prototype = new createjs.Container();
 	
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(width,height,barWidth) {
	    this.Container_initialize();
		var bar = 5;
		if(barWidth) bar = barWidth;
		this.net = new createjs.Shape();
		this.net.graphics.beginFill('gray').drawRect(barWidth, barWidth, width-barWidth*2,height-barWidth);
		this.addChild(this.net);
		this.top_crossbar = this.addChild(new createjs.Shape());	
		this.left_crossbar = this.addChild(new createjs.Shape());		
		this.right_crossbar = this.addChild(new createjs.Shape());	
		this.top_crossbar.graphics.beginFill('purple').drawRect(0, 0, width,bar).endFill();
		this.left_crossbar.graphics.beginFill('orange').drawRect(0, 0, bar,height).endFill();
		this.right_crossbar.graphics.beginFill('yellow').drawRect(0, 0, bar,height).endFill();
		this.right_crossbar.x = width-bar;

		//must enable mouseover
		this.net.cursor = 'pointer';
	}

	
 
	window.Goal = Goal;
}());