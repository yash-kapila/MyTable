var express = require("express");
var app = express();

app.use(express.static('./app'));

app.listen(80, function(){
    console.log("Listening at port 8000");
})

exports = module.exports = app;