// What mode are we running in?
const mode = process.argv.length == 3 ? process.argv[2] : 'prod';

// Dependencies
const express = require('express');

const compression = require('compression');
const fs = require('fs');
const http = require('http');

const content = require("./content");
const app = express();

if (mode == "prod") {
	const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
	const https = require('https');
	
	app.use(redirectToHTTPS());

	// Certificate
	const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.bepaysmart.org/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('/etc/letsencrypt/live/www.bepaysmart.org/cert.pem', 'utf8');
	const ca = fs.readFileSync('/etc/letsencrypt/live/www.bepaysmart.org/chain.pem', 'utf8');

	const credentials = {
		key: privateKey,
 		cert: certificate,
 		ca: ca
	};

}

app.use(compression());

// Get content from JSON file
app.get("/pageJSON/:page", function(req, res) {
  page = req.params.page;
  res.json(content.page(page));
});

app.get("/pagesJSON", function(req, res) {
  res.json(content.pages());
});

app.use(express.static(__dirname + "/static"));

// Starting both http & https server
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

if (mode == "prod") {
	const httpsServer = https.createServer(credentials, app);

	httpsServer.listen(443, () => {
		console.log('HTTPS Server running on port 443');
	});
}