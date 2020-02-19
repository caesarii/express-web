
const https = require('https')
const http = require('http')
const express = require("express");
const path = require("path")
const fs = require("fs")
var ejs = require('ejs'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const log = console.log

var options = {
    key: fs.readFileSync(path.resolve(__dirname, './server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, './server.crt')),
    requestCert: false,
    rejectUnauthorized: false
};


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

    log('path', req.path)

    console.log('body', body)
    console.log('cookies', req.cookies)

    // 注意header/属性大小写, 注意 toUTCString 是必需的
    // 属性的写法参考 浏览器 application
    // Expires
    // res.append('Set-Cookie', `cookiekey=cookievalue; Path=/; HttpOnly; Expires=${new Date('Wed Feb 19 2020 11:51:30').toUTCString()};`)
    // Max-Age
    // res.append('Set-Cookie', `cookiekey=cookievalue; Path=/; HttpOnly; Max-Age=30;`)
    // Path
    res.append('Set-Cookie', `cookiekey-a=cookievalue-a; Path=/a; HttpOnly;`)
    res.sendStatus(200);
})


app.post("/response", function(req, res, next) {
    const body = req.body

    log('path', req.path)

    console.log('body', body)
    console.log('cookies', req.cookies)
    // 必须是当前域名或父域名
    // 设置了 secure 不能在 http 下保存 cookie
    res.append('Set-Cookie', `cookiekey-index=cookievalue-index;`)
    res.sendStatus(200);
})

var httpServer = http.createServer(app)
var httpsServer = https.createServer( options, app );


const host = 'localhost'
httpServer.listen(3000, host, function () {
    console.log( 'http on 3000' );
} );


httpsServer.listen(3400, host, function () {
    console.log('httpS on 6000...')
});