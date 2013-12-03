


var Game = {
	
	stage:null,
	turkey:null,
	goal:null,
	ham:null,
	
	init:function(){
		this.stage = new createjs.Stage("gameCanvas");
	 	
	
		this.turkey = this.stage.addChild(new Turkey('blue'));
		this.turkey.x = 300;
		this.turkey.y = 300;
		
		this.goal = new Goal(200,100,12);
		this.goal.x = 100;
		this.goal.y = 60;
		this.goal.on('click', 
			function(event){
				Game.onShot(event);
			}
		);
		this.stage.addChildAt(this.goal,0);
		
		this.ham =  this.goal.addChild(new Ham('red',200));
		this.ham.x = 0;
		this.ham.y = 50
		
		
		//
		this.startGame();
	},
	onShot:function(event){
		console.log('shoot!',event.target);
		switch(event.target){
			case this.ham:
				console.log('save by the ham!');
			break;
			case this.goal.top_crossbar:
				console.log('off the top crossbar!');
			break;
			case this.goal.right_crossbar:
				console.log('off the right crossbar!');
			break;
			case this.goal.left_crossbar:
				console.log('off left crossbar!');
			break;
			case this.goal.net:
				console.log('goal!')
			break;
		}
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




