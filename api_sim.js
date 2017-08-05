//The api router

var crypto = require("crypto"),
	exitHook = require("exit-hook"),
	fs = require("fs");

module.exports = function (multichain){

	var express = require("express");

	var addresses;
	var assets;

	//Load blockchain
	try {
		var blockchain = require("./blockchain");

		addresses = blockchain.addresses;
		assets = blockchain.assets;

		console.log(addresses)
	} catch (err){
		addresses = [
			{
				name: "1" + crypto.randomBytes(19).toString('hex'),
				friendlyName: "",
				balances: [

				]
			},
			{
				name: "1" + crypto.randomBytes(19).toString('hex'),
				friendlyName: "",
				balances: [
						
				]
			}
		];

		var assets = [

		];
	}


	var router = express.Router();

	router.get("/listAddresses",function (req,res) {
			res.json(addresses.map(function (a) {
				return a.name;
			}));
	});

	router.get("/getAddressBalances/:address",function (req,res) {
		res.json(addresses.filter(function (a) {
			return a.name == req.params.address;
		})[0].balances);
	});

	router.get("/getAddressFriendlyName/:address",function (req,res) {
		res.json(addresses.filter(function (a) {
			return a.name == req.params.address;
		})[0].friendlyName);
	});

	router.get("/getAssets",function (req,res) {
		res.json(assets);
	});

	router.get("/issueAsset/:asset/:qty/:address",function (req,res) {
		var address = addresses.filter(function (a) {
			return a.name == req.params.address;
		})[0];

		var asset = req.params.asset;
		var qty = parseInt(req.params.qty);

		var a = address.balances.findIndex(x => x.name == asset);

		if(a == -1){
			address.balances.push({name:asset,qty:qty});
		}else{
			var index = address.balances.findIndex(x => x.name == asset);
			address.balances[index].qty += qty;
		}

		//Push to asset array
		if(assets.findIndex(x => x.name == asset) == -1){
			assets.push({name:asset});
		}

		res.json(null);
	});

	router.get("/newAddr",function (req,res) {
		addresses.push({
			name: "1" + crypto.randomBytes(19).toString('hex'),
			friendlyName: "",
			balances: [
					
			]
		});

		res.json(null);
	});

	router.get("/transfer/:sender/:receiver/:asset/:qty",function (req,res) {
		var from = req.params.sender,
			to = req.params.receiver,
			asset = req.params.asset,
			qty = parseInt(req.params.qty);

		var fromIndex = addresses.findIndex(x => x.name == from);
		var toIndex = addresses.findIndex(x => x.name == to);
		var fromBalances = addresses[fromIndex].balances;
		var toBalances = addresses[toIndex].balances

		fromBalances[fromBalances.findIndex(x => x.name == asset)].qty -= qty;

		if(toBalances.findIndex(x => x.name == asset) != -1){
			toBalances[toBalances.findIndex(x => x.name == asset)].qty += qty;
		}else{
			toBalances.push({name:asset,qty:qty});
		}

		res.json(null)
	});

	router.get("/setFriendlyName/:address/:name",function (req,res) {
		addresses.filter(function (a) {
			return a.name == req.params.address;
		})[0].friendlyName = req.params.name;
		res.json(null);
	});

	//Exit hook
	exitHook(function () {
		fs.writeFileSync("blockchain.json",JSON.stringify({addresses:addresses,assets:assets}));
	});

	return router;

}