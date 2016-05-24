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
	this.audio = false;

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
		console.log(AudioPath[0]);
		// var audio = AudioPath[0];
		 for (var index = 0; index < AudioPath.length; index++) 
		{
			var element = AudioPath[index];
			var name = element.name;
			var path = 'Assets/Audio/'+element.path;
			
			Audios[name] = document.createElement('audio');
			Audios[name].setAttribute('src', path);
			
			Audios[name].addEventListener('canplaythrough', function (e) 
			{
				audioLoaded++;
			});
		}
		if (!this.started) 
		{			
				this.socket = io.connect('10.10.7.58:3000');
				// Create a player
				this.player = new Rectangle();
				this.player.SetPosition(canvas.width / 2, canvas.height / 2);
				this.player.SetSize(40, 40);
				this.player.SetImageSource(Images['Bobby']);
				this.GameObjects.push(this.player);
				
				var enemy = new Enemies(this.player);
				this.enemies.push(enemy);
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
		
		this.socket.on('mobileData', function(data)
		{
			Input.alpha = -data.newAlpha;
			Input.mobile = true;
		});
		
		// if(!Input.mobile)
		// {
		// 	Application.GamePaused = true;
		// }
		// else
		// {
		// 	Application.GamePaused = false;
		// }

		if (!Application.GamePaused) 
		{
			if(!this.audio)
			{
				Audios['BackgroundSound'].play();
				this.audio = true;
			}
			
			if(this.count % 150 == 0)
			{
				var enemy = new Enemies(this.player);
                this.enemies.push(enemy);
			}
			this.count++;
			
			
			
			for (var index = 0; index < window.innerWidth; index += 54) {
				for(var j = 0; j < window.innerHeight; j += 54)
				{
					ctx.drawImage(Images['Ground'], index, j, 54, 54);	
				}	
			}		
			
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
					Audios['Hit'].play();
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
					this.enemies.splice(index, 1);
					this.player.life -= 1;
					if(this.player.life <= 0)
					{
						Application.LoadedScene = Scenes["GameOver"];
					}
					index--;
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
			ctx.fillStyle = '#BEBCA7';
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			ctx.fillStyle = '#3E3E37';
            ctx.fillRect(canvas.width / 2 - 400, canvas.height / 2 - 250, 910, 500);
            
            ctx.font="100px Georgia";
            var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
            gradient.addColorStop("0","#2F304B");
            gradient.addColorStop("0.5","#82A44F");
            gradient.addColorStop("1.0","#585F71");
            ctx.fillStyle = gradient;
            ctx.fillText("Connect your device", 450, 500);
            ctx.font="15px Georgia";
		}
	}

	this.Awake()
}