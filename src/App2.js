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

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.append('Set-Cookie', `cookiekey-img=cookievalue-img2; SameSite=None; Secure`)
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
    log('/reponse')
    const body = req.body

    log('path', req.path)

    console.log('body', body)
    console.log('cookies', req.cookies)
    // 必须是当前域名或父域名
    // 设置了 secure 不能在 http 下保存 cookie
    // res.append('Set-Cookie', `cookiekey-index=cookievalue-index; Path=/;`)
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


var httpsServer = https.createServer( options, app );
var httpServer = http.createServer(app)

// const host = 'localhost'
const host = '10.10.14.173'
httpsServer.listen(4000, host, function () {
    console.log( 'httpS on 4000' );
} );


httpServer.listen(8000, host, function () {
    console.log('http on 8000...')
});