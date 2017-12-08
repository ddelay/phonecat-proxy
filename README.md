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
use npm to install the required modules:

```
cd /phonecat-proxy
npm install
```

**Important:** You must install **phonecat-proxy** on the same system as **angular-phonecat**.
This proxy server assumes **angular-phonecat** is listening on http://localhost:8000.
...

## Usage

...
