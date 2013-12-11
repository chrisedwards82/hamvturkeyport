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
			container:null,
			score:0,
			shots:10,
			saves:0,
			imgPath:'assets/img/',
			audioPath:'assets/sound/',
			init:function(){	
				//
				this.loadPreloaderAssets();
			},
			onShot:function(event){
				//console.log(event);
				var stageX = this.crosshairs.x;
				var stageY = this.crosshairs.y;
				var p = this.container.addChild(new hamvturkey.Puck(this.loader.getResult('puck').src));
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
			loadPreloaderAssets:function(){
				var imgPath = 'assets/img/';
				manifest= [
					{src:imgPath+"sprite_preloader_bg.jpg",id:hamvturkey.Preloader.BG},
					{src:imgPath+"sprite_thermometer_bg.png",id:hamvturkey.Preloader.THERMOMETER},
					{src:imgPath+"sprite_thermometer_arrow.png",id:hamvturkey.Preloader.ARROW}
				];
				
				this.loader = new createjs.LoadQueue(false);
				this.loader.addEventListener("complete", createjs.proxy(this.onPreloaderAssetsLoaded,this));
				this.loader.loadManifest(manifest);
			},
			onPreloaderAssetsLoaded:function(event){
				this.initStage();
				this.preloader = this.stage.addChild(new hamvturkey.Preloader(this.loader));
				this.preloader.intro(createjs.proxy(this.loadAssets,this));
				
			//	this.loadAssets();
			},
			loadAssets:function(){
				//view-source:http://localhost/EaselJs/examples/SpriteSheet.html
				//compress pngs: https://tinypng.com/
				//modify sounds: audacity
				
				manifest = [
					{src:this.imgPath+"sprite_bg.jpg",id:"bg"},
					{src:this.imgPath+"sprite_turkey.png",id:"turkey"},
					{src:this.imgPath+"sprite_ham.png",id:"ham"},
					{src:this.imgPath+"sprite_digits_trans.png",id:"digits"},
					{src:this.imgPath+"sprite_scoreboard.png",id:"scoreboard"},
					{src:this.imgPath+"crosshairs.png",id:"crosshairs"},
					{src:this.imgPath+"sprite_fruitcake.png",id:"puck"},
					{src:this.imgPath+"sprite_gameon_bg.jpg",id:"gameon"}
				];
				this.loader = new createjs.LoadQueue(false);
				this.sound = new hamvturkey.SoundManager(this.loader);
				if(createjs.Sound.initializeDefaultPlugins()){
					//add audio to manifest
					this.sound.soundEnabled = true;
					manifest.push(
						{id:hamvturkey.SoundManager.SCORES, src:this.audioPath+'scores.mp3|'+this.audioPath+'scores.ogg'},
						{id:hamvturkey.SoundManager.THEME, src:this.audioPath+'turkeyvsham.mp3|'+this.audioPath+'turkeyvsham.ogg'},
						{id:hamvturkey.SoundManager.SAVE, src:this.audioPath+'save.mp3|'+this.audioPath+'save.ogg'},
						{id:hamvturkey.SoundManager.SHOOT, src:this.audioPath+'shoot.mp3|'+this.audioPath+'shoot.ogg'},
						{id:hamvturkey.SoundManager.BOING_1, src:this.audioPath+'boing.mp3|'+this.audioPath+'boing.ogg'},
						{id:hamvturkey.SoundManager.BOING_2, src:this.audioPath+'boing2.mp3|'+this.audioPath+'boing2.ogg'},
						{id:hamvturkey.SoundManager.BOING_3, src:this.audioPath+'boing3.mp3|'+this.audioPath+'boing3.ogg'},
						{id:hamvturkey.SoundManager.IMPACT, src:this.audioPath+'impact.mp3|'+this.audioPath+'impact.ogg'}
					);
					createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);  // need this so it doesn't default to Web Audio
					this.loader.installPlugin(createjs.Sound);					
				}
				this.loader.addEventListener('progress', createjs.proxy(this.preloader.onLoadProgress,this.preloader));
				this.loader.addEventListener("complete", createjs.proxy(this.preloader.onLoadComplete,this.preloader));
				this.preloader.addEventListener("complete", createjs.proxy(this.onAssetsLoaded,this));
				
				this.loader.loadManifest(manifest);
			},
			onAssetsLoaded:function(event){
				console.log(event);			
				//TODO wrap this all in a "click/touch to play" event
				this.container = this.stage.addChildAt(new createjs.Container(),0);
				this.container.setBounds(0,0,550,367);
				this.bg = this.container.addChild(new createjs.Bitmap(this.loader.getResult("bg")));
				this.turkey = this.container.addChild(new hamvturkey.Turkey());
				this.turkey.y = 120;
				this.turkey.x = 290;
				this.turkey.scaleX = this.turkey.scaleY = .9;
				this.turkey.buildSprite(this.loader.getResult("turkey"));
				this.goal = this.container.addChild(new hamvturkey.Goal(83,60,250,200,7,.01));
				this.ham =  this.container.addChild(new hamvturkey.Ham(85));
				this.ham.x = this.goal.x;
				this.ham.y = this.goal.y;
				this.ham.buildSprite(this.loader.getResult("ham"));
				this.scoreboard = this.container.addChild(new hamvturkey.Scoreboard(this.loader.getResult("scoreboard"),this.loader.getResult("digits")));
				createjs.Tween.get(this).wait(500).call(createjs.proxy(this.circleWipe,this));
			},
			circleWipe:function(){
				
				var bounds = this.container.getBounds();
				this.stage.removeChild(this.preloader); 
				this.gameon = this.stage.addChildAt(new createjs.Bitmap(this.loader.getResult('gameon')),0);
				this.circlemask = new createjs.Shape();
				this.circlemask.graphics.beginFill('red').drawCircle(0,0,bounds.width);
				this.circlemask.x = bounds.width*.5;
				this.circlemask.y = bounds.height*.5;
				this.circlemask.cache(bounds.x,bounds.y,bounds.width,bounds.height);
				this.container.cache(bounds.x,bounds.y,bounds.width,bounds.height);
				this.container.mask = this.circlemask;
				this.circlemask.scaleX = this.circlemask.scaleY = 0;
				createjs.Tween.get(this.circlemask).wait(1000).to({scaleX:1,scaleY:1},900).call(createjs.proxy(this.startSong,this));
			},
			startSong:function(){
				this.container.uncache();
				this.container.mask = null;
				this.stage.removeChild(this.gameon);
				this.scoreboard.shots.transition(this.shots);
				this.scoreboard.goals.transition(this.score);
				this.scoreboard.saves.transition(this.saves);
				this.turkey.startMoving();
				this.ham.dance();
				this.turkey.startMoving();
				this.ham.startMoving();
				var game = this, tHam, tTurkey;
				var turkey_delay = 4500, count=0;
				var lis = game.ham.on(hamvturkey.Ham.DANCE_COMPLETE,function(){
					count++;
					if(count<4){
						game.turkey.crouch();
						tTurkey = createjs.Tween.get(game.turkey).wait(1500).call(createjs.proxy(game.turkey.startMoving, game.turkey));
						tHam = createjs.Tween.get(game.ham).wait(1500).call(createjs.proxy(game.ham.dance, game.ham));
					}else {
						game.ham.off(lis);
						game.startGame();
						game.turkey.crouch();
					}
				});
				var song = this.sound.playSong(hamvturkey.SoundManager.THEME);
				song.addEventListener('complete',function(){
					game.turkey.startMoving();
				});
				//createjs.Tween.wait(100).call(createjs.proxy(turkey.crouch, turkey))
			},
			startGame:function(){
				this.ham.startMoving();
				this.stage.on('click',createjs.proxy(this.onShot,this));
				this.ham.mousEnabled = false;
				this.stage.enableMouseOver(10);
				this.crosshairs = this.container.addChild(new createjs.Bitmap(this.loader.getResult('crosshairs')));
				this.crosshairs.regX = this.crosshairs.regY = 12.5;
			},
			initStage:function(){
				this.stage = new createjs.Stage("gameCanvas");
				createjs.Ticker.setFPS(60);
				createjs.Ticker.addEventListener("tick", createjs.proxy(this.tick,this));
			},
			tick:function(event){

				if(this.crosshairs) this.updateCursor();
				if(this.ham) this.ham.move();
				this.stage.update();
				
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