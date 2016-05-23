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
function AudioScene() 
{
	this.name = "AudioScene";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
    this.enemies = [];

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
                    
                    if(audioLoaded == AudioPath.length)
                    {
                        for (var index = 0; index < AudioPath.length; index++) 
                        {
                            var element = AudioPath[index];
                            
                            if(element.name != 'Acoustic')
                            {
                                Audios[element.name].volume = 0;
                            }
                            
                            Audios[element.name].play();    

                            if(element.name != 'Bend' && element.name != 'Acoustic')
                            {
                                Application.LoadedScene.GameObjects.push(new Sound(Audios[element.name]));    
                            }
                        }
                    }
                });
                
                if(name != 'Bend')
                {
                    Audios[name].addEventListener('ended', function(e)
                    {
                        for (var index = 0; index < AudioPath.length; index++) {
                            var element = AudioPath[index];
                            if(element.name != 'Bend')
                            {
                                Audios[element.name].currentTime = 0;
                                Audios[element.name].play();
                            };  
                        };
                    }, false);
                };
            }
			Time.SetTimeWhenSceneBegin();
            var player = new Player('Player');
            player.SetPosition(40,40);
            player.SetSize(30,30);
            
            this.GameObjects.push(player);
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
                var element = this.GameObjects[i]; 
				element.Start();
                element.SetBox();
                if(element.name != "Player")
                {
                    if(Physics.CheckCollision(this.GameObjects[0].box, element.box))
                    {
                        Audios['Bend'].currentTime = 0;
                        Audios['Bend'].volume = .5;
                        Audios['Bend'].play();
                        element.audio.volume = 1;
                        element.audio.play();
                        this.GameObjects.splice(i, 1);
                        i--;
                    }  
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