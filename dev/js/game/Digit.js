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
		this.blackL = this.addChild(new createjs.Shape());
		this.blackR = this.addChild(new createjs.Shape());
		this.bgL = this.addChild(new createjs.Sprite(ss,'bg'));
		this.bgR = this.addChild(new createjs.Sprite(ss,'bg'));
		this.numL = this.addChild(new createjs.Sprite(ss,'n0'));
		this.numR = this.addChild(new createjs.Sprite(ss,'n0'));
		this.blackR.x = this.bgR.x =this.numR.x = 28;
		this.blackL.graphics.beginFill('black').drawRect(27,43).endFill();
		this.blackR.graphics.beginFill('black').drawRect(27,43).endFill();
	}
	p.update = function(val){
		if(val<10){
			val = "0"+val;			
		}
		val = val.toString().split("");	
		this.numL.gotoAndStop('n'+val[0]);
		this.numR.gotoAndStop('n'+val[1]);
	}
	p.transition = function(val) {
		var digit = this;
		p._transitionL = createjs.Tween.get(this.numL,{override:true}).to({alpha:0},100).call(function(){
			digit.update(val);
		}).wait(100).to({alpha:1},100);
		p._transitionR = createjs.Tween.get(this.numR,{override:true}).to({alpha:0},100).wait(100).to({alpha:1},100);
	}
	hamvturkey.Digit = Digit;
}());