this.hamvturkey = this.hamvturkey || {};
(function(){
	//
	var Scoreboard = function(bg_asset,digit_asset,message_asset) {
	  this.initialize(bg_asset,digit_asset,message_asset);
	}
	var p = Scoreboard.prototype = new createjs.Container();
	//
	p.Container_initialize = p.initialize;
	p.showY = 33;
	p.hideX = 50;
	p.hideY = -200;
	p.showX = 126;
	p.initialize = function(bg_asset,digit_asset,message_asset) {
	    this.Container_initialize();
		var ss = new createjs.SpriteSheet( {
			"framerate":24,
			"animations":{
				"lit":[64,64],
				"bg":[63,63],
				"blank":[63,63],
				'n0':[23,23],
				"n1":[24,44],
				"n2":[25,25],
				"n3":[26,26],
				"n4":[27,27],
				"n5":[28,28],
				"n6":[29,29],
				"n7":[30,30],
				"n8":[31,31],
				"n9":[32,32],
				'A':[33,33],
				"B":[34,34],
				"C":[35,35],
				"D":[36,36],
				"E":[37,37],
				"F":[38,38],
				"G":[39,39],
				"H":[40,40],
				"I":[41,41],
				"J":[42,42],
				"K":[43,43],
				"L":[44,44],
				"M":[45,45],
				"N":[46,46],
				"O":[47,47],
				"P":[48,48],
				"Q":[49,49],
				"R":[50,50],
				"S":[51,51],
				"T":[52,52],
				"U":[53,53],
				"V":[54,54],
				"W":[55,55],
				"X":[56,56],
				"Y":[57,57],
				"Z":[58,58],
				"questionmark":[12,12],
				"period":[8,8],
				"comma":[7,7],
				"asterix":[6,6],
				"rparentheses":[5,5],
				"lparentheses":[4,4],
				"quotes":[3,3],
				"exclamation":[2,2],
				'hyphen':[1,1],
				'apostrophe':[0,0]
				
			},
			"images":[digit_asset],
			"frames":{
				"regX":0,
				"regY":0,
				"height":43,
				"width":27,
				"count":65
			}
		});
		this.bg = this.addChild(new createjs.Bitmap(bg_asset));
		this.y = this.hideY;
		this.shots = this.addChild(new hamvturkey.DoubleDigit(ss));
		this.shots.x = 52; 
		this.saves = this.addChild(new hamvturkey.DoubleDigit(ss));
		this.saves.x = 190; 
		this.goals = this.addChild(new hamvturkey.DoubleDigit(ss));
		this.goals.x = 335; 
		this.shots.y = this.saves.y = this.goals.y = 57;
		//this.scaleX = this.scaleY = .75;
		this.x = this.hideX;
		this.messages = this.addChild(new hamvturkey.Messageboard(ss,message_asset));
		this.messages.y =113; 
		//this.x = 112;
	}
	p.lower = function(callback){
		if(!callback) callback = function(){};
		createjs.Tween.get(this).to({y:this.showY},500,createjs.Ease.backOut);
		createjs.Tween.get(this).wait(500).to({scaleX:.7,scaleY:.7,x:this.showX},500,createjs.Ease.circOut).call(callback);
	}
	p.raise = function(callback) {
		if(!callback) callback = function(){};
		createjs.Tween.get(this).to({y:this.hideY},2500,createjs.Ease.backIn).call(callback)
		createjs.Tween.get(this).wait(500).to({scaleX:1,scaleY:1,x:this.hideX},500,createjs.Ease.backIn);
	}
	
	hamvturkey.Scoreboard = Scoreboard;
}());