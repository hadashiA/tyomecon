
/**
 * Module dependencies.
 */

var express = require('express')
  , http    = require('http')
  , path    = require('path');


var app = express()
  , server = http.createServer(app)
  , io  = require('socket.io').listen(server);

io.set('log level', 1);

io.sockets.on('connection', function(socket) {
  socket.on('accelerate', function(accel) {
    // socket.broadcast.volatile.json.emit('move', accel);
    socket.broadcast.json.emit('move', accel);
  });
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index');
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
