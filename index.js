const { json } = require('express')
const express = require('express')
const path = require('path')
const prepare = require('./controller')

const port = process.env.PORT || 8080

const app = express()
const routes = express.Router()

routes.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/index.html'))
})

routes.get('/getCambios', async (req, res) => {
    res.setHeader('Content-type', 'text/json')
    const data = await prepare()

    console.log('getCambios')
    res.send(JSON.stringify(data))
})

app.use('/', routes)
app.listen(port, function (req, res) {
    console.log('server running')
})