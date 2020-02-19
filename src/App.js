
const express = require("express");
const path = require("path")
var ejs = require('ejs'); 
var bodyParser = require('body-parser');

const app = express();
app.engine('html', ejs.__express);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.set("view options", {layout: false});

app.use(express.static(path.join(__dirname, '../views')));
app.use(bodyParser.json())

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/response", function(req, res, next) {
    const body = req.body

    console.log('body', body)

    // 注意header/属性大小写, 注意 toUTCString 是必需的
    res.append('Set-Cookie', `cookiekey=cookievalue; Path=/; HttpOnly; Expires=${new Date('Wed Feb 19 2020 11:51:30').toUTCString()};`)
    res.sendStatus(200);
})


app.listen(3000, 'localhost', function () {
    console.log('listen on localhost:3000...')
});
