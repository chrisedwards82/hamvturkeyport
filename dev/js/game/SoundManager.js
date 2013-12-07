this.hamvturkey = this.hamvturkey || {};
(function() {
	var SoundManager = function(loader) {
	  this.initialize(loader);
	}
	SoundManager.SHOOT = 'sfx_shoot';
	SoundManager.BOING_1 = 'sfx_boing_1';
	SoundManager.BOING_2 = 'sfx_boing_2';
	SoundManager.BOING_3 = 'sfx_boing_3';
	SoundManager.IMPACT = 'sfx_impact';
	var p = SoundManager.prototype = {
		loader:null,
		soundEnabled:false
	};
	
	p.initialize = function(loader){
		this.loader = loader;
		this.boings = [SoundManager.BOING_1,SoundManager.BOING_3,SoundManager.BOING_2]
	}
		
	p.playSFX = function(id){
		if(this.soundEnabled){
			createjs.Sound.play(this.loader.getResult(id).src);
		}
	}
	p.boing = function(){
		var i = Math.round(Math.random()*(this.boings.length-1));
		//console.log(i);
		this.playSFX(this.boings[i])
	}
	p.impact = function(){
		this.playSFX(SoundManager.IMPACT)
	}

	hamvturkey.SoundManager = SoundManager;
}());