this.hamvturkey = this.hamvturkey || {};
(function() {

	var Goal = function(width,height,barWidth,alpha) {
	  this.initialize(width,height,barWidth,alpha);
	}
	var p = Goal.prototype = new createjs.Container();
 	
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(width,height,barWidth,alpha) {
	    this.Container_initialize();
		var bar = 5;
		if(barWidth) bar = barWidth;
		this.net = new createjs.Shape();
		this.net.graphics.beginFill("rgba(50,50,50,"+alpha+")").drawRect(barWidth, barWidth, width-barWidth*2,height-barWidth);
		this.addChild(this.net);
		this.top_crossbar = this.addChild(new createjs.Shape());	
		this.left_crossbar = this.addChild(new createjs.Shape());		
		this.right_crossbar = this.addChild(new createjs.Shape());	
		
		this.top_crossbar.graphics.beginFill("rgba(255,0,255,"+alpha+")").drawRect(0, 0, width,bar).endFill();
		this.left_crossbar.graphics.beginFill("rgba(255,125,0,"+alpha+")").drawRect(0, 0, bar,height).endFill();
		this.right_crossbar.graphics.beginFill("rgba(255,255,0,"+alpha+")").drawRect(0, 0, bar,height).endFill();
		this.right_crossbar.x = width-bar;

		//must enable mouseover
		this.net.cursor = 'pointer';
	}

	
 
	hamvturkey.Goal = Goal;
}());