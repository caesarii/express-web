
const express = require("express");
const path = require("path")
var ejs = require('ejs'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const app = express();

// 以下四项是模板引擎的配置
app.engine('html', ejs.__express)
app.set('view engine', 'html')
// 注意模板引擎静态目录的配置
app.set('views', __dirname + './../views')
app.set("view options", {layout: false});

// 静态资源目录
app.use(express.static(path.join(__dirname, './../views')));

// 中间件
app.use(bodyParser.json())
app.use(cookieParser())


app.get("/", function(req, res) {
    res.render("index");
});

app.get("/a", function(req, res) {
    res.render("a");
});


app.post("/a/response", function(req, res, next) {
    const body = req.body

    console.log('body', body)
    console.log('cookies', req.cookies)

    // 注意header/属性大小写, 注意 toUTCString 是必需的
    // 属性的写法参考 浏览器 application
    // Expires
    // res.append('Set-Cookie', `cookiekey=cookievalue; Path=/; HttpOnly; Expires=${new Date('Wed Feb 19 2020 11:51:30').toUTCString()};`)
    // Max-Age
    // res.append('Set-Cookie', `cookiekey=cookievalue; Path=/; HttpOnly; Max-Age=30;`)
    // Path
    res.append('Set-Cookie', `cookiekeya=cookievalue-a; Path=/a; HttpOnly;`)
    res.sendStatus(200);
})


app.post("/response", function(req, res, next) {
    const body = req.body

    console.log('body', body)
    console.log('cookies', req.cookies)

    res.append('Set-Cookie', `cookiekeyindex=cookievalue-index; Path=/; HttpOnly;`)
    res.sendStatus(200);
})

app.listen(3000, 'localhost', function () {
    console.log('listen on localhost:3000...')
});
