# phonecat-proxy

A simple Node.js proxy server.  This project demonstrates a pattern
for combining a modern, client-side application framework (in this case
AngularJS) with Domino data.  Although this project assumes AngularJS,
the same pattern can be used with other client-side frameworks.

## Prerequisites

- A Domino server running the HTTP task.  This server must have the Domino data
API enabled.
- Node.js and npm.
- An instance of [angular-phonecat](https://github.com/angular/angular-phonecat).
This is a simple Node.js project meant to demonstrate AngularJS.  If you haven't
already done so, install [angular-phonecat](https://github.com/angular/angular-phonecat) 
first.

## Installation

Clone this repository on the _same system_ where you installed **angular-phonecat**.  Then
copy [phones.nsf](nsf/phones.nsf) to the data directory of your Domino server.

Now use npm to install the required modules:

```
cd /phonecat-proxy
npm install
```

**Important:** You must install **phonecat-proxy** on the same system as **angular-phonecat**.
This proxy server assumes **angular-phonecat** is listening on http://localhost:8000.

## Usage

### Checkout step-7 of angular-phonecat

```
cd /angular-phonecat
git checkout -f step-7
```

This step is required only because **phones.nsf** does not support image URLs yet.  A future
version of the project will support images and other **angular-phonecat** features.

### Start angular-phonecat

```
cd /angular-phonecat
npm start
```

Once started, verify you can open the application at http://localhost:8000/index.html.

### Start the proxy server

From a _second_ Node.js shell:

```
cd /phonecat-proxy
node proxy http://your.server.com
```

Substitute the host name of your Domino server for `your.server.com` above.  This starts the proxy 
server on port 80.  If that port is already in use, you can start the proxy on a different port:

```
node proxy http://your.server.com 8080
```

### Access angular-phonecat through the proxy

Assuming the proxy is listening on port 80, open http://localhost:80/index.html in a browser.  If you
started the proxy on a different port, be sure to change the port number in the URL.  This should
cause the browser to load the same client-side resources (.html, .css and .js) as before.  However,
when **angular-phonecat** attempts to `GET /phones/phones.json`, the proxy rewrites the URL and redirects
the request to http://your.server.com.  It uses the Domino data API to read the list of phones from
**phones.nsf**.
