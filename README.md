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

### Checkout step-8 of angular-phonecat

```
cd /angular-phonecat
git checkout -f step-8
```

This step is required only because the design of **phones.nsf** does not support all
**angular-phonecat** features yet.  A future
version of the project will support **angular-phonecat** features beyond **step-8**.

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

Assuming the proxy is listening on port 80, open http://localhost:80/index.html in a browser.  (If you
started the proxy on a different port, be sure to change the port number in the preceding URL.)  

This should cause the browser to load the same client-side resources (.html, .css and .js) as before.  However,
when **angular-phonecat** attempts to `GET /phones/phones.json`, the proxy rewrites the URL and redirects
the request to http://your.server.com.  It uses the Domino data API to read the list of phones from
a view in **phones.nsf**.  

```
Proxy request: GET /phones/phones.json
Rewriting URL to /phones.nsf/api/data/collections/name/Phones?count=200&systemcolumns=0
Redirecting request to Domino.
```

Then **angular-phonecat** reads each phone's thumbnail image from a separate 
document in **phones.nsf** -- again using the Domino data API.

```
Proxy request: GET /phones.nsf/api/data/documents/unid/1F79ADF17BB8D993852581EF00606771/Attachments/motorola-xoom.0.jpg
Redirecting request to Domino.
Proxy request: GET /phones.nsf/api/data/documents/unid/406F2F3BC902C92C852581EF0061B262/Attachments/dell-streak-7.0.jpg
Redirecting request to Domino.
Proxy request: GET /phones.nsf/api/data/documents/unid/94723837DF268907852581EF0061EC47/Attachments/samsung-gem.0.jpg
Redirecting request to Domino.
Proxy request: GET /phones.nsf/api/data/documents/unid/1FF8B6CEDA015CDD852581EF006230D0/Attachments/nexus-s.0.jpg
Redirecting request to Domino.
Proxy request: GET /phones.nsf/api/data/documents/unid/65F99C091496CE4A852581F0005A1169/Attachments/t-mobile-mytouch-4g.0.jpg
Redirecting request to Domino.
Proxy request: GET /phones.nsf/api/data/documents/unid/6151B055F2FB1E34852581F2006D1661/Attachments/sanyo-zio.0.jpg
Redirecting request to Domino.
```
