var express = require("express")
var content = require("./content")

app = express()

PORT = process.env.PORT || 8080

app.get("/pageJSON/:page",function(req,res){
    page = req.params.page;
    res.json(content(page))
})

app.use(express.static("static"))

app.listen(PORT,function(){
    console.log("app running on port " + PORT)
})