(function() {

	var Puck = function(bmp) {
	  this.initialize(bmp);
	}
	var Ease = createjs.Ease;
	var Tween = createjs.Tween;
	var p = Puck.prototype = new createjs.Bitmap();
	p.fl = 250;
	//
	p._initialize = p.initialize;
	p.initialize = function(bmp) {
	    this._initialize(bmp);
		//this.graphics.beginFill('green').drawCircle(0, 0, 25).endFill();
		this.regX = 12.5;
		this.regY = 12.5;
	}
	p.fire = function(targetX,targetY){
		this.z = 0;
		this.speed = 150; //550
		this.diffX = targetX -this.x;
		this.diffY = targetY - this.y;
		this.targetX = targetX;
		this.targetY = targetY;
		if(this._onTick) this.off("tick", this._onTick);
		this._onTick = this.on("tick", this.handleTick);
		
	}
	p.killTick = function(event) {
		if(this._onTick) {
			this.off("tick", this._onTick);
			this._onTick = null;
			delete this._onTick;
		}
	}
	p.kill = function(){
		this.killTick()
		if(this.parent) this.parent.removeChild(this);
	}
	p.handleTick = function(event) {
		var scale = p.fl/(p.fl+this.z);
		//console.log(scale);
		if (scale<.09) {
			//
			this.x = this.targetX;
			this.y= this.targetY;
			//console.log('hit');
			this.dispatchEvent('hit');
			this.killTick();
			//
		} else {
			this.z += this.speed;
			this.x = this.targetX-this.diffX*scale;
			this.y = this.targetY-this.diffY*scale;
			this.scaleX = this.scaleY=.8*scale+.2;
		}
	}
	p.drop = function(targ){
		Tween.get(this).to({
				y:targ+Math.random()*10-5,
				x:this.x+Math.random()*5-2.5
			},
			400,Ease.bounceOut);
	}
	p.deflectUp = function(){
		var scale = 1+Math.random();
		Tween.get(this).to({
				x:this.x+Math.random()*50,
				y:-100,
				rotation:360+Math.random()*360,
				scaleX:scale, scaleY:scale
			},
			300,Ease.quadOut).call(createjs.proxy(this.kill,this));
	}
	p.deflectLeft = function(){
		var scale = 1+Math.random();
		Tween.get(this).to({
				x:-100,
				y:this.y,
				rotation:360+Math.random()*360,
				scaleX:scale, scaleY:scale
			},
			300,Ease.quadOut).call(createjs.proxy(this.kill,this));
		
	}
	p.deflectRight = function(){
		var scale = 1+Math.random();
		Tween.get(this).to({
			x:600,
			y:this.y,
			rotation:360+Math.random()*360,
			scaleX:scale, scaleY:scale
		},300,Ease.quadOut).call(createjs.proxy(this.kill,this));
	}
	window.Puck = Puck;
}());
