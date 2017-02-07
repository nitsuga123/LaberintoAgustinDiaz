var http = require('http');
var fs = require('fs');
var maze = require ("@mitchallen/maze-generator-square");

//var xSize = 10, ySize = 10;
var parametros  = fs.readFileSync('parametros.json');
var parjson = JSON.parse(parametros);


var server = http.createServer(function(request, response){
      var mazeGenerator = maze.create({ x: parjson.ancho, y: parjson.largo });
      let spec = {
          open: [
              { border: "N", list: [0,2,parjson.ancho-1] }
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


      response.end();
});
server.listen(8080);
