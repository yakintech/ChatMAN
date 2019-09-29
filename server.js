var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
  app.get('/chat', function (req, res) {
    res.sendfile(__dirname + '/chat.html');
  });

  server.listen(3001, function(){
    console.log('listening on *:3001');
  });



  io.on('connection', function(socket){
    var mesajlar = [];

    var sid = socket.id;
      socket.on('servermsg', function(data){
        var mesaj = new Object();
        mesaj.id = sid;
        mesajlar.push(mesaj);

        var count = mesajlar.length - 1;
        var mesajdurum = false;
        if(count > 3)
        {
          mesajdurum = mesajlar[count].id == sid && mesajlar[count - 1].id == sid;
        }
       
        if(data.content.length < 50 && !mesajdurum){
          io.emit('clientmsg',data);
        }
        else{
          io.to(sid).emit("banfunc")
          console.log("BAN! " + sid);
        }
      
      });
   });