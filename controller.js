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
            let dollarBuyToday = $(response[1]).text()
            let euroBuyToday = $(response[2]).text()

            let dollarSellToday = $(response[3]).text()
            let euroSellToday = $(response[4]).text()

            //GET LAST exchange
            let dollarBuyPast = $(response[5]).text()
            let euroBuyPast = $(response[6]).text()

            let dollarSellPast = $(response[7]).text()
            let euroSellPast = $(response[8]).text()

            //GET CAMBIO VARIATION
            const dollarBuyVariation = $(response[9]).text()
            const euroBuyVariation = $(response[10]).text()

            const dollarSellVariation = $(response[11]).text()
            const euroSellVariation = $(response[12]).text()

            // REPLACE , TO . AND CHANGE Type Data To Number
            dollarBuyToday = cleanValue(dollarBuyToday)
            euroBuyToday = cleanValue(euroBuyToday)
            dollarSellToday = cleanValue(dollarSellToday)
            euroSellToday = cleanValue(euroSellToday)
            dollarBuyPast = cleanValue(dollarBuyPast)
            euroBuyPast = cleanValue(euroBuyPast)
            dollarSellPast = cleanValue(dollarSellPast)
            euroSellPast = cleanValue(euroSellPast)

            const data = {
                'bank':bank,
                'dolarcompraAtual':dollarBuyToday,
                'euroCompraAtual':euroBuyToday,
                'dolarVendaAtual':dollarSellToday,
                'euroVendaAtual':euroSellToday,
                'dolarcompraPassado':dollarBuyPast,
                'euroCompraPassado':euroBuyPast,
                'dolarVendaPassado':dollarBuyPast,
                'dollarSellPast':dollarSellPast,
                'euroVendaPassado':euroSellPast,
                'dolarcompraVariacao':dollarBuyVariation,
                'euroCompraVariacao':euroBuyVariation,
                'dolarVendaVariacao':dollarSellVariation,
                'euroVendaVariacao':euroSellVariation,
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

const cleanValue = (value)=>{
    value = value.replace(',','.')
    return Number(value)
}

module.exports = prepare
