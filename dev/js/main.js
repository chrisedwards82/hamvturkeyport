
this.hamvturkey = this.hamvturkey || {};
(function(){
	
	function Game(){
		this.init();
	}
	Game.prototype = {
			stage:null,
			turkey:null,
			goal:null,
			ham:null,
			loader:null,

			init:function(){
				this.stage = new createjs.Stage("gameCanvas");
				this.turkey = this.stage.addChild(new Turkey('blue'));
				this.turkey.x = 195;
				this.turkey.y = 100;
				this.goal = new Goal(200,100,12);
				this.goal.x = 100;
				this.goal.y = 60;
				this.stage.addChildAt(this.goal,0);
				this.ham =  this.goal.addChild(new Ham('red',200));
				this.ham.x = 0;
				this.ham.y = 20;
				//
				this.loadAssets();
			},
			onShot:function(event){
				console.log(event);
				var stageX = event.stageX;
				var stageY = event.stageY;
				var p = this.stage.addChild(new Puck());
				p.x = 300;
				p.y = 345;
				
				var proxy = createjs.proxy(this.onPuckContact,this);
				p.on('hit',proxy);
				//to be called after shot animation
				this.turkey.shoot(
					function(){
						p.fire(event.stageX,event.stageY);
					}
				);
				//play the sound here


			},
			onPuckContact: function (event){
				//console.log('shoot!');
				var puck = event.currentTarget;
				var pt = this.goal.globalToLocal(puck.x,puck.y);
				var arr = this.goal.getObjectsUnderPoint(pt.x,pt.y);
				//console.log(pt);
				if(this.ham.hitTest(pt.x,pt.y)){
					alert('save by the ham');
				}else {
					switch(arr[0]){
						case this.goal.right_crossbar:
							alert('wide right');
						break;
						case this.goal.left_crossbar:
							alert('wide left');
						break;
						case this.goal.top_crossbar:
							alert('off the crossbar');
						break;
						default:
							alert('goal!!!!');
						break;
					}
				}

			},
			loadAssets:function(){
				//view-source:http://localhost/EaselJs/examples/SpriteSheet.html
				manifest = [
					{src:"img/sprite_turkey.png",id:"turkey"}
				];
				if(createjs.Sound.initializeDefaultPlugins()){
					//add audio to manifest
					//manifest.push();
				}
				this.loader = new createjs.LoadQueue(false);
				this.loader.addEventListener("complete", createjs.proxy(this.onAssetsLoaded,this));
				this.loader.loadManifest(manifest);
			},
			onAssetsLoaded:function(event){
				console.log(event);			
				//TODO wrap this all in a "click/touch to play" event
				this.turkey.buildSprite(this.loader.getResult("turkey"));
				this.startGame();
			},
			startGame:function(){
				createjs.Ticker.setFPS(60);
				createjs.Ticker.addEventListener("tick", this.stage);
				this.goal.on('click',createjs.proxy(this.onShot,this));
			}
			
	}
	hamvturkey.Game = Game;
}());


var game, isMobile;
$(document).ready(function(){
	//alert("let's do it");
	if(isMobile){
		//launch game on touch prompt
	} else {
		game = new hamvturkey.Game();
	}
	//Game.init();
});

$(window).load(function(){
	
});




