function ScoreGestion(group) {
	this.group = group;
	this.sizeFont = 20;
	this.size = Application.LoadedScene.grid.length / Application.nbPlayers;
	this.posX = Application.LoadedScene.grid.length * 0.5 + canvas.width * 0.5;
	this.Positions = [];
	this.PodiumPos = [{x : 0, y : 0}, {x : -1, y : 0.5}, {x : 1, y : 1}];

	this.Awake = function() {
		for (var i = 0; i < Application.nbPlayers; i++) {
			this.Positions.push(i * this.size + this.size / 2);
		}
	}

	this.Show = function() {
		var element;
		var scale;
		for (var i = 0; i < Application.nbPlayers; i++) 
		{
			element = group.GameObjects[i];
			this.Positions[i] = Tween.newLinear( this.Positions[i],	(element.rank - 1) * this.size + this.size * 0.5,Time.deltaTime * 500, 5);
			//DISPLAY SKIN
			scale = Math.min(this.size / element.Transform.Size.x, this.size/element.Transform.Size.y, 1);
			ctx.drawImage(element.Renderer.Material.Source,
				this.posX + element.Transform.Size.x * scale * 0.5 ,
				this.Positions[i] - element.Transform.Size.y * scale * 0.5,
				element.Transform.Size.x * scale, element.Transform.Size.y * scale);
			//DISPLAY SCORE
			if (scale <= 0.4) 
			{
				ctx.font = this.sizeFont * 0.7 + 'px Verdana';
			}
			else 
			{
				ctx.font = this.sizeFont + 'px Verdana';
			}
			ctx.fillStyle = "Black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(element.score, 
				this.posX + element.Transform.Size.x * scale * 1.5 + 50,
				this.Positions[i]);

		}
	}

	this.ShowHighScore = function() {
		var element;
		var Podium = group.GameObjects.sort((x,y) => y.rank - x.rank).slice(0,3);
		for (var i = 0; i < Podium.length; i++) 
		{
			element = Podium[i];
			posX = canvas.width / 2 + this.PodiumPos[i].x * 100 - element.Transform.Size.x * 0.5;
			posY = 100 + this.PodiumPos[i].y * 100;
			ctx.drawImage(element.Renderer.Material.Source,
				posX, posY,
				element.Transform.Size.x,element.Transform.Size.y);
			ctx.fillStyle = "Black";
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom";
			ctx.fillText(element.score + i, posX + element.Transform.Size.x - 10, posY + element.Transform.Size.y * 0.5);
		}
	}
	this.Awake();

}