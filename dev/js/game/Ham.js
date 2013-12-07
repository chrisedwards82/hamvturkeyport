(function() {

	var Ham = function(color,range) {
	  this.initialize(color,range);
	}
	var p = Ham.prototype = new createjs.Container();
 	
	p.count = 0;
	p.speed = .1;
	p.range = 100;
	p.background;
	p.sprite;
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(color,range) {
	    this.Container_initialize();
	 	this.range = range;
		//this.background = new createjs.Shape();
		//this.background.graphics.beginFill(color).drawRect(0, 0, 60,80);
		//this.addChild(this.background);
		this.on("tick", this.handleTick);
		this.mouseChildren = false;
	}
	p.buildSprite = function(img){
		var ss = new createjs.SpriteSheet( {
			'framerate':24,
			"animations":{
				"rest":[6],
				'hit':[2,2,3,3,3],
				"dance":[0,3]
			},
			"images":[img],
			"frames":{
				"regX":0,
				"regY":0,
				"height":146,
				"width":142,
				"count":11
			}
		});
		ss.getAnimation('dance').speed = .5;
		ss.getAnimation('hit').speed = 2;
		ss.getAnimation('hit').next = 'rest';
		ss.getAnimation('dance').next = 'rest';
		var sprite = new createjs.Sprite(ss,'rest');
		this.sprite = sprite;
		sprite.scaleX = sprite.scaleY = .8;
		this.addChild(this.sprite);
	}
	p.handleTick = function(event) {
		var r = this.range*.5   
		this.sprite.x = r+Math.cos(p.count++*this.speed)*r-25;
		///	console.log(this.background.x);
	}
	p.save = function(){
		this.sprite.gotoAndPlay('hit');
	}
	
 
	window.Ham = Ham;
}());