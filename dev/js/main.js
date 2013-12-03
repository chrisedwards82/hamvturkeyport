


var Game = {
	
	stage:null,
	
	init:function(){
		this.stage = new createjs.Stage("gameCanvas");
		var turkey = this.stage.addChild(new Turkey('blue'));
		turkey.x = 100;
		turkey.y = 100;
		//
		this.startGame();
	},
	startGame:function(){
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.stage);
	}
	
};

$(document).ready(function(){
	//alert("let's do it");
	Game.init();
});

$(window).load(function(){
	
});




