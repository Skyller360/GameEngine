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
function GameOver() 
{
	this.name = "GameOver";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
    this.enemies = [];
	this.count = 0;

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
		
        if (Input.KeysDown[9]) 
		{
            location.reload();
        }

		if (!Application.GamePaused) 
		{

            ctx.fillStyle = '#BEBCA7';
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			ctx.fillStyle = '#3E3E37';
            ctx.fillRect(canvas.width / 2 - 400, canvas.height / 2 - 250, 800, 500);
            
            ctx.font="100px Georgia";
            var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
            gradient.addColorStop("0","#2F304B");
            gradient.addColorStop("0.5","#82A44F");
            gradient.addColorStop("1.0","#585F71");
            ctx.fillStyle = gradient;
            ctx.fillText("Game Over", 600, 500);
            ctx.fillText("Press 'R' to reset", 480, 650);
            ctx.font="15px Georgia";
            
            if(Input.KeysDown[82])
            {
                Scenes.Sentee.GameObjects = [];
                Scenes.Sentee.enemies = [];
                Scenes.Sentee.started = false;
                Scenes.Sentee.Start();
                Application.LoadedScene = Scenes['Sentee'];
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