/**
 * Get Canvas and the context<br/>
 *
 * - Create Scene Object which will contain the scene<br/>
 * - Create and set the gravity<br/>
 * - Application : An Object which will handle the scene to load, if game is paused or not and if debug mode is activate<br/>
 * - imagesLoaded : counter for loaded images<br/>
 * - WalkableTiles : an Array which will contain where integer where we can walk<br/>
 * - ImagesPath : Array of image object. Each image has a name and a path<br/>
 * - Images : an object which contain all loaded image
 * 
 * */


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var Scenes = {};
var Gravity = new Vector();
Gravity.y = -9.81;

// PATH FICHIER AUDIO

var Application = 
{
	LoadedScene: null,
	GamePaused: false,
	debugMode: true
};



var imagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = 
[
	// { name:"monImage",path: "background/image.png"},
	{ name:"Boy",path: "Examples/PlanetCute/CharacterBoy.png"},
	{ name:"Princess",path: "Examples/PlanetCute/CharacterPrincessGirl.png"},
	{ name:"Enemy Bug",path: "Examples/PlanetCute/EnemyBug.png"},
	{ name:"Heart",path: "Examples/PlanetCute/heart.png"},
	{ name:"Ground",path: "Examples/PlanetCute/BlockGreen.png"},
	{ name:"BlockGreen",path: "Examples/PlanetCute/blockGreen.png"},
	{ name:"Bobby",path: "Examples/PlanetCute/Bobby.png"},
];
var Images = {};

var audioLoaded = 0;

var AudioPath = 
[
	{ name:'BackgroundSound', path: 'All_of_Us.mp3'},
	{ name:'Hit', path: 'highDown.mp3'},
	
];
var Audios = {};