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
			crosshairs:null,
			scoreboard:null,
			score:0,
			shots:10,
			saves:0,
			init:function(){	
				this.stage = new createjs.Stage("gameCanvas");
				this.turkey = this.stage.addChild(new hamvturkey.Turkey());
				this.turkey.x = 250;
				this.turkey.y = 100;
				this.goal = new hamvturkey.Goal(83,60,250,200,7,.01);
				
				this.stage.addChildAt(this.goal,0);
				this.ham =  this.stage.addChild(new hamvturkey.Ham(85));
				this.ham.x = this.goal.x;
				this.ham.y = this.goal.y;
				//
				this.loadAssets();
			},
			onShot:function(event){
				//console.log(event);
				var stageX = this.crosshairs.x;
				var stageY = this.crosshairs.y;
				var p = this.stage.addChild(new hamvturkey.Puck(this.loader.getResult('puck').src));
				p.x = 300;
				p.y = 345;
				p.on('hit',createjs.proxy(this.onPuckContact,this));
				if(this.shots>0){
					this.shots--;
					this.scoreboard.shots.transition(this.shots);
				}
				//to be called after shot animation
				this.turkey.shoot(
					function(){
						p.fire(stageX,stageY);
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
					this.sound.announcer.save();
					this.saves++;
					this.scoreboard.saves.transition(this.saves);
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
							this.score++;
							this.scoreboard.goals.transition(this.score);
							this.sound.announcer.scores();
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
					{src:imgPath+"sprite_digits_trans.png",id:"digits"},
					{src:imgPath+"sprite_scoreboard.png",id:"scoreboard"},
					{src:imgPath+"crosshairs.png",id:"crosshairs"},
					{src:imgPath+"sprite_fruitcake.png",id:"puck"}
				];
				this.loader = new createjs.LoadQueue(false);
				this.sound = new hamvturkey.SoundManager(this.loader);
				if(createjs.Sound.initializeDefaultPlugins()){
					//add audio to manifest
					this.sound.soundEnabled = true;
					manifest.push(
						{id:hamvturkey.SoundManager.SCORES, src:audioPath+'scores.mp3|'+audioPath+'scores.ogg'},
						{id:hamvturkey.SoundManager.SAVE, src:audioPath+'save.mp3|'+audioPath+'save.ogg'},
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
				this.crosshairs = this.stage.addChild(new createjs.Bitmap(this.loader.getResult('crosshairs')));
				this.crosshairs.regX = this.crosshairs.regY = 12.5;
				this.scoreboard = this.stage.addChild(new hamvturkey.Scoreboard(this.loader.getResult("scoreboard"),this.loader.getResult("digits")));
				this.startGame();
			},
			startGame:function(){
				createjs.Ticker.setFPS(60);
				createjs.Ticker.addEventListener("tick", createjs.proxy(this.tick,this));
				this.stage.on('click',createjs.proxy(this.onShot,this));
				this.ham.mousEnabled = false;
				this.stage.enableMouseOver(10);
				this.scoreboard.shots.transition(this.shots);
				this.scoreboard.goals.transition(this.score);
				this.scoreboard.saves.transition(this.saves);
			},
			tick:function(event){
				this.updateCursor();
				this.stage.update();
				this.ham.move();
			},
			updateCursor:function(){
				var goal = this.goal.getBounds();
				var mouseX = this.stage.mouseX;
				var mouseY = this.stage.mouseY;
				goal.width-=6;
				if(mouseX<goal.x){
					this.crosshairs.x = goal.x;
				}else if(mouseX>goal.x+goal.width){
					this.crosshairs.x = goal.x+goal.width;
				}else{
					this.crosshairs.x = mouseX;
				}
				if(mouseY<goal.y){
					this.crosshairs.y = goal.y;
				}else if(mouseY>goal.y+goal.height){
					this.crosshairs.y = goal.y+goal.height;
				}else{
					this.crosshairs.y = mouseY;
				}
				this.crosshairs.rotation++;
			}
			
	}
	hamvturkey.Game = Game;
}());