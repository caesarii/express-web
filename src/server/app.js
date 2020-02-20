const path = require('path')
const NodeNet = require('../lib/index')

const app = new NodeNet()

app.static(path.resolve(__dirname, './static'))

// TODO 一次配置所有静态资源
const resources = (req, res) => {
    const filename = req.query.file
    return res.static(filename)
}

const index = (req, res) => {
    return res.render('index.html', {name: 'qinghe'})
}

app.use('/', index)
app.use('/static', resources)
app.listen('localhost', 3000)