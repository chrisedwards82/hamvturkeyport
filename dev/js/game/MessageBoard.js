this.hamvturkey = this.hamvturkey || {};
(function(){
	//
	var Messageboard = function(spritesheet,bg_asset) {
	  this.initialize(spritesheet,bg_asset);
	}
	var p = Messageboard.prototype = new createjs.Container();
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(ss,bg_asset) {
	    this.Container_initialize();
		this.chars = [];
		var i, digit;
		var paddingX = 11, paddingY =14;
		for(i=0;i<14;i++){
			digit = this.addChild(new hamvturkey.Digit(ss));
			digit.x  =paddingX+ i*27;
			digit.y = paddingY;
			this.chars.push(digit);
		}
		var bg = this.addChildAt(new createjs.Bitmap(bg_asset),0);		
		bg.scaleX = bg.scaleY = .9;
		
	}
	p.showMessage = function(lines,duration,callback){
		createjs.Tween.removeTweens(this);
		var frameLength = duration/lines.length;
		for(var i = 0;i<lines.length;i++){
			this.queueLine(lines[i],frameLength,i*frameLength);
		}
		if(callback){
			createjs.Tween.get(this).wait(duration).call(callback);
		}
		createjs.Tween.get(this).wait(duration).call(createjs.proxy(this.clearBoard,this));
		
	};
	
	p.queueLine = function(line,duration,delay){
		createjs.Tween.get(this).wait(delay).call(createjs.proxy(
		function(){
		//	console.log(line, delay)
			this.showLine(line,duration);
		},this));
	}
	p.showLine = function(line,duration){
		var chars = line.split('');
		var center = this.chars.length-chars.length;
		center = Math.round(center*.5);
		this.clearBoard();	
		for(var i =0;i<chars.length && (i+center<this.chars.length);i++){
			try{
				this.chars[i+center].transition(this.getFrame(chars[i]));
			}catch(err){
				console.log(this,'missing frame?',chars[i]);
				console.log(err);
			}
		}
	}
	p.clearBoard = function(speed){
		for(var i = 0;i<this.chars.length;i++){
			if(speed){
				this.chars[i].transition('blank',speed);
			}else{
				this.chars[i].update('blank');
			}
		}
	}
	p.getFrame = function(val) {
		//console.log(val);
		if(val == " "){
			return 'blank';
		}
		if(isNaN(val)){
			switch(val){
				case '?':
					return "questionmark";
				break;
				case ';':
					return "semicolon";
				case ":":
					return "colon"; 
				break;
				case ',':
					return "comma";
				break;
				case '*':
					return "asterix";
				break;
				case ')':
					return "rparentheses";
				break;
				case "(":
					return "lparentheses";
				break;
				case'"':
					return "quotes";
				break;
				case '-':
					return 'hyphen';
				break;
				case "'":
					return 'apostrophe';
				case '!':
					return 'exclamation';
				break;
				case ".":
					return 'period';
				
				default:
					return val.toUpperCase();
				break;
		
			}
		}else {
			//console.log('number',val,this.chars[0].getFrame(val));
			return 'n'+val;
		}
	}
	p.announceSave = function(){
		this.showMessage(["save by ham!!!","delicious..."],3000);
	}

	hamvturkey.Messageboard = Messageboard;
}());