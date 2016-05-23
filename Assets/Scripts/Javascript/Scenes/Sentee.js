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
            // Create a player
            this.player = new Rectangle();
            this.player.SetPosition(canvas.width / 2, canvas.height / 2);
            this.player.SetSize(101, 171);
            this.player.SetImageSource(Images['Boy']);
            this.GameObjects.push(this.player);
            
            for (var index = 0; index < 3; index++) {
                var enemy = new Enemies(this.player);
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
		
        if (Input.KeysDown[9]) 
		{
            location.reload();
        }

		if (!Application.GamePaused) 
		{
			if(this.count % 350 == 0)
			{
				var enemy = new Enemies(this.player);
                this.enemies.push(enemy);
			}
			this.count++;
            ctx.fillStyle = "rgb(70,70,70)";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			if(Input.KeysDown[32])
			{
				for(var i = 0; i < this.GameObjects.length; i++)
				{
					if(this.GameObjects[i] instanceof Enemies)
					{
						this.GameObjects[i].WalkToHero();
					}
				}
			}
			for(var i = 0; i < this.enemies.length; i++)
			{
				var RadPlayer = Math.DegreeToRadian(this.GameObjects[0].Transform.angle - 90);
				var RadEnemy = Math.DegreeToRadian(this.enemies[i].Transform.angle);
				
				var nVectorPlayer = new Vector(1,1).FromAngle(RadPlayer).Normalize();
				var nVectorEnemy = new Vector(1,1).FromAngle(RadEnemy).Normalize();
				
				var result = Math.DotProduct(nVectorEnemy, nVectorPlayer);

				if(result >= 0.98)
				{
					this.enemies.splice(i, 1);
					i--;
				}		
				
			}
			
			
			
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var index = 0; index < this.enemies.length; index++) {
				this.enemies[index].Start();
				if(Physics.CheckCollision(this.player.Physics.Collider, this.enemies[index].Physics.Collider))
				{
					console.log('touché');
				}
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