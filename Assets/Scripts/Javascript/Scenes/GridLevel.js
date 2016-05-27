/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function GridLevel() 
{
	this.name = "GridLevel";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
	this.Timer = null;

	this.WorldSize = new Vector(4096,4096);

	this.PositionScore = [];

	this.GameTimer = 500;
	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
            Time.SetTimeWhenSceneBegin();
            //TIMER

           	// this.Timer = new Timer(TIME_GAME, false, null, function () {
            // 	Application.GamePaused = true;
            // });

			
            this.grid = new Grid((canvas.width - canvas.height) * 0.5, 0, canvas.height, Application.nbPlayers * NB_CASES_BY_PLAYER);
            var posGroup = new Vector(this.grid.x, this.grid.y);   
            this.gridGroup = new Group('gridGroup', posGroup);

            this.gridGroup.collideWorldBound = true;
            
            
            this.collectiblesGroup = new Group('collectibles', posGroup);
			var self = this;
			new Timer(TIME_REPOP_CHEST, true, null, function (){
				if(self.collectiblesGroup.GameObjects.find(x => x.name = "Chest") == undefined){
					if (Application.LoadedScene == Scenes["GridLevel"]) {
						var chest = new Collectible();
						chest.name = "Chest";
						self.collectiblesGroup.AddGameObject(chest);
					}
				}
			})
			// operation start
            var player = new Player();
			player.name = "moi";
            player.SetPosition(Application.firstPosition.x, Application.firstPosition.y);
			this.gridGroup.AddGameObject(player);
			player.rank = Application.nbPlayers;
			
			// for (var index = 0; index < Application.nbPlayers - 1; index++) {
	        //     player = new Player();
			// 	player.name = "Player " + index;
			// 	player.rank = index + 1;
			// 	//player.score = Math.Random.RangeInt(0,100, true);
			// 	this.gridGroup.AddGameObject(player);
			// }
			
			console.log(Application.tempNbPlayers);
			
			for (var index = 0; index < Application.tempNbPlayers - 1; index++) {
				var thisId = Application.otherIds[index];
				var rndColor = Math.Random.ColorRGBA(.4);
				player = new Player();
				player.name = 'Player' + index;
				player.color = rndColor;
				console.log(Application.otherPosition[thisId]);
				player.SetPosition(Application.otherPosition[thisId].x, Application.otherPosition[thisId].y)
				player.rank = index + 1;
				player.Renderer.Material.Source = Images['alien'];
				this.gridGroup.AddGameObject(player);
			}
            
            scoreGestion = new ScoreGestion(this.gridGroup);

            this.Groups.push(this.gridGroup, this.collectiblesGroup);
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{
		
        if(Input.KeysDown[9])
        {
            location.reload();
        }
        
		if (!Application.GamePaused) 
		{
            this.grid.Draw();
            
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
			
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		// AFFICHAGE TIMER
		//ctx.fillStyle = 'black';
		//ctx.fillRect( ((canvas.width - canvas.height) * 0.5) - 200 , 0 , 200 , 75 );
		document.getElementById("canvas").style.cursor = "initial";
		var fontSize = 40;
		ctx.font = 'Bold '+fontSize+'px Verdana';
		ctx.fillStyle = 'black';

		// ctx.textAlign = 'center';
		// var theTimer = this.Timer.duration - this.Timer.currentTime;

		// var timerPosX = ( (canvas.width - canvas.height) * 0.5 - 10);
		// var timerPosX = (canvas.width  - Application.LoadedScene.grid.length) / 4;
		// var timerPosY = fontSize/2;
		// ctx.fillText((theTimer).toFixed(2), timerPosX, timerPosY);


		if (!Application.GamePaused) 
		{
			//Show UI

			//scoreGestion.Show();

			var size = sizeX = sizeY = Application.LoadedScene.grid.length / this.gridGroup.GameObjects.length;

			var posX = Application.LoadedScene.grid.length / 2 + canvas.width /2;

			if(this.PositionScore.length == 0){
				for (var index = 0; index < this.gridGroup.GameObjects.length; index++) {
					var element = this.gridGroup.GameObjects[index];
					this.PositionScore.push((element.rank - 1) * size + size / 2);
				}
			}
			
			// for (var index = 0; index < Application.tempNbPlayers; index++) {
			// 	var element = this.gridGroup.GameObjects[index];
			// 	this.PositionScore[index] = Tween.newLinear(this.PositionScore[index], (element.rank - 1) * size + size / 2, Time.deltaTime * 500, 5 );
			// 	var scale = Math.min(size / element.Transform.Size.x, size/element.Transform.Size.y, 1);
			// 	ctx.drawImage(element.Renderer.Material.Source, posX + element.Transform.Size.x * scale / 2, this.PositionScore[index] - element.Transform.Size.y * scale / 2, 
			// 	 					element.Transform.Size.x * scale, element.Transform.Size.y * scale);

									 
			// }
			// for (var index = 0; index < Application.nbPlayers; index++) 
			// {
			// 	var element = this.gridGroup.GameObjects[index];
			// 	this.PositionScore[index] = Tween.newLinear(this.PositionScore[index], (element.rank - 1) * size + size / 2, Time.deltaTime * 500, 5 );
			// 	var scale = Math.min(size / element.Transform.Size.x, size / element.Transform.Size.y, 1);
			// 	ctx.drawImage(	element.Renderer.Material.Source,
			// 					posX + element.Transform.Size.x * scale / 2,
			// 					this.PositionScore[index] - element.Transform.Size.y * scale / 2, 
			// 					element.Transform.Size.x * scale,
			// 					element.Transform.Size.y * scale

			// 	 );

			// 	var sizeFont = 40;
			// 	if(scale <= 0.4)
			// 	{
			// 		sizeFont *= 0.7;
			// 	}
			// 	ctx.font = sizeFont+'px Comic Sans MS';
			// 	ctx.fillStyle = '#E0A33A';
			// 	ctx.textAlign="center";
			// 	ctx.textBaseline="middle"; 
			// 	ctx.fillText(
			// 		element.score,
			// 		posX + element.Transform.Size.x * scale * 1.3,
			// 		this.PositionScore[index]-10
			// 	);
			// 	ctx.lineWidth = 1;
			// 	ctx.strokeStyle = "#F8C557";
			// 	ctx.strokeText(element.score,posX + element.Transform.Size.x * scale * 1.3,
			// 		this.PositionScore[index]-10);
			// }
		 
		}
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}