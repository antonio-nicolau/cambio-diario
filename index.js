const express = require('express')
const prepare = require('./controller')

const port = process.env.PORT || 80

const app = express()
const routes = express.Router()

routes.get('/', (req, res) => {

    res.send('Welcome here')
})

routes.get('/get-exchanges', async (req, res) => {
    res.setHeader('Content-type', 'text/json')
    const exchanges = await prepare()

    res.send(JSON.stringify(exchanges))
})

app.use('/', routes)
app.listen(port,'192.168.1.122')