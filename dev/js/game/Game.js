this.hamvturkey = this.hamvturkey || {};
(function(){
	
	function Game(){
		this.init();
	}
	Game.prototype = {
			stage:null,
			bg:null,
			turkey:null,
			goal:null,
			ham:null,
			loader:null,
			sound:null,

			init:function(){
				this.stage = new createjs.Stage("gameCanvas");
				this.turkey = this.stage.addChild(new Turkey());
				this.turkey.x = 250;
				this.turkey.y = 100;
				this.goal = new Goal(83,60,7,.01);
				this.goal.x = 248;
				this.goal.y = 200;
				this.stage.addChildAt(this.goal,0);
				this.ham =  this.stage.addChild(new Ham(85));
				this.ham.x = this.goal.x;
				this.ham.y = this.goal.y;
				//
				this.loadAssets();
			},
			onShot:function(event){
				console.log(event);
				var stageX = event.stageX;
				var stageY = event.stageY;
				var p = this.stage.addChild(new Puck(this.loader.getResult('puck').src));
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
				//console.log(this.loader.getResult("sfx_shoot"));
				this.sound.playSFX(hamvturkey.SoundManager.SHOOT);
			},
			onPuckContact: function (event){
				//console.log('shoot!');
				var puck = event.currentTarget;
				var pt = this.goal.globalToLocal(puck.x,puck.y);
				var arr = this.goal.getObjectsUnderPoint(pt.x,pt.y);
				//console.log(pt);
				if(this.ham.hitTest(pt.x,pt.y)){
					//alert('save by the ham');
					this.ham.save();
					this.sound.impact();
					puck.drop(270);
				}else {
					this.stage.addChild(puck);
					
					switch(arr[0]){
						case this.goal.right_crossbar:
							//alert('wide right');
							puck.deflectRight();
							this.sound.boing();
						break;
						case this.goal.left_crossbar:
							//alert('wide left');
							this.sound.boing();
							puck.deflectLeft();
							
						break;
						case this.goal.top_crossbar:
							//alert('off the crossbar');
							this.sound.boing();
							puck.deflectUp();
						break;
						default:
							//alert('goal!!!!');
							this.goal.addChild(puck);
							puck.x -=this.goal.x;
							puck.y-=this.goal.y;
							puck.drop(50);
						break;
					}
				}

			},
			loadAssets:function(){
				//view-source:http://localhost/EaselJs/examples/SpriteSheet.html
				//compress pngs: https://tinypng.com/
				//modify sounds: audacity
				var imgPath = 'assets/img/', audioPath = 'assets/sound/';
				manifest = [
					{src:imgPath+"sprite_bg.jpg",id:"bg"},
					{src:imgPath+"sprite_turkey.png",id:"turkey"},
					{src:imgPath+"sprite_ham.png",id:"ham"},
					{src:imgPath+"sprite_fruitcake.png",id:"puck"}
				];
				this.loader = new createjs.LoadQueue(false);
				this.sound = new hamvturkey.SoundManager(this.loader);
				if(createjs.Sound.initializeDefaultPlugins()){
					//add audio to manifest
					this.sound.soundEnabled = true;
					manifest.push(
						{id:hamvturkey.SoundManager.SHOOT, src:audioPath+'shoot.mp3|'+audioPath+'shoot.ogg'},
						{id:hamvturkey.SoundManager.BOING_1, src:audioPath+'boing.mp3|'+audioPath+'boing.ogg'},
						{id:hamvturkey.SoundManager.BOING_2, src:audioPath+'boing2.mp3|'+audioPath+'boing2.ogg'},
						{id:hamvturkey.SoundManager.BOING_3, src:audioPath+'boing3.mp3|'+audioPath+'boing3.ogg'},
						{id:hamvturkey.SoundManager.IMPACT, src:audioPath+'impact.mp3|'+audioPath+'impact.ogg'}

					);
					createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);  // need this so it doesn't default to Web Audio
					this.loader.installPlugin(createjs.Sound);					
				}
				this.loader.addEventListener("complete", createjs.proxy(this.onAssetsLoaded,this));
				this.loader.loadManifest(manifest);
			},
			onAssetsLoaded:function(event){
				console.log(event);			
				//TODO wrap this all in a "click/touch to play" event
				this.bg = this.stage.addChildAt(new createjs.Bitmap(this.loader.getResult("bg")),0)
				this.turkey.buildSprite(this.loader.getResult("turkey"));
				this.ham.buildSprite(this.loader.getResult("ham"));
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