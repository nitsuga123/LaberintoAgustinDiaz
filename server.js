var http = require('http');
var fs = require('fs');
var url= require('url');
var maze = require ("@mitchallen/maze-generator-square");
var port = process.env.PORT||3000;

//var xSize = 10, ySize = 10;
var parametros  = fs.readFileSync('parametros.json');
var parjson = JSON.parse(parametros);


var server = http.createServer(function(request, response){
      var dataurl = url.parse(request.url,true).query;
      if(dataurl.alto&&dataurl.ancho){
        var mazeGenerator = maze.create({ x: dataurl.alto, y: dataurl.ancho });
        let spec = {
            open: [
                { border: "N", list: [0,2,dataurl.alto-1] }
            ]
        };

        response.write("Agustin Diaz" + "\n");
        mazeGenerator.generate(spec);
        var rows = [];
        var border="";
        mazeGenerator.printBoard(function(data1,data2){
          rows = data1;
          border=data2;
        });

        response.write(border + "\n");
        for (var i = 0; i < rows.length; i++) {
          response.write(rows[i] + "\n")
        }

      }else{
        response.write("no se ha ingresado la url de forma correcta" + "\n"+"agrege al final de la url /?alto=numero&&ancho=numero,"
                       + "\n"+ "siendo numero las dimensiones que desee para el laberinto" + "\n"+"ejemplo:  /?alto=50&&ancho=50");
      }


      response.end();
});
server.listen(port);
