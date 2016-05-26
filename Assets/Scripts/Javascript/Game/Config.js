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
var socket = io.connect('10.10.7.53:3000');
var Scenes = {};
var Gravity = new Vector();
Gravity.y = -9.81;


var scoreGestion = null;
var NB_CASES_BY_PLAYER = 8;
var TIME_REPOP_CHEST = 1;
var TIME_GAME = 250;
var Application = 
{
	LoadedScene: null,
	gamePaused: false,
	debugMode: true,
	nbPlayers: 1,
	Host: false,
	tempNbPlayers : 0
};

var imagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = 
[
	// { name:"monImage",path: "background/image.png"},
	{ name:"Boy",path: "Examples/PlanetCute/CharacterBoy.png"},
	{ name:"Block",path: "block.png"},
	{ name:"Chest Closed",path: "Examples/PlanetCute/ChestClosed.png"},
	{ name:"alien",path: "Examples/alien.png"}
];
var Images = {};

var audioLoaded = 0;

var AudioPath = 
[
	{ name:'Acoustic', path: 'TechnoGame_Acoustic.mp3'},
	{ name:'Bass', path: 'TechnoGame_Bass.mp3'},
	{ name:'Chorus', path: 'TechnoGame_Chorus.mp3'},
	{ name:'HighNotes', path: 'TechnoGame_HighNotes.mp3'},
	{ name:'Bend', path: 'TechnoGame_Bend.mp3'}
	
];
var Audios = {};