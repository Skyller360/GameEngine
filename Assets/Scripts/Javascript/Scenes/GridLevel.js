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

	this.WorldSize = new Vector(4096,4096);

	this.PositionScore = [];
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

			
			
            this.grid = new Grid((canvas.width - canvas.height) * 0.5, 0, canvas.height, Application.nbPlayers * 2);
            var posGroup = new Vector(this.grid.x, this.grid.y);   
            this.gridGroup = new Group('gridGroup', posGroup);

            this.gridGroup.collideWorldBound = true;
            
            
            this.collectiblesGroup = new Group('collectibles', posGroup);
			var self = this;
			new Timer(TIME_REPOP_CHEST, true, null, function (){
				if(self.collectiblesGroup.GameObjects.find(x => x.name = "Chest") == undefined){
					var chest = new Collectible();
					chest.name = "Chest";
					self.collectiblesGroup.AddGameObject(chest);	
				}
			})
			// operation start
            var player = new Player();
			player.name = "moi";
            player.SetPosition(this.grid.caseLength / 2, this.grid.caseLength / 2);
			this.gridGroup.AddGameObject(player);
			player.rank = Application.nbPlayers;
			
			for (var index = 0; index < Application.nbPlayers - 1; index++) {
	            player = new Player();
				player.name = "Player " + index;
				player.rank = index + 1;
				//player.score = Math.Random.RangeInt(0,100, true);
				this.gridGroup.AddGameObject(player);
			}
            
            //this.gridGroup.AddGameObject(chest);
            
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
		if (!Application.GamePaused) 
		{
			//Show UI
			var posX = Application.LoadedScene.grid.length / 2 + canvas.width /2 + 50;
			var sizeY = Application.LoadedScene.grid.length / this.gridGroup.GameObjects.length;
			if(this.PositionScore.length == 0){
				for (var index = 0; index < this.gridGroup.GameObjects.length; index++) {
					var element = this.gridGroup.GameObjects[index];
					this.PositionScore.push((element.rank - 1) * sizeY + sizeY / 2);
				}
			}
			for (var index = 0; index < Application.nbPlayers; index++) {
				var element = this.gridGroup.GameObjects[index];
				this.PositionScore[index] = Tween.newLinear(this.PositionScore[index], (element.rank - 1) * sizeY + sizeY / 2, Time.deltaTime * 500, 2 );
				//posY = (element.rank - 1)* sizeY + sizeY / 2;
				ctx.font = '20px Verdana';
				ctx.fillStyle = 'black';
				ctx.fillText('Score de '+element.name+' : '+element.score, posX, this.PositionScore[index]);
			}
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}