
const express = require("express");
const path = require("path")
var ejs = require('ejs'); 
var bodyParser = require('body-parser');

const app = express();
app.engine('html', ejs.__express);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.set("view options", {layout: false});

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json())

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/response", function(req, res, next) {
    const body = req.body

    console.log('body', body)


    res.send(200);
})

app.post("/info", function(req, res, next) {
    const body = req.body
    
    console.log('body', body)

    res.send(200);
})

app.listen(3000, 'localhost', function () {
    console.log('成功')
});
