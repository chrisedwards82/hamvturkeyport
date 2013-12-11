this.hamvturkey = this.hamvturkey || {};
(function(){
	//
	var Preloader = function(loader) {
	  this.initialize(loader);
	}
	var p = Preloader.prototype = new createjs.Container();
	//
	p.Container_initialize = p.initialize;
	
	p.initialize = function(loader) {
	    this.Container_initialize();
		this.bg = this.addChild(new createjs.Bitmap(loader.getResult('pl_bg')));
		this.bg.alpha = 0;
	}
	p.intro = function(callback){
		createjs.Tween.get(this.bg,{override:true}).to({alpha:1},500).call(callback);
	}
	hamvturkey.Preloader = Preloader;
}());