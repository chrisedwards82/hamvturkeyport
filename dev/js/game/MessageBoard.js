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
		var frameLength = duration/lines.length;
		
		this.showLine(lines[0],frameLength,0);
		return;
		
		for(var i = 0;i<lines.length;i++){
		
			this.showLine(lines[i],frameLength,i*frameLength);
		}
	};
	p.showLine = function(line,duration,delay){
		var chars = line.split('');
		var center = this.chars.length-chars.length;
		center = Math.floor(center*.5);
		for(var i =0;i<chars.length;i++){
			this.chars[i+center].transition(this.getFrame(chars[i]));
		}
	}
	p.getFrame = function(val) {
		if(isNaN(val)){
			console.log(val);
			switch(val){
				case '!':
					return 'exclamationpoint';
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