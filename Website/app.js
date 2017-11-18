var express = require("express")
var content = require("./content")

app = express()

PORT = process.env.PORT || 80

app.get("/pageJSON/:page",function(req,res){
    page = req.params.page;
    res.json(content.page(page))
})

app.get("/pagesJSON",function (req,res){
    res.json(content.pages())
})

app.use(express.static("static"))


app.listen(PORT,function(){
    console.log("app running on port " + PORT)
})