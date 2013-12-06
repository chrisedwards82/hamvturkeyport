(function() {
 
	var Turkey = function(color) {
	  this.initialize(color);
	}
	var p = Turkey.prototype = new createjs.Container();
 	
	p.count = 0;
	p.background;
	//
	p.Container_initialize = p.initialize;
	
	
	p.initialize = function(color) {
		this.Container_initialize();
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(color).drawRect(0, 0, 10,10);
		this.addChild(this.background);
	}
	p.buildSprite = function(img) {
		var ss = new createjs.SpriteSheet( {
			"animations":{
				"rest":[1,19],
				'windup':[20,25],
				"shoot":[25,47]
			},
			"images":[img],
			"frames":{
				"regX":0,
				"regY":0,
				"height":280,
				"width":281,
				"count":47
			}
		});
		ss.getAnimation('rest').speed = .5;
		ss.getAnimation('shoot').speed = .5;
		ss.getAnimation('shoot').speed = 1;
		ss.getAnimation('rest').next = 'rest';
		ss.getAnimation('windup').next = 'shoot';
		ss.getAnimation('shoot').next = 'rest';
		var sprite = new createjs.Sprite(ss,'rest');
		this.sprite = sprite;
		this.addChild(sprite);
	}

	p.shoot = function(callback){
		var sprite = this.sprite;
		sprite.gotoAndPlay('windup');
		var lis = this.sprite.on("animationend", function(event){
			if(event.name=='windup'){
				callback();
			}
			sprite.off('animationend',lis);
		});
	}
 
	window.Turkey = Turkey;
}());