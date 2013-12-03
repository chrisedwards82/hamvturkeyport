(function() {

	var Puck = function() {
	  this.initialize();
	}
	var p = Puck.prototype = new createjs.Shape();
	p.fl = 250;
	//
	p._initialize = p.initialize;
	p.initialize = function() {
	    this._initialize();
		this.graphics.beginFill('green').drawCircle(0, 0, 25).endFill();
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
	p.kill = function() {
		if(this._onTick) this.off("tick", this._onTick);
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
			this.kill();
			//
		} else {
			this.z += this.speed;
			this.x = this.targetX-this.diffX*scale;
			this.y = this.targetY-this.diffY*scale;
			this.scaleX = this.scaleY=.5*scale+.2;
		}
	}
	window.Puck = Puck;
}());
