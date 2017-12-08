var http = require('http');  
var httpProxy = require('http-proxy');

// This proxies requests to port 8000.  Assumes some other package
// (e.g. angular-phonecat) has started a server on that port.
var options = {
  target: 'http://localhost:8000'
};

// Initialize other variables
var dominoTarget = null;
var proxyPort = 80;
var simplePort = 9000;
var startSimpleServer = false;

//
// Print the usage details
//
function usage() {
  console.log('usage: node proxy {dominoTarget} ({port}))\n');
  console.log('  - {dominoTarget} is the base URL of the target Domino server (e.g. http://acme.com)');
  console.log('  - {port} is the optional port on which the proxy listens (defaults to 80)');
  process.exit(1);
}

//
// Parse command line arguments
//
process.argv.forEach(function (val, index, array) {
  if ( index > 1 ) {
    if ( index == 2 ) {
      dominoTarget = val;
    }
    else if ( index == 3) {
      proxyPort = parseInt(val);
      if ( isNaN(proxyPort) || proxyPort < 1 ) {
        console.log('error: ' + val + ' is an invalid port.\n');
        usage();
      }
    }
  }
});

//
// Verify input
//
if ( dominoTarget == null ) {
  console.log('error: No Domino target specified.\n');
  usage();
}  

//
// Create a custom proxy server ...
//
var proxy = httpProxy.createServer({});

var server = http.createServer(function(req, res) {
  var redirect = false;
  //debugger;
  
  console.log('Proxy request: ' + req.method + ' ' + req.url);
  
  if ( req.url == '/phones/phones.json' ) {
    req.url = '/phones.nsf/api/data/collections/name/Phones?count=200&systemcolumns=0';
    console.log('Rewriting URL to ' + req.url);
    redirect = true;
  }
  else if ( req.url.startsWith('/phones.nsf')) {
    // Redirect to Domino
    redirect = true;
  }
  
  if ( redirect ) {
    console.log('Redirecting request to Domino.');
    proxy.web(req, res, {target: dominoTarget});
  }
  else {
    // Otherwise, send to default target
    proxy.web(req, res, options);
  }
});

server.listen(proxyPort);
console.log('Proxy started on port ' + proxyPort + '. Domino target is ' + dominoTarget + '.');

//
// ...and a simple http server to show us our request back.
//
if ( startSimpleServer ) {
  http.createServer(function (req, res) {  
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  }).listen(simplePort);
  console.log('Simple HTTP server started on port ' + simplePort);
}
