this.hamvturkey = this.hamvturkey || {};
(function() {
 
	var Turkey = function(color) {
	  this.initialize(color);
	}
	var p = Turkey.prototype = new createjs.Container();
 	
	p.count = 0;
	//
	p.Container_initialize = p.initialize;
	
	
	p.initialize = function(color) {
		this.Container_initialize();
	
	}
	p.buildSprite = function(img) {
		var ss = new createjs.SpriteSheet( {
			"framerate":24,
			"animations":{
				"rest":[1,19],
				'windup':[19,25],
				"shoot":[25,46]
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
		ss.getAnimation('rest').speed = 1;
		ss.getAnimation('windup').speed = 1.2;
		ss.getAnimation('shoot').speed = 1.2;
		ss.getAnimation('rest').next = 'rest';
		ss.getAnimation('windup').next = 'shoot';
		ss.getAnimation('shoot').next = 'rest';
		var sprite = new createjs.Sprite(ss);
		this.sprite = sprite;
		this.addChild(sprite);
	}
	p.stopMoving = function(){
		this.sprite.gotoAndStop(1);
	}
	p.startMoving = function(){
		this.sprite.gotoAndPlay('rest');
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
 
	hamvturkey.Turkey = Turkey;
}());