// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
var content = require("./content");
const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/bepaysmart.org/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/bepaysmart.org/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/bepaysmart.org/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// Get content from JSON file
app.get("/pageJSON/:page", function(req, res) {
  page = req.params.page;
  res.json(content.page(page));
});

app.get("/pagesJSON", function(req, res) {
  res.json(content.pages());
});

app.use(express.static("static"));

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
