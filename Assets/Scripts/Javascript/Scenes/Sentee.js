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
function Sentee() 
{
	this.name = "Sentee";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
    this.enemies = [];

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
            // Create a player
            var player = new Rectangle();
            player.SetPosition(canvas.width / 2, canvas.height / 2);
            player.SetSize(101, 171);
            player.SetImageSource(Images['Boy']);
            this.GameObjects.push(player);
            
            for (var index = 0; index < 8; index++) {
                var enemy = new Enemies(player);
                this.GameObjects.push(enemy);
                this.enemies.push(enemy);
            }
            
            
            
           
			Time.SetTimeWhenSceneBegin();
			// operation start
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
        if (Input.KeysDown[9]) {
            location.reload();
        }
        
		if (!Application.GamePaused) 
		{
            ctx.fillStyle = "rgb(70,70,70)";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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