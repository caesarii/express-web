const fs = require('fs')
const {log} = require('./utils')

class Response {
    constructor(staticPath) {
        log('Response', staticPath)
        this.staticPath = staticPath
    }


    
    template(file) {
        const options = {
            encoding: 'utf8'
        }
        const path = `${this.staticPath}/${file}`
        log('path', path)
        const content = fs.readFileSync(path, options)
        return content
    }
    
    render(file, data) {
        log('rnder', file, data)
        const header = 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n'
        let body = this.template(file)
        for(let key in data) {
            body = body.replace(`{{${key}}}`, data[key])
        }
        const r = header + '\r\n' + body
        return r
    }
    
    static(filename) {
        const path = `${this.staticPath}/${filename}`
        const body = fs.readFileSync(path)
        // TODO 图片类型
        const header = 'HTTP/1.1 200 OK\r\nContent-Type: image/gif\r\n\r\n'
        const h = Buffer.from(header)
        const r = Buffer.concat([h, body])
        return r
    }
}

module.exports = Response