const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')

const prepare = async()=>{
    const content = await getExchanges()
    const data = await parseData(content)
    return data
}

const getExchanges = async()=>{
    //Webscrap BNA website to get these informations
    const url = 'https://www.bna.ao/Conteudos/Artigos/detalhe_artigo.aspx?idc=16624&idsc=16625&idl=1'

    //httpAgent => to avoid SSL protection
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const req = await axios.get(url,{httpsAgent})
    
    return req.data
}

const parseData = async(content)=>{
    
    const $ = cheerio.load(content)

    let exchanges = [];
    
    const results = $('.X-section table tr').each((i,e)=>{
        if(i >= 4){
            const response = $(e).find('td').toArray();
            const bank = $(response[0]).text()

            // GET TODAY exchange
            const dollarBuyToday = $(response[1]).text()
            const euroBuyToday = $(response[2]).text()

            const dollarSellToday = $(response[3]).text()
            const euroSellToday = $(response[4]).text()

            //GET LAST exchange
            const dollarBuyPast = $(response[5]).text()
            const euroBuyPast = $(response[6]).text()

            const dollarSellPast = $(response[7]).text()
            const euroSellPast = $(response[8]).text()

            //GET CAMBIO VARIATION
            const dollarBuyVariation = $(response[9]).text()
            const euroBuyVariation = $(response[10]).text()

            const dollarSellVariation = $(response[11]).text()
            const euroSellVariation = $(response[12]).text()

            const data = {
                'bank':bank,
                'dollarBuyToday':Number(dollarBuyToday),
                'euroBuyToday':Number(euroBuyToday),
                'dollarSellToday':Number(dollarSellToday),
                'euroSellToday':Number(euroSellToday),
                'dollarBuyPast':Number(dollarBuyPast),
                'euroBuyPast':Number(euroBuyPast),
                'dollarBuyPast':Number(dollarBuyPast),
                'dollarSellPast':Number(dollarSellPast),
                'euroSellPast':Number(euroSellPast),
                'dollarBuyVariation':Number(dollarBuyVariation),
                'euroBuyVariation':Number(euroBuyVariation),
                'dollarSellVariation':Number(dollarSellVariation),
                'euroSellVariation':Number(euroSellVariation),
            }
            if(data != null)
                exchanges.push(data)
        }
    })

    exchanges = serialiseExchanges(exchanges)    
    return exchanges
}

const serialiseExchanges = (exchanges)=>{
    exchanges.splice(0,2)
    exchanges.pop()
    exchanges.splice(exchanges.length - 2)
    return exchanges
}

module.exports = prepare
