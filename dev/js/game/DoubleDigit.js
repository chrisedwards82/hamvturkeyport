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
		if(val<10){
			val = "0"+val;			
		}
		val = val.toString().split("");	
		this.l.update('n'+val[0]);
		this.r.update('n'+val[1]);
	}
	p.transition = function(val,speed) {
		var digit = this;
		if(!speed) speed = 50;
		p._transitionL = createjs.Tween.get(this.l,{override:true}).to({alpha:0},speed).call(function(){
			digit.update(val);
		}).wait(speed).to({alpha:1.5},speed);
		p._transitionR = createjs.Tween.get(this.r,{override:true}).to({alpha:0},speed).wait(speed).to({alpha:1.5},speed);
	}
	hamvturkey.DoubleDigit = DoubleDigit;
}());