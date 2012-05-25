var staticServer = require('node-static');
var file = new staticServer.Server();
var port = process.env.PORT || 3000;


require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(port);