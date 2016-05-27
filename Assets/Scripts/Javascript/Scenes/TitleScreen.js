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
function TitleScreen() 
{
	this.name = "TitleScreen";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.connectedPlayers = Application.nbPlayers;
	this.host = true;

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
		if (!Application.GamePaused)
		{
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
		document.getElementById("canvas").style.cursor = "initial";
		if (!Application.GamePaused) 
		{
			//Show UI
			var txtTitle = "Techno Bash";
			var txtConnected = "Connected x ";
			var txtPLay = "Play";
			var txtWainting = "Wainting players ...";

			/* Game Title  */
			ctx.font = '60px Arial Black';
			ctx.fillStyle = 'black';

			var cW = canvas.width;
			var cH = canvas.height;
			ctx.fillText(txtTitle, cW/2, cH/4)

			/* Connected players   */
			ctx.font = '15px Verdana';
			ctx.fillText(txtConnected + Application.tempNbPlayers, cW/2 , cH/2 );


			if(Application.host){
				/* Play button for host */
				var box = new Box();
					box.x = (cW/2)-100;
					box.y = cH/2+50;
					box.w = 200;
					box.h = 50;
					ctx.font = '20px Verdana';
					ctx.fillStyle = 'lightgreen';
				if (Physics.CheckCollision(Input.MousePosition, box)) {
					ctx.fillStyle = "#4CB064";
					document.getElementById("canvas").style.cursor = "pointer";
					if (Input.mouseLongClick) {
						Application.LoadedScene = Scenes['GridLevel'];
						socket.emit('gameStarted', 'GridLevel');
					}
				}
				ctx.fillRect(box.x, box.y, box.w, box.h);
				ctx.fillStyle = "black";
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(txtPLay , box.x+100, box.y+25);
			}else
			{
				/* Waiting message for other */
				ctx.fillText(txtWainting , cW/2+10, cH/2+50);
				
				socket.on('startGame', function(data)
				{
					Application.LoadedScene = Scenes[data];
				});
				
			}
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}