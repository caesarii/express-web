
const express = require("express");
const path = require("path")
var ejs = require('ejs'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const log = console.log

const app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.append('Set-Cookie', `cookiekey-img=cookievalue-img2;`)
    next();
});

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


app.post("/response", function(req, res, next) {
    const body = req.body

    log('path', req.path)

    console.log('body', body)
    console.log('cookies', req.cookies)
    // 必须是当前域名或父域名
    // 设置了 secure 不能在 http 下保存 cookie
    res.append('Set-Cookie', `cookiekey-index=cookievalue-index; Path=/; SameSite=None;`)
    res.sendStatus(200);
})

app.post("/copy/response", function(req, res, next) {
    const body = req.body

    log('path', req.path)

    console.log('body', body)
    console.log('cookies', req.cookies)
    // 必须是当前域名或父域名
    // 设置了 secure 不能在 http 下保存 cookie
    res.append('Set-Cookie', `cookiekey-app2=cookievalue-app2; Path=/;`)
    res.sendStatus(200);
})

app.listen(8000, 'localhost', function () {
    console.log('listen on localhost:3000...')
});
