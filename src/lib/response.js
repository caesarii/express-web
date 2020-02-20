const fs = require('fs')
const {log} = require('./utils')

const fileTypes = {
    js: 'text/javascript',
    gif: 'image/gif'
}

class Response {
    constructor(staticPath) {
        this.staticPath = staticPath
    }
    
    _template(file) {
        const options = {
            encoding: 'utf8'
        }
        const path = `${this.staticPath}/${file}`
        const content = fs.readFileSync(path, options)
        return content
    }
    
    render(file, data) {
        const header = 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n'
        let body = this._template(file)
        for(let key in data) {
            body = body.replace(`{{${key}}}`, data[key])
        }
        const r = header + '\r\n' + body

        log('Response render row \n', r, '\n')
        return r
    }
    
    static(filename) {
        const path = `${this.staticPath}/${filename}`
        const fileType = filename.split('.').pop()
        log('file type', fileType)
        const body = fs.readFileSync(path)
        // Cache-Control: no-cache
        const header = `HTTP/1.1 200 OK\r\nContent-Type: ${fileTypes[fileType]}\r\nCache-Control: no-cache\r\n\r\n`
        log('Response static raw', header, body, '\n')

        const h = Buffer.from(header)
        const r = Buffer.concat([h, body])

        return r
    }

    sendStatus(status) {
        const header = `HTTP/1.1 200 OK\r\n\r\n`
        log('Response sendStatus raw', header, '\n')

        const r = Buffer.from(header)

        return r

    }
}

module.exports = Response