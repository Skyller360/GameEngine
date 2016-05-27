/**
 * Create a new GameObject <br />
 * @namespace GameObjects/GameObjects
 *
 * @tutorial
 * <ul><li>Copy the content of GameObjects file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/GameObjects/NameOfYourGameObject.js .</li>
 * <li>In the index.html add below this comment <!-- GameObjects --> the line:<br/>
 * <script type="text/javascript" src="Assets/Scripts/Javascript/GameObjects/NameOfYourGameObject.js"></script></li>
 * <li>For create a new scene, use this instruction: "new GameObject()".</li>
 * </ul>
 * 
 * 
 * @property {String} name - The name of the object.
 * @property {Boolean} enabled - The active state of the GameObject.
 * @property {Boolean} renderer - The active state of Renderer component
 * @property {Boolean} fixedToCamera -  The active state of Camera if is Fixed
 * @property {Vector} MouseOffset  - Position of mouse
 * @property {Group} Parent - A Group which contain several GameObject
 * @property {Object} Transform  
 * @property {Vector} Transform.RelativePosition - the relative position of GameObject inside a Group 
 * @property {Vector} Transform.Size - size of GameObject
 * @property {Vector} Transform.Scale - scale of GameObject 
 * @property {Vector} Transform.Pivot - pivot position of GameObject
 * @property {Number} Transform.angle - angle of GameObject
 *
 *
 * */
function Player() 
{
	this.name = "Player";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.fixedToCamera = true;
    this.color = 'rgba(255,0,0,.4)';
    this.score = 0;
    this.rank = Application.LoadedScene.gridGroup.GameObjects.length;
    this.previousRank = this.rank;
	this.me = false;
    
    this.moving = false;
    
	this.MouseOffset = new Vector();

	this.Parent = null;
	
	this.Transform = {};
	this.Transform.RelativePosition = new Vector(0, 0);
	this.Transform.Position = new Vector();
	this.Transform.Size = new Vector(131, 188);
	this.Transform.RelativeScale = new Vector();
    this.Transform.RelativeScale.x = Application.LoadedScene.grid.caseLength / this.Transform.Size.x;
    this.Transform.RelativeScale.y = Application.LoadedScene.grid.caseLength / this.Transform.Size.y;  
	this.Transform.Scale = new Vector(1,1);
	this.Transform.Pivot = new Vector(0.5, 0.5);
	this.Transform.angle = 0;   

	this.speed = 250; 

    this.SetScore = function(_value) {
        if (this.score != _value) {
            this.score = _value;
            var newRank = Application.LoadedScene.gridGroup.GameObjects.sort((x, y) => y.score - x.score).indexOf(this) + 1;
            this.SetRank(newRank);
        }
    }
    this.SetRank = function(_value) {
        if (this.rank != _value) {
            this.previousRank = this.rank;
            var rankedPlayer = Application.LoadedScene.gridGroup.GameObjects.find(x => x.rank == _value);
            this.rank = _value;
            if (rankedPlayer != undefined && rankedPlayer != this) {
                rankedPlayer.SetRank(_value + 1);
            }
        }
    }
	/**
	 * @function SetPosition
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y position(Transform) of game object
	 * */
	this.SetPosition = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPosition Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPosition Go");
		this.Transform.RelativePosition.x = _x;
		this.Transform.RelativePosition.y = _y;
	};

	/**
	 * @function SetPositionCollider
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y position(Physics collider) of game object
	 * */
	this.SetPositionCollider = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPositionCollider Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPositionCollider Go");
		this.Physics.Collider.Position.x = _x;
		this.Physics.Collider.Position.y = _y;
	};

	/**
	 * @function SetSize
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the size of game object
	 * */
	this.SetSize = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetSize Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetSize Go");
		this.Transform.Size.x = _x;
		this.Transform.Size.y = _y;
	};

	/**
	 * @function SetColliderSize
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the collider size of game object
	 * */
	this.SetColliderSize = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetColliderSize Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetColliderSize Go");
		this.Physics.Collider.Size.x = _x;
		this.Physics.Collider.Size.y = _y;
	};

	/**
	 * @function SetScale
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the scale of game object
	 * */
	this.SetScale = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetScale Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetScale Go");
		this.Transform.RelativeScale.x = _x;
		this.Transform.RelativeScale.y = _y;
	};

	/**
	 * @function SetPivot
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the pivot of game object
	 * */
	this.SetPivot = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPivot Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPivot Go");
		this.Transform.Pivot.x = _x;
		this.Transform.Pivot.y = _y;
	};

	/**
	 * The Physics component of the GameObject. <br />
	 * @memberof GameObjects/GameObjects
	 *
	 * @property {Object} Physics  
	 * @property {Boolean} Physics.enabled - The active state of the GameObject.
	 * @property {Boolean} Physics.clickable - is clickable
	 * @property {Boolean} Physics.dragAndDroppable - is draggable
	 * @property {Boolean} Physics.colliderIsSameSizeAsTransform - is has the same size of Tranform size
	 * @property {Number} Physics.countHovered - counter
	 *
	 *
	 * */
	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.colliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;

	this.Physics.Collider = 
	{
		Position: new Vector(),
		Size: new Vector()
	};

	this.Renderer = 
	{
		isVisible: true,
		isSpriteSheet: false,
		That: this.Transform,
		Material: 
		{
			Source: Images['alien'],
			SizeFrame: new Vector(),
			CurrentFrame: new Vector(),
		},
		animationCount:0,
		Animation:
		{
			animated: true,
			Animations: [],
			Current:[],
			countdown:0,
			currentIndex: 0,
			totalAnimationLength: 0.5
		},
		/**
		 * 
		 * @function Draw
		 * @memberof GameObjects/GameObjects
		 *
		 * @description
		 * Draw the game object component
		 *  
		 * */
		Draw: function() 
		{
			var ScaledSizeX = this.That.Size.x*this.That.Scale.x;
			var ScaledSizeY = this.That.Size.y*this.That.Scale.y;

			ctx.save();
			ctx.translate((this.That.Position.x), (this.That.Position.y));
			ctx.rotate(Math.DegreeToRadian(this.That.angle));
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated)
				{	
					if (this.animationCount > this.Animation.totalAnimationLength / this.Animation.Current.length) 
					{
						this.Animation.currentIndex ++ ;
						this.animationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.Current.length-1) 
						{
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.animationCount += Time.deltaTime;
					
				}
				else 
				{
					this.animationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.Current[this.Animation.currentIndex];

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			}
			ctx.restore();
		}
					

	};

	/**
	 * @function SetSpriteSheet
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {String} _img - the source image of sprite sheet
	 * @param {Vector} _sizeFrame - the size frame of the sprite
	 * @param {Number} _animationLength - how many frame has the sprite sheet
	 *
	 * @description
	 *
	 * Set the sprite sheet source image, the size of one frame and the number of frame the sprite sheet has.
	 * */
	this.SetSpriteSheet = function(_img, _sizeFrame, _animationLength) 
	{
	    if(typeof _img != 'string') PrintErr("Parameter img in SetSpriteSheet");
		if(!(_sizeFrame instanceof(Vector))) PrintErr("Parameter sizeFrame in SetSpriteSheet");
	    if(typeof _animationLength != 'number') PrintErr("Parameter animationLength in SetSpriteSheet");
		this.Renderer.isSpriteSheet = true;
		this.Animation.totalAnimationLength = _animationLength || 0.5;
		this.Renderer.Material.SizeFrame = _sizeFrame;
 		this.Renderer.Material.Source = _img;
 		this.Renderer.Material.CurrentFrame = new Vector(0,0);
 		for (var i = 0; i < _img.height; i += this.Renderer.Material.SizeFrame.y) 
 		{
 			var array = [];
 			for (var j = 0; j < _img.width; j += this.Renderer.Material.SizeFrame.x) 
 			{
 				array.push(new Vector(j, i));
 			}
 			this.Renderer.Animation.Animations.push(array);
 		}
 		this.Renderer.Animation.Current = this.Renderer.Animation.Animations[0];
	}

	/**
	 * @function Awake
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Called at the instruction new GameObject()
	 * */
	this.Awake = function() 
	{
		Print('System:GameObject ' + this.name + " Created !");
	};

	/**
	 * @function Start
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Start the GameObject and show a message in console or launch Update() if already started <br/>
	 * Set the transform component to the physics collider
	 * */
	this.Start = function() 
	{
		if (!this.started) {
			// operation start
            this.goal = new Vector(this.Transform.RelativePosition.x, this.Transform.RelativePosition.y);
			this.Transform.RelativePosition = Application.firstPosition;
            
			if (this.Physics.colliderIsSameSizeAsTransform) 
			{
				this.Physics.Collider = this.Transform;
			}

			this.started = true;
			Print('System:GameObject ' + this.name + " Started !");
		}
		this.PreUpdate();
	};

	/**
	 * @function PreUpdate
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * If GameObject in group (parent), take relative position from parent position <br/>
	 * If not, set GameObject own position <br/>
	 *
	 * Start the camera if exist and set position if fixed
	 *
	 * */
	this.PreUpdate = function() 
	{
		if (this.enabled) 
		{
			if (this.Parent != null) 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x + this.Parent.Transform.Position.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y + this.Parent.Transform.Position.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x * this.Parent.Transform.Scale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y * this.Parent.Transform.Scale.y;
			} 
			else 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y;
			}
			if (Application.LoadedScene.CurrentCamera != null) 
			{
				Application.LoadedScene.CurrentCamera.Start();
				if (!this.fixedToCamera) 
				{
					this.Transform.Position.x -= Application.LoadedScene.CurrentCamera.Transform.Position.x;
					this.Transform.Position.y -= Application.LoadedScene.CurrentCamera.Transform.Position.y;
				}
			}
			
			this.Update();
		}
			
	};
	/**
	 * @function Update
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Call postUpdate function (each frame)
	 * */
     var scalejump = 0;
	this.Update = function() 
	{
        var index = IndexFromCoord((this.Transform.RelativePosition.x / Application.LoadedScene.grid.caseLength) | 0, (this.Transform.RelativePosition.y / Application.LoadedScene.grid.caseLength) | 0, Application.nbPlayers * NB_CASES_BY_PLAYER);
        Application.LoadedScene.grid.Cells[index].SetColor(this.color);
        
        if(!this.moving)
        {
            // Left
            if (Input.KeysDown[37]) {
                this.goal.x = Math.max(Application.LoadedScene.grid.caseLength /2 ,this.Transform.RelativePosition.x - Application.LoadedScene.grid.caseLength);
                this.moving = true;
            }
            // Top
            else if (Input.KeysDown[38]) {
                this.goal.y = Math.max(Application.LoadedScene.grid.caseLength /2 ,this.Transform.RelativePosition.y - Application.LoadedScene.grid.caseLength);
                this.moving = true;
            }
            // Right
            else if (Input.KeysDown[39]) {
                this.goal.x = Math.min(this.Transform.RelativePosition.x + Application.LoadedScene.grid.caseLength, this.Parent.Transform.Bound.x - Application.LoadedScene.grid.caseLength /2);
                this.moving = true;
            }
            // Both
            else if (Input.KeysDown[40]) {
                this.goal.y = Math.min(this.Transform.RelativePosition.y + Application.LoadedScene.grid.caseLength, this.Parent.Transform.Bound.y - Application.LoadedScene.grid.caseLength /2);
                this.moving = true;
            }
        }
        else
        {
			console.log(Application.id);
            scalejump += 0.2;
			
			socket.on('updatePosServ', function(data)
			{
				console.log(socket.id);
				_self.Transform.RelativePosition = data.position;
				_self.Transform.Scale = data.scale;
			});
			
            this.Transform.RelativePosition.y = Tween.newLinear(this.Transform.RelativePosition.y, this.goal.y, Time.deltaTime * this.speed, 4);
            this.Transform.RelativePosition.x = Tween.newLinear(this.Transform.RelativePosition.x, this.goal.x, Time.deltaTime * this.speed, 4);
			this.Transform.Scale.x *= (1 + Math.sin(scalejump) * 0.5);
            this.Transform.Scale.y *= (1 + Math.sin(scalejump) * 0.5);  
			
            if((this.Transform.RelativePosition.x | 0) == (this.goal.x | 0) && (this.Transform.RelativePosition.y | 0) == (this.goal.y | 0))
            {
                this.moving = false;
                scalejump = 0;
            }    
			
			var data = { 'position' : this.Transform.RelativePosition, 'scale' : this.Transform.Scale, 'id' : socket.id};
			socket.emit('updatePos', data);
			
			
        }
        
        if(this.Parent.collideWorldBound)
        {
            this.Transform.RelativePosition.x = Math.Clamp(this.Transform.RelativePosition.x, (this.Transform.Size.x * this.Transform.Scale.x) / 2, this.Parent.Transform.Bound.x - (this.Transform.Size.x * this.Transform.Scale.x) / 2);
            this.Transform.RelativePosition.y = Math.Clamp(this.Transform.RelativePosition.y, (this.Transform.Size.y * this.Transform.Scale.y) / 2, this.Parent.Transform.Bound.y - (this.Transform.Size.y * this.Transform.Scale.y) / 2);            
        }
        
        this.CheckCollectibles(index);
		
		var _self = this;
		
		
		
        this.Renderer.Draw();
		this.PostUpdate();	
	};
	/**
	 * @function PostUpdate
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Execute PostUpdate. If DebugMode is active, diplay GameObject in debug mode
	 *
	 * */
	this.PostUpdate = function() 
	{
		if (Application.debugMode) {
			Debug.DebugObject(this);
		}
		this.GUI();	
	};


	this.CheckCollectibles = function(index) {
		for(var i = 0; i < Application.LoadedScene.collectiblesGroup.GameObjects.length; i++)
        {
            var element = Application.LoadedScene.collectiblesGroup.GameObjects[i];
            if(index == element.index)
            {
                Application.LoadedScene.collectiblesGroup.GameObjects.splice(i, 1);
                i--;
                var playerCells = Application.LoadedScene.grid.Cells.filter(x => x.color == this.color);
                this.SetScore(this.score + playerCells.length - 1);
                playerCells.forEach(x => x.color = "white");
            }
        }
	}

	/**
	 * @function GUI
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Display the GUI of GameObject
	 * */
	this.GUI = function() 
	{
		
	}

	/**
	 * @function onHover
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Counter on hover the GameObject
	 * */
	this.onHover = function() 
	{
		this.Physics.countHovered ++;	
	}

	/**
	 * @function onClicked
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Set the MouseOffset with mouse position <br/>
	 * Increment the countHovered
	 * */
	this.onClicked = function() 
	{
		this.MouseOffset.x = Input.MousePosition.x - this.Transform.Position.x;
		this.MouseOffset.y = Input.MousePosition.y - this.Transform.Position.y;
		this.Physics.countHovered ++;
	}
	/**
	 * @function onUnHovered
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Reinitialize the countHovered to 0
	 * */
	this.onUnHovered = function() 
	{
		this.Physics.countHovered = 0;
	}

	this.Awake();
}