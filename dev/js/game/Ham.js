this.hamvturkey = this.hamvturkey || {};
(function() {
	var Ham = function(range) {
	  this.initialize(range);
	}
	var p = Ham.prototype = new createjs.Container();
 	Ham.DANCE_COMPLETE = 'dancecomplete';
	p.count = 0;
	p.speed = .1;
	p.range = 100;
	p.background;
	p.sprite;
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(range) {
	    this.Container_initialize();
	 	this.range = range;
		this.doMove = false;
		//this.background = new createjs.Shape();
		//this.background.graphics.beginFill('green').drawRect(0, 0, 60,60);
		//this.addChild(this.background);
		//this.on("tick", this.handleTick);
		
		this.mouseChildren = false;
	}
	p.buildSprite = function(img){
		var ss = new createjs.SpriteSheet( {
			'framerate':24,
			"animations":{
				"save":[3,7],
				"rest":[6],
				"jump":[5,10],
				"angry":[5,10],
				"dance": {
				        	frames: [5,6,7,8,9,10,5,6,7,8,9,10,5,6,7,8,9,10,5,6,7,8,9,10],
							next: "jump",
				            speed: .35
				         }
			},
			"images":[img],
			"frames":{
				"regX":10,
				"regY":5,
				"height":146,
				"width":142,
				"count":11
			}
		});
		ss.getAnimation('dance').speed = .35;
		ss.getAnimation('angry').speed = .3;
		ss.getAnimation('jump').speed = .5;
		ss.getAnimation('save').speed = 2;
		ss.getAnimation('save').next = 'rest';
		ss.getAnimation('jump').next = 'rest';
		ss.getAnimation('angry').next = 'angry';
		this.sprite = new createjs.Sprite(ss,'rest');
	
		this.sprite.x = this.sprite.y = 0;
		this.sprite.scaleX = this.sprite.scaleY = .5;
		
		this.addChild(this.sprite);
		this.sprite.on('animationend',createjs.proxy(this.danceComplete,this));
		
	}
	p.move = function() {
		if(!this.doMove) return;
		var r = this.range*.5;   
		this.x = Math.sin(this.count)*r;
		this.count+=this.speed;
		this.setBounds(this.x,this.y,60,60)
		
		///	console.log(this.background.x);
	}
	p.startMoving = function(){
		this.speed = .1;
		this.sprite.gotoAndPlay('rest');
		this.doMove = true;
	}
	p.speedUp = function(){
		if(this.speed<.2) {
			this.speed+=.01;
		}else {
			this.sprite.gotoAndPlay('angry');	
		}
	}
	p.stopMoving = function(){
		this.doMove = false;		
	}
	p.save = function(){
		this.sprite.gotoAndPlay('save');
	}
	p.dance = function(){
		this.sprite.gotoAndPlay('dance');
	}
	p.danceComplete = function(event){
		if(event.name == 'dance'){
			this.dispatchEvent(Ham.DANCE_COMPLETE)
		}
	}
 
	hamvturkey.Ham = Ham;
}());