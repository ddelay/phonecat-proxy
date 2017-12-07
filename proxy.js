var http = require('http');  
var httpProxy = require('http-proxy');

// This proxies all requests to port 8000.  Assumes some other package
// has started a server on that port.
var options = {
  target: 'http://localhost:8000'
};

// This proxies all requests to port 9000
// var options = {
//   target: 'http://localhost:9000'
//};

// TODO: Parse these from the command line
var listenPort = 80;
var targetPort = 9000;

//
// Create a basic proxy server in one line of code...
//
httpProxy.createServer(options).listen(listenPort);
console.log('Proxy started on port ' + listenPort);

//
// ...and a simple http server to show us our request back.
//
http.createServer(function (req, res) {  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(targetPort);
console.log('Simple HTTP server started on port ' + targetPort);
