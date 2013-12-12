this.hamvturkey = this.hamvturkey || {};
(function(){
	
	var DoubleDigit = function(spritesheet) {
	  this.initialize(spritesheet);
	}
	var p = DoubleDigit.prototype = new createjs.Container();
 	
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(ss) {
	    this.Container_initialize();
		this.l = this.addChild(new hamvturkey.Digit(ss));
		this.r = this.addChild(new hamvturkey.Digit(ss));
		this.r.x = 28;
	}
	
	p.update = function(val){
			
		this.l.update(this.l.getFrame(val,0));
		this.r.update(this.r.getFrame(val,1));
	}
	
	p.transition = function(val,speed,delay) {
		this.l.transition(this.l.getFrame(val,0),speed,delay);
		this.r.transition(this.r.getFrame(val,1),speed,delay);
	}
	
	hamvturkey.DoubleDigit = DoubleDigit;
}());