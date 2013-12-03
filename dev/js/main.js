


var Game = {
	
	stage:null,
	turkey:null,
	goal:null,
	ham:null,
	
	init:function(){
		this.stage = new createjs.Stage("gameCanvas");
		this.turkey = this.stage.addChild(new Turkey('blue'));
		this.turkey.x = 360;
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
		this.ham.y = 20;
		//
		this.startGame();
	},
	onShot:function(event){
		console.log(event);
		var stageX = event.stageX;
		var stageY = event.stageY;
		var p = this.stage.addChild(new Puck());
		p.x = 300;
		p.y = 345;
		var p_lis = p.on('hit',function(){
			Game.onPuckContact(this);
			p.off('hit',p_lis);
		});
		//to be called after shot animation
		p.fire(event.stageX,event.stageY);
		
	},
	onPuckContact: function (puck){
		console.log('shoot!');
		
		var pt = this.goal.globalToLocal(puck.x,puck.y);
		this.regX = this.regY = 50;
		//console.log(pt);
		console.log(puck.width,puck.height)
		if(this.ham.hitTest(pt.x,pt.y)){
			alert('save by the ham');
		}else if(this.goal.crossbar.hitTest(pt.x,pt.y)){
			
			pt = this.goal.crossbar.globalToLocal(puck.x,puck.y);
			alert('off the crossbar');
		}else {
			alert('goal!');
		}
		
		return;
		switch(puck){
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




