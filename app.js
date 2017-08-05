var express = require("express")
var content = require("./content")

app = express()

PORT = process.env.PORT || 8080

app.get("/pageJSON/:page",function(req,res){
    page = req.params.page;
    res.json(content.page(page))
})

app.get("/pagesJSON",function (req,res){
    res.json(content.pages())
})

app.use(express.static("static"))

//REMOVE LINE WHEN DONE!!!
app.use("/nss",express.static("nonSiteStuff"))
//REMOVE ABOVE LINE WHEN DONE!!

app.use("/demo",express.static("client_demo/"));
app.use("/api",require("./api_sim")(null));

app.listen(PORT,function(){
    console.log("app running on port " + PORT)
})