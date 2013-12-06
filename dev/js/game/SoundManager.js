this.hamvturkey = this.hamvturkey || {};
(function() {
	var SoundManager = function(loader) {
	  this.initialize(loader);
	}
	SoundManager.SHOOT = 'sfx_shoot';
	SoundManager.BOING = 'sfx_boing';
	var p = SoundManager.prototype = {
		loader:null,
		soundEnabled:false
	};
	
	p.initialize = function(loader){
		this.loader = loader;
	}
		
	p.playSFX = function(id){
		if(this.soundEnabled){
			createjs.Sound.play(this.loader.getResult(id).src);
		}
	}
	p.boing = function(){
		this.playSFX(SoundManager.BOING)
	}
	

	hamvturkey.SoundManager = SoundManager;
}());