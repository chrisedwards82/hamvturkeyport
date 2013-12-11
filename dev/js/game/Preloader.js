this.hamvturkey = this.hamvturkey || {};
(function(){
	//
	var Preloader = function(loader) {
	  this.initialize(loader);
	}
	Preloader.BG = 'pl_bg';
	Preloader.THERMOMETER = 'pl_thermometer';
	Preloader.ARROW = 'pl_arrow';
	var p = Preloader.prototype = new createjs.Container();
	//
	p.Container_initialize = p.initialize;
	
	p.initialize = function(loader) {
	    this.Container_initialize();
		this.bg = this.addChild(new createjs.Bitmap(loader.getResult(Preloader.BG)));
		this.thermometer = this.addChild(new createjs.Bitmap(loader.getResult(Preloader.THERMOMETER)));
		this.thermometer.regX = this.thermometer.regY = 95;
		this.thermometer.x = 426;
		this.thermometer.y = 236;
		this.arrow = this.addChild(new createjs.Bitmap(loader.getResult(Preloader.ARROW)));
		this.arrow.regX = this.arrow.regY = 15;
		this.arrow.x = 426;
		this.arrow.y = 236;
		this.arrow.rotation = 30;
		this.arrow.alpha = 0;
		this.bg.alpha = 0;
		this.thermometer.scaleX = this.thermometer.scaleY = 0;
	}
	p.intro = function(callback){
		//var tweens = [];
		var delay = 0;
		createjs.Tween.get(this.bg).to({alpha:1},300);
		createjs.Tween.get(this.thermometer).wait(delay+=300).to({scaleX:1,scaleY:1}, 300);
		createjs.Tween.get(this.arrow).wait(delay+=300).to({alpha:1},300).call(callback);
	}
	p.onLoadProgress = function(event){
	//	console.log(event);
		var targ = Math.round(event.loaded * 270)+30;
		if(!isNaN(targ)){
			createjs.Tween.get(this.arrow,{override:true}).to({rotation:targ},1500);
			//console.log(targ);
		}
	}
	p.onLoadComplete = function(event) {
		createjs.Tween.get(this.arrow,{override:true}).to({rotation:300},500).call(
			createjs.proxy(this.outro,this)
		);
	}
	p.outro = function(){
		createjs.Tween.get(this.arrow).to({alpha:0},100);
		createjs.Tween.get(this.thermometer).wait(100).to(
			{scaleX:0,scaleY:0}, 300).call(createjs.proxy(this.outroed,this));
	}
	p.outroed = function(){
		this.dispatchEvent('complete')
	}
	hamvturkey.Preloader = Preloader;
}());