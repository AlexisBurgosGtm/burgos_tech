var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const cors = require('cors');


var http = require('http').Server(app);
//var io = require('socket.io')(http);
var io = require('socket.io')(http, { cors: { origin: '*' } });


const PORT = process.env.PORT || 4040;

var execute = require('./mysqlConnection');

app.use(cors({
  origin: '*'
}));

//app.use(bodyParser.json());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));


app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
 
  next();

});

app.get("/",function(req,res){

  res.sendFile(path + 'index.html');

}); 

app.post("/insert_paciente",function(req,res){

  const {nombre,telefonos,fecha,fechanacimiento,direccion,coddepto,sucursal} = req.body; 
  
  let qry = `INSERT INTO CLIENTES
   (NOMCLIE,TELEFONOS,FECHANACIMIENTO,DIRCLIE,CODDEPTO,TOKEN)
    VALUES ('${nombre}','${telefonos}','${fechanacimiento}','${direccion}',${coddepto},'${sucursal}')`;
  execute.query(qry, res);

}); 




//Router para app VENTAS
//app.use('/ventas', routerVentas);

app.use("/",router);


app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});


// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('nueva orden', function(tecnico,msn){
	  io.emit('nueva orden', tecnico,msn);
  });

  socket.on('orden finalizada', function(id,msg){
    io.emit('orden finalizada', id,msg)
  })


  socket.on('nuevo usuario', function(msn){
	  io.emit('nuevo usuario', msn);
  });
    
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
