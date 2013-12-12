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
	p.getFrame = function(val,index){
		if(val<10) val = "0"+val;			
		val = val.toString().split("");
		return 'n'+val[index];
	}
	p.transition = function(frame,speed,delay) {
		var digit = this;
		if(!speed) speed = 50;
		var outspeed = speed;
		if(!delay) delay = 0;
		if(this.num.currentAnimationFrame ==  'bg'){
			outspeed = 0;
		}
		createjs.Tween.get(this.num,{override:true}).to({alpha:0},outspeed).call(function(){
			digit.update(frame);
		}).wait(delay).to({alpha:1},speed);
	
	}
	hamvturkey.Digit = Digit;
}());