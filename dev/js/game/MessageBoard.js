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
		var paddingX = 22, paddingY =20;
		for(i=0;i<15;i++){
			digit = this.addChild(new hamvturkey.Digit(ss));
			digit.x  =paddingX+ i*27;
			digit.y = paddingY;
			this.chars.push(digit);
		}
		this.addChildAt(new createjs.Bitmap(bg_asset),0);		
	}
	p.showMessage = function(lines,duration){
		createjs.Tween.removeTweens(this);
		var frameLength = duration/lines.length;
		for(var i = 0;i<lines.length;i++){
			this.queueLine(lines[i],frameLength,i*frameLength);
		}
		createjs.Tween.get(this).wait(duration).call(createjs.proxy(this.onMessageFinished,this));
	};
	
	p.onMessageFinished = function(){
		this.clearBoard(200);
		this.dispatchEvent('complete');
	}
	p.queueLine = function(line,duration,delay){
			createjs.Tween.get(this).wait(delay).call(createjs.proxy(
				function(){
					console.log(line, delay)
					this.showLine(line,duration);
				},this));
	}
	p.showLine = function(line,duration){
		var chars = line.split('');
		var center = this.chars.length-chars.length;
		center = Math.floor(center*.5);
		this.clearBoard();	
		for(var i =0;i<chars.length && (i+center<this.chars.length);i++){
			this.chars[i+center].transition(this.getFrame(chars[i]));
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
		console.log(val);
		if(val == " "){
			return 'blank';
		}
		if(isNaN(val)){
			switch(val){
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
			return this.chars[0].getFrame(val);
		}
	}
	p.announceSave = function(){
		this.showMessage(["save by ham!!!","delicious..."],3000);
	}

	hamvturkey.Messageboard = Messageboard;
}());