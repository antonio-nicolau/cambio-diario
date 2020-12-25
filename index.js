const express = require('express')
const ExchangeManager = require('./exchange-manager')

const port = process.env.PORT || 80

const app = express()
const routes = express.Router()

routes.get('/', (req, res) => {

    res.send('Welcome here')
})

routes.get('/get-exchanges', async (req, res) => {
    res.setHeader('Content-type', 'text/json')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    
    const exchange = new ExchangeManager()
    const response = await exchange.prepare()

    res.send(JSON.stringify(response))
})


routes.get('/convert-money/:coin/:money/:bank',async (req,res)=>{
    const coin = req.params.coin
    const money = req.params.money
    const bank = req.params.bank

    const exchange = new ExchangeManager()
    const response = await exchange.prepareConvertion(coin,money,bank)

    res.send(JSON.stringify(response))
})


app.use('/', routes)
app.listen(port)