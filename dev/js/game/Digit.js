this.hamvturkey = this.hamvturkey || {};
(function(){
	
	var Digit = function(spritesheet) {
	  this.initialize(spritesheet);
	}
	var p = Digit.prototype = new createjs.Container();
 	
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(ss) {
	    this.Container_initialize();
		this.black = this.addChild(new createjs.Shape());
		this.bg = this.addChild(new createjs.Sprite(ss,'bg'));
		this.num = this.addChild(new createjs.Sprite(ss,'bg'));
		this.black.graphics.beginFill('black').drawRect(27,43).endFill();
	}
	p.update = function(frame){
		this.num.gotoAndStop(frame);
	}
	p.transition = function(frame,speed,delay) {
		var digit = this;
		if(!speed) speed = 50;
		if(!delay) delay = 0;
		p._transitionL = createjs.Tween.get(this.num,{override:true}).to({alpha:0},speed).call(function(){
			digit.update(val);
		}).wait(delay).to({alpha:1},speed);
	
	}
	hamvturkey.Digit = Digit;
}());