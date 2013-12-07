this.hamvturkey = this.hamvturkey || {};
(function() {
	var SoundManager = function(loader) {
	  this.initialize(loader);
	}
	SoundManager.SHOOT = 'sfx_shoot';
	SoundManager.BOING = 'sfx_boing';
	SoundManager.IMPACT = 'sfx_impact';
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
	p.impact = function(){
		this.playSFX(SoundManager.IMPACT)
	}

	hamvturkey.SoundManager = SoundManager;
}());