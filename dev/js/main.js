


var Game = {
	
	stage:null,
	turkey:null,
	goal:null,
	ham:null,
	
	init:function(){
		this.stage = new createjs.Stage("gameCanvas");
		this.turkey = this.stage.addChild(new Turkey('blue'));
		this.turkey.x = 195;
		this.turkey.y = 100;
		this.goal = new Goal(200,100,12);
		this.goal.x = 100;
		this.goal.y = 60;
		this.stage.addChildAt(this.goal,0);
		this.ham =  this.goal.addChild(new Ham('red',200));
		this.ham.x = 0;
		this.ham.y = 20;
		//
		this.loadAssets();
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
		this.turkey.shoot(
			function(){
				p.fire(event.stageX,event.stageY);
			}
		);
		
		
	},
	onPuckContact: function (puck){
		//console.log('shoot!');
		var pt = this.goal.globalToLocal(puck.x,puck.y);
		this.regX = this.regY = 50;
		var arr = this.goal.getObjectsUnderPoint(pt.x,pt.y);
		
		//console.log(pt);
		if(this.ham.hitTest(pt.x,pt.y)){
			alert('save by the ham');
		}else {
			switch(arr[0]){
				case this.goal.right_crossbar:
					alert('wide right');
				break;
				case this.goal.left_crossbar:
					alert('wide left');
				break;
				case this.goal.top_crossbar:
					alert('off the crossbar');
				break;
				default:
					alert('goal!!!!');
				break;
			}
		}
		
	},
	loadAssets:function(){
		//view-source:http://localhost/EaselJs/examples/SpriteSheet.html
		this.onLoadComplete();
	},
	onLoadComplete:function(){
		this.turkey.buildSprite('img/sprite_turkey.png');
		this.startGame();
	},
	startGame:function(){
		this.goal.on('click', 
			function(event){
				Game.onShot(event);
			}
		);
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




