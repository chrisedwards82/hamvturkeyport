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
		this.arrow = this.addChild(new createjs.Bitmap(loader.getResult(Preloader.ARROW)));

		this.bg.alpha = 0;
	}
	p.intro = function(callback){
		createjs.Tween.get(this.bg,{override:true}).to({alpha:1},500).call(callback);
	}
	p.onLoadProgress = function(event){
		console.log(event);
	}
	p.onLoadComplete = function(event) {

		this.outro();
	}
	p.outro = function(){
		
		this.dispatchEvent('complete');
	}
	hamvturkey.Preloader = Preloader;
}());