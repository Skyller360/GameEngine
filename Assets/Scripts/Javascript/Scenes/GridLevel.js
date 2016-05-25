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
            
            var chest = new Collectible();
            this.collectiblesGroup = new Group('collectibles', posGroup);
            this.collectiblesGroup.AddGameObject(chest);
            console.log(this.collectiblesGroup);
			// operation start
            this.player = new Player();
            this.player.SetPosition(this.grid.caseLength / 2, this.grid.caseLength / 2);
            
            //this.gridGroup.AddGameObject(chest);
            this.gridGroup.AddGameObject(this.player);
            
            
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
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}