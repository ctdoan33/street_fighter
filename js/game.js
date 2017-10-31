function PlayGround(selector_ch1)
{
	//create the first character
	var ch1 = new Character(selector_ch1);
	var beam = new Beam();
	
	//attaches event listener to the document listening for key strokes
	this.initialize = function(){
		$(document).keydown(function(e) {
			ch1.updateAction(e.keyCode);
		});
	}

	this.mainLoop = function(){
		ch1.drawCharacter();
		if(ch1.action == 68 && ch1.counter==3){
			beam.startBeam(ch1.ch_x);
		}
		beam.updateBeam();
	}

}	//end of PlayGround class

function Character(selector){
	var selector = selector; //store the html id of the character

	var constants = {
		'STANDING': { 'y': 1, 'x': [0, 1, 2, 3] },
		65:  		{ 'y': 2, 'x': [0, 1, 2, 3] },
		39: 		{ 'y': 3, 'x': [0, 1, 2] },
		37: 		{ 'y': 3, 'x': [2, 3, 4] },
		40: 		{ 'y': 9, 'x': [0] },
		83: 		{ 'y': 6, 'x': [0, 1, 2, 3, 4] },
		65: 		{ 'y': 2, 'x': [0, 1, 2] },
		68: 		{ 'y': 0, 'x': [0, 1, 2, 3] },
		70: 		{ 'y': 7, 'x': [0, 1, 2, 3, 4]},
		38: 		{ 'y': 8, 'x': [0, 1, 2, 3, 4, 5, 6]}
	}
	this.counter = 0;			//stores which sprite (in the x-direction) it should display 
	this.action = "STANDING";	//default action is for the character to stand
	this.ch_x=0;					//x_coordinate of the character
	this.ch_y=0;					//y_coordinate of the character
	//ch_x, ch_y and action could really all be private variables and I could have just done var instead of this. but to make debuggin easier, I am making them an instance variable so that it would display when you log the chracter object

	this.drawSprite = function(y, x){
		$('#'+selector).css('background', "url('images/ken.png') "+x*(-70)+"px "+(-80*y)+"px").css('left', this.ch_x+"px").css('top', this.ch_y+140+"px");
	}

	//updates the action
	this.updateAction = function(action){
		this.counter=0;
		this.action = action;
	}
	//updates the character's coordinates and changes the sprite's counter to simulate the character moving
	this.updateCoordinate = function(){
		if(!constants[this.action] || this.counter>=constants[this.action].x.length){
			this.counter=0;
			//if action is anything other than 'STANDING' change the action back to 'STANDING'
			this.action = 'STANDING';
		}

		if(this.action == 37)
			this.ch_x = this.ch_x-10;
		else if(this.action == 39)
			this.ch_x = this.ch_x+10;
		else if(this.action == 38 && this.counter<3)
			this.ch_y = this.ch_y-10;
		else if(this.action == 38 && this.counter>3)
			this.ch_y = this.ch_y+10;

	}

	//draws the character on the screen
	this.drawCharacter = function(){
		// console.log("drawing character");
		this.updateCoordinate();
		this.drawSprite(constants[this.action].y, constants[this.action].x[this.counter++]);
	}
}

function Beam(){
	this.phase=-1;
	this.ch_x=0;
	this.startBeam = function(start){
		this.phase = 0;
		this.ch_x=start+60;
	}
	this.updateBeam = function(){
		if(this.phase >= 0 && this.phase < 2){
			$('#beam').css('background', "url('images/ken.png') "+this.phase*(-70)+"px "+(-80*4)+"px").css('left', this.ch_x+"px");
			this.ch_x+=20;
			this.phase++;
		}else if(this.phase == 2){
			$('#beam').css('background', "url('images/ken.png') "+"0px "+(-80*5)+"px").css('left', this.ch_x+"px");
			this.ch_x+=20;
		}
		if(this.ch_x >= 600){
			$('#beam').css('background', "url('images/ken.png') "+(this.phase-2)*(-70)+"px "+(-80*5)+"px");
			this.phase++;
		}
		if(this.phase >= 6){
			$('#beam').css('background', "none").css('left', "0px");
			this.ch_x=0;
			this.phase=-1;
		}
	}
}