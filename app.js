    // app.js  
  var express = require("express");
  var app = express();
  var bodyParser = require("body-parser");
  var methodOverride = require("method-override");
  var basicOracle = require("./basicOracleDB");

  app.use(bodyParser.urlencoded({ extended:false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  var router = express.Router();
  
  router.get('/empleado',function(request, response){
    sql = "Select * from s_emp";
    basicOracle.open(sql,[],false,response);
    response.end;

  });

  router.get('/empleado/:id',function(request, response){
    sql = "Select * from s_emp where id=:idEmpleado";
    idEmpleado = request.params.id;
    basicOracle.open(sql,[idEmpleado],false,response);
    response.end;

  });

   router.get('/tabla',function(request, response){
    var table = request.query.table;
    switch(table){
        case 'region':
          sql = "Select * from s_region";
          basicOracle.open(sql,[],false,response)
          break;
        case 'producto':
          sql = "Select * from s_product";
          basicOracle.open(sql,[],false,response)
          break;
        case 'cliente':
          basicOracle.open(sql,[],false,response)
          sql = "Select * from s_customer";
          break;
        default:
          response.contentType('application/json').status(200);
          response.send(JSON.stringify("Opcion no valida."));
          break;
    }
    
    ;
    response.end;

  });


  router.get('*', function(request, response){
    response.sendStatus(404);
    response.end;
  });



  app.use(router);

    app.listen(3030, function() {
    console.log("Servidor Web Concesionario UD - http://localhost:3030");
  });

  //cabeceras
  //response.header('Access-Control-Allow-Origin', '*'); 
  //response.header('Access-Control-Allow-Methods', 'GET, POST');
  //response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
   