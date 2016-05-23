var port = 3000;
var express = require('express');
var app = express();
var server = require('http').Server(app)
var serverUrl = app.get(port);//"127.0.0.1";
var nbConnected = 0;

var http = require("http");
var path = require("path"); 
var fs = require("fs"); 		


console.log("Starting web server at " + serverUrl + ":" + port);

var server = http.createServer( function(req, res) 
{
	if(nbConnected == 0)
	{
		game(req, res);
	}
	else
	{
		fs.readFile('mobile.html', function(err, data)
		{
			res.end(data);
		});			
	}
}).listen(port, serverUrl);

var io = require('socket.io')(server);

function getFile(localPath, res, mimeType) 
{
	
	fs.readFile(localPath, function(err, contents) 
	{
		if(!err) 
		{
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} 
		else 
		{
			res.writeHead(500);
			res.end();
		}
	});
}

function game(req, res)
{
	var now = new Date();

	var filename = req.url || "index.html";
	var ext = path.extname(filename);
    
	var localPath = __dirname;
	var validExtensions = 
	{
		".html" : "text/html",		
		".js": "application/javascript", 
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png",
		".ico": "icon"
	};
	
	var isValidExt = validExtensions[ext];

	if (isValidExt) 
	{
		
		localPath += filename;
		
		fs.exists(localPath, function(exists) {
			if(exists) 
			{
				console.log("Serving file: " + localPath);
				getFile(localPath, res, isValidExt);			
			} 
			else 
			{
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});

	} 
	else 
	{
		console.log("Invalid file extension detected: " + ext);
	}

}

io.on('connection', function (socket) {
	nbConnected++;
	console.log(nbConnected);
	socket.on('mobile', function(data)
	{
		socket.broadcast.emit('alphaData', data);
	})
});

