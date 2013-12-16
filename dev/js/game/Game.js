this.hamvturkey = this.hamvturkey || {};
(function(){
	
	function Game(skipSong){
		this.init(skipSong);
	}
	Game.prototype = {
			//
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
			skipSong:false,
			isTouch:false,
			shotLanded:true,
			imgPath:'assets/img/',
			audioPath:'assets/sound/',
			init:function(isTouch,skipSong){	
				//
				if(!skipSong){
					this.skipSong = isTouch;
				}
				this.isTouch = isTouch;
				this.loadPreloaderAssets();
			},
			onShot:function(event){
				console.log(event);
				if(this.shots<=0) return;
				if(!this.shotLanded) return;
				this.shotLanded = false;
				
				var stageX = event.stageX;
				var stageY = event.stageY;
				if(this.crosshairs){
					stageX = this.crosshairs.x;
					stageY = this.crosshairs.y;
				}
				var p = this.container.addChildAt(new hamvturkey.Puck(this.loader.getResult('puck').src),this.container.getChildIndex(this.turkey));
				p.x = 300;
				p.y = 345;
				p.on('hit',createjs.proxy(this.onPuckContact,this));
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
				//console.log('puckpoint:',pt);
				//console.log('hamx:',this.ham.x);
				//if(this.ham.hitTest(pt.x,pt.y)){
				var h = this.ham.getBounds();
				if((pt.x>h.x) && (pt.x < h.x+h.width) && (pt.y > h.y) && (pt.y<h.y+h.height) ){
					
					//alert('save by the ham');
					this.ham.save();
					this.sound.impact();
					puck.drop(270);
					this.sound.announcer.save();
					this.saves++;
					this.scoreboard.saves.transition(this.saves);
					this.scoreboard.messages.announceSave();
					
				}else {					
					switch(arr[0]){
						case this.goal.right_crossbar:
							//alert('wide right');
							puck.deflectRight();
							this.sound.boing();
							this.scoreboard.messages.showMessage(["Wide right","wide",'right'],2000);
							
						break;
						case this.goal.left_crossbar:
							//alert('wide left');
							this.sound.boing();
							puck.deflectLeft();
							this.scoreboard.messages.showMessage(["Wide left!",'wide left!',"you",'just','missed...'],3000);
							
						break;
						case this.goal.top_crossbar:
							//alert('off the crossbar');
							this.sound.boing();
							puck.deflectUp();
							this.scoreboard.messages.showMessage(["Awwww....","too high",'aim lower!'],2000);
							
						break;
						default:
							//alert('goal!!!!');
							this.goal.addChildAt(puck,this.goal.getChildIndex(this.ham)-1);
							puck.x -=this.goal.x;
							puck.y-=this.goal.y;
							puck.drop(50);
							this.score++;
							this.scoreboard.goals.transition(this.score);
							this.sound.announcer.scores();
							this.scoreboard.messages.showMessage(["Turkey","Scores","!!!!","Yeah Buddy!!!"],3000);
							if(this.score>3)this.ham.speedUp();
						break;
					}
				}
				this.shotLanded = true;
					this.shots--;
					this.scoreboard.shots.transition(this.shots);
				if(this.shots<=0){
					this.gameOver();
				}

			},
			gameOver:function(){
				var messages = ['Game over','game','over'];
				switch(this.score){
					case 10:
						messages = ['10 out of 10!','perfect game!','congrats!!!'];
					break;
					case 5:
						messages = ['5 out of 10?',"It's a draw...",'Try the fish?','Try again.'];
					break;
					case 0:
						messages.push('you missed...');
						messages.push('every shot...')
						messages.push('...');
						messages.push(':(');
						messages.push(':( :( :( :(');
						messages.push(':(');
						messages.push('Are you...');
						messages.push('A vegetarian?');
						messages.push(':(');

					break;
					default:
						if(this.score>5){
							messages.push('Turkey Wins!!!');
							messages.push('Turkey!');
							messages.push('Wins!');
							messages.push(this.score+' out of 10...');
							messages.push('not bad...');
							messages.push('but can you...')
							messages.push('do better?');
							messages.push('try again.');
						}else {
							messages.push(this.score+' out of 10?')
							if(this.saves>5){
								messages.push(this.saves+' saves...')
								messages.push("that's...");
								messages.push('one');
								messages.push('tough');
								messages.push('ham!');
							}
						
							messages.push('try again.');
							this.ham.dance();
						}
					break;	
				}
				this.scoreboard.shots.transition('0');
				if(this.crosshairs) createjs.Tween.get(this.crosshairs).to({alpha:0},500);
				this.ham.stopMoving();
				this.scoreboard.messages.showMessage(messages,messages.length*1500,createjs.proxy(this.resetGame,this));
				this.sound.playSFX(hamvturkey.SoundManager.GAMEOVER);
			},
			resetGame:function(){
				this.shots = 10;
				this.score = 0;
				this.saves = 0;
				var messages = ["Fire","when",'ready...'];
				this.scoreboard.messages.showMessage(messages,messages.length*1000);
				this.scoreboard.shots.transition(this.shots,200,0);
				this.scoreboard.saves.transition(this.saves,200,0);
				this.scoreboard.goals.transition(this.score,200,0);
				if(this.crosshairs) createjs.Tween.get(this.crosshairs).to({alpha:1},500);
				this.ham.startMoving();
				var i;
				for(i=0;i<this.container.children.length;i++){
					if(this.container.children[i] instanceof hamvturkey.Puck){
						this.container.children[i].disappear();
					}
				}
				this.goal.clearPucks();
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
					{src:this.imgPath+"sprite_message_bg.png",id:"messageboard"},
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
						{id:hamvturkey.SoundManager.SAVE, src:this.audioPath+'save.mp3|'+this.audioPath+'save.ogg'},
						{id:hamvturkey.SoundManager.SHOOT, src:this.audioPath+'shoot.mp3|'+this.audioPath+'shoot.ogg'},
						{id:hamvturkey.SoundManager.BOING_1, src:this.audioPath+'boing.mp3|'+this.audioPath+'boing.ogg'},
						{id:hamvturkey.SoundManager.BOING_2, src:this.audioPath+'boing2.mp3|'+this.audioPath+'boing2.ogg'},
						{id:hamvturkey.SoundManager.BOING_3, src:this.audioPath+'boing3.mp3|'+this.audioPath+'boing3.ogg'},
						{id:hamvturkey.SoundManager.GAMEOVER, src:this.audioPath+'gameover.mp3|'+this.audioPath+'gameover.ogg'},
						{id:hamvturkey.SoundManager.IMPACT, src:this.audioPath+'impact.mp3|'+this.audioPath+'impact.ogg'}
					);
					if(!this.skipSong){
						manifest.push({id:hamvturkey.SoundManager.THEME, src:this.audioPath+'turkeyvsham.mp3|'+this.audioPath+'turkeyvsham.ogg'});
					}
					createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);  // need this so it doesn't default to Web Audio
					this.loader.installPlugin(createjs.Sound);					
				}
				this.loader.addEventListener('progress', createjs.proxy(this.preloader.onLoadProgress,this.preloader));
				this.loader.addEventListener("complete", createjs.proxy(this.preloader.onLoadComplete,this.preloader));
				this.preloader.addEventListener("complete", createjs.proxy(this.onAssetsLoaded,this));
				
				this.loader.loadManifest(manifest);
			},
			onAssetsLoaded:function(event){
				//console.log(event);			
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
				this.ham =  this.goal.addChild(new hamvturkey.Ham(85));
				this.ham.buildSprite(this.loader.getResult("ham"));
				this.scoreboard = this.container.addChild(new hamvturkey.Scoreboard(this.loader.getResult("scoreboard"),this.loader.getResult("digits"),this.loader.getResult("messageboard")));
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
				createjs.Tween.get(this.circlemask).wait(1000).to({scaleX:1,scaleY:1},900).call(createjs.proxy(this.playSong,this));
			},
			playSong:function(){
				this.container.uncache();
				this.container.mask = null;
				this.stage.removeChild(this.gameon);
				if(this.sound.soundEnabled && !this.skipSong){
					this.turkey.startMoving();
					this.ham.dance();
					var game = this, tHam, tTurkey;
					var turkey_delay = 4500, count = 0;
					console.log(count);
					var lis = game.ham.on(hamvturkey.Ham.DANCE_COMPLETE,function(){
						count++;
						if(count==2){
							//
						}
						if(count<=4){
							game.turkey.crouch();
							createjs.Tween.get(game.turkey).wait(1500).call(createjs.proxy(game.turkey.startMoving, game.turkey));
							createjs.Tween.get(game.ham).wait(1500).call(createjs.proxy(game.ham.dance, game.ham));
						}else if(count == 5){
							game.ham.dance();
						}else {
							game.ham.off(lis);
							game.turkey.crouch();
						}
					});
					var song = this.sound.playSong(hamvturkey.SoundManager.THEME);
					song.addEventListener('complete',function(){
						game.startGame();
					});
				}else {
					this.startGame();
				}
			},
			startGame:function(){
				this.scoreboard.lower(createjs.proxy(function(){
					this.scoreboard.shots.transition(this.shots,200,0	);
					this.scoreboard.saves.transition(this.saves,200,500);
					this.scoreboard.goals.transition(this.score,200,500);
					
				},this));
				this.ham.startMoving();
				this.turkey.startMoving();
				this.container.on('click',createjs.proxy(this.onShot,this));
				this.ham.mousEnabled = false;
				this.stage.enableMouseOver(10);
				if(!this.isTouch){
					this.crosshairs = this.container.addChild(new createjs.Bitmap(this.loader.getResult('crosshairs')));
					this.crosshairs.regX = this.crosshairs.regY = 12.5;
				}
				var action = "Click";
				if(this.isTouch) action = "Tap";
				var messages = [];
				for(var i = 0;i<10;i++) messages.push(action+' goal','to shoot');
				this.scoreboard.messages.showMessage(messages,messages.length*2000);
				
			},
			initStage:function(){
				this.stage = new createjs.Stage("gameCanvas");
				createjs.Ticker.setFPS(60);
				createjs.Ticker.addEventListener("tick", createjs.proxy(this.tick,this));
			},
			tick:function(event){
				this.updateCursor();
				if(this.ham) this.ham.move();
				this.stage.update();
			},
			updateCursor:function(){
				if(!this.crosshairs) return;
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