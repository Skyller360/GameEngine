/**
* Initializes the grid and obstacle
* @class 
*
* @param {Number} _x - original position x of the grid
* @param {Number} _y - original position y of the grid
* @param {Number} _length - Desired length in pixel for the grid.
* @param {Number} _cases - number of Cases desired.
*
* */ 
function Grid(_x, _y, _length, _cases) 
{
	this.x = _x;
	this.y = _y;
	this.length = _length;
	this.cases = _cases;
	this.caseLength = this.length / this.cases;
	this.Tiles = new Array(this.cases * this.cases).fill(0);
	this.BestPath = null;
	this.Cells = [];

/**
*
* Draw the grid
* default black color 
* 
* */
	// this.Draw = function() 
	// {
	// 	ctx.strokeStyle = '#000000';
	// 	ctx.fillStyle = '#000000';
	// 	for (var i = 0; i * this.caseLength < this.length; i++) 
	// 	{
	// 		for (var j = 0; j * this.caseLength < this.length; j++) 
	// 		{
	// 			ctx.strokeRect(this.x + i * this.caseLength, this.y + j * this.caseLength, this.caseLength, this.caseLength);
	// 			// Draw Obstacles
	// 			if (this.Tiles[j * this.cases + i] == 1) {
	// 				this.Cells.push(new Cell());
	// 				ctx.fillStyle = '#000000';
	// 				ctx.fillRect(this.x + i * this.caseLength, this.y + j * this.caseLength, this.caseLength, this.caseLength);
	// 			}
	// 		}	
	// 	}
	// }
	this.Draw = function () {
		for (var index = 0; index < this.Cells.length; index++) {
			var element = this.Cells[index];
			element.Draw();
		}
	}

/**
*
* Get the mouse position on the Grid<br/>
* exemple => position.x = 0 , position.y = 0. Return Index 0
*
**/	

	this.GetMousePosition = function () 
	{
		var x = Input.MousePosition.x / this.caseLength |0;
		var y = Input.MousePosition.y / this.caseLength |0;

		return new Vector(x, y);	
	}

/**
*
* On debug mode, show the short path
*
**/	

	this.ShowPathDebug = function() 
	{
		if (Application.debugMode) 
		{
			if(this.BestPath != null){
				for (vector of this.BestPath) 
				{
					ctx.fillStyle = 'rgba(51,255,255,0.33)';
					ctx.fillRect(this.x + vector.x * this.caseLength, this.y + vector.y * this.caseLength, this.caseLength, this.caseLength);
				}	
			}
		}
	}
	
	this.Awake = function()
	{
		for (var index = 0; index < this.cases; index++) {
			for(var j = 0; j < this.cases; j++)
			{
				this.Cells.push(new Cell(j, index, this.caseLength, this));	
			}			
		}
	}
	this.Awake();
}

function Cell(_x, _y, _size, _grid)
{
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = "white";
	this.grid = _grid;
	this.scalePaint = 100;
	this.goal = 100;
	
	this.Draw = function (){
		ctx.strokeStyle = "black";
		ctx.drawImage(Images['Block'], this.grid.x + this.x * this.size, this.grid.y +  this.y * this.size, this.size, this.size);
		if(this.color != 'white')
		{
			this.scalePaint = Tween.newLinear(this.scalePaint, this.goal, Time.deltaTime * 150, 0.05);
			var size = this.size * this.scalePaint / 100;
			var posX = this.grid.x + this.x * this.size + (1 - this.scalePaint / 100) * this.size / 2;
			var posY = this.grid.y + this.y * this.size + (1 - this.scalePaint / 100) * this.size / 2;
			ctx.fillStyle = this.color;
			//ctx.fillRect(this.grid.x + this.x * this.size, this.grid.y +  this.y * this.size, this.size, this.size);
			ctx.fillRect(posX, posY, size, size);	
		}		
		ctx.strokeRect(this.grid.x + this.x * this.size, this.grid.y + this.y * this.size, this.size, this.size);
	}	
	
	this.SetColor = function(_value){
		if (this.color != _value) {
			this.color = _value;
			this.scalePaint = 10;
		}
	}
}



	