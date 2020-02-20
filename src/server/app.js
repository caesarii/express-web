const path = require('path')
const NodeNet = require('../lib/index')
const log = console.log

const app = new NodeNet()

app.static(path.resolve(__dirname, './static'))

// TODO 一次配置所有静态资源
const resources = (req, res) => {
    const filename = req.query.file
    log('res', filename)
    return res.static(filename)
}

const index = (req, res) => {
    return res.render('index.html', {name: 'qinghe'})
}

const example = (req, res) => {
    log('/example', req.body)
    return res.sendStatus(200)
}

app.use('/', index)
app.use('/static', resources)
app.use('/example', example)
app.listen('localhost', 3000)