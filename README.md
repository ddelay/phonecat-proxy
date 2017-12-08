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

### Verify you can access angular-phonecat through the proxy

Assuming the proxy is listening on port 80.  Open the http://localhost/index.html in a browser.
