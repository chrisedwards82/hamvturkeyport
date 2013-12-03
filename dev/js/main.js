
var Game = {
	
	stage:null,
	
	init:function(){
		this.stage = new createjs.Stage("gameCanvas");
		var circle = new createjs.Shape();
		circle.graphics.beginFill("red").drawCircle(0, 0, 50);
		circle.x = 100;
		circle.y = 100;
		this.stage.addChild(circle);
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
});

$(window).load(function(){
	Game.init();
});

