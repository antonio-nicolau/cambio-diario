const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')

class ExchangeManager{

    prepare = async()=>{
        const content = await this.getExchanges()
        const data = await this.parseData(content)
        return data
    }
    
    getExchanges = async()=>{
        //Webscrap BNA website to get these informations
        const url = 'https://www.bna.ao/Conteudos/Artigos/detalhe_artigo.aspx?idc=16624&idsc=16625&idl=1'
    
        //httpAgent => to avoid SSL protection
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        const req = await axios.get(url,{httpsAgent})
        
        return req.data
    }
    
    parseData = async(content)=>{
        
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
                dollarBuyToday = this.cleanValue(dollarBuyToday)
                euroBuyToday = this.cleanValue(euroBuyToday)
                dollarSellToday = this.cleanValue(dollarSellToday)
                euroSellToday = this.cleanValue(euroSellToday)
                dollarBuyPast = this.cleanValue(dollarBuyPast)
                euroBuyPast = this.cleanValue(euroBuyPast)
                dollarSellPast = this.cleanValue(dollarSellPast)
                euroSellPast = this.cleanValue(euroSellPast)
    
                const data = {
                    'bank':bank,
                    'dollarBuyToday':dollarBuyToday,
                    'euroBuyToday':euroBuyToday,
                    'dollarSellToday':dollarSellToday,
                    'euroSellToday':euroSellToday,
                    'dollarBuyPast':dollarBuyPast,
                    'euroBuyPast':euroBuyPast,
                    'dollarBuyPast':dollarBuyPast,
                    'dollarSellPast':dollarSellPast,
                    'euroSellPast':euroSellPast,
                    'dollarBuyVariation':dollarBuyVariation,
                    'euroBuyVariation':euroBuyVariation,
                    'dollarSellVariation':dollarSellVariation,
                    'euroSellVariation':euroSellVariation,
                }
                if(data != null)
                    exchanges.push(data)
            }
        })
    
        exchanges = this.serialiseExchanges(exchanges)    
        return exchanges
    }
    
    serialiseExchanges = (exchanges)=>{
        exchanges.splice(0,2)
        exchanges.pop()
        exchanges.splice(exchanges.length - 2)
        return exchanges
    }
    
    cleanValue = (value)=>{
        value = value.replace(',','.')
        return Number(value)
    }

    prepareConvertion = async (coin,money,bank)=>{
        const exchanges = await this.prepare()
        
        const dollarSell = exchanges[bank]['dollarSellToday']
        const euroSell = exchanges[bank]['euroSellToday']

        if(coin == 'ao')
            return this.convertFromKwanza(money,dollarSell,euroSell)
        else if (coin == 'us')
            return this.convertFromDolar(money,dollarSell,euroSell)
        else
            return this.convertFromEuro(money,dollarSell,euroSell)
    }

    convertFromKwanza = (kwanza, dollarSell,euroSell)=>{
        const dollar = kwanza / dollarSell
        const euro = kwanza / euroSell
        
        return {
            'dollar':dollar.toFixed(2),
            'kwanza':kwanza,
            'euro':euro.toFixed(2),
        }
    }

    convertFromDolar = (dollar, dollarSell,euroSell)=>{
        const kwanza = dollar * dollarSell
        const euro = (dollar * dollarSell) / euroSell
        
        return {
            'dollar':dollar,
            'kwanza':kwanza.toFixed(2),
            'euro':euro.toFixed(2),
        }
    }

    convertFromEuro = (euro, dollarSell,euroSell)=>{
        const kwanza = euro * euroSell
        const dollar = (euro * euroSell) / dollarSell
        
        return {
            'dollar':dollar,
            'kwanza':kwanza,
            'euro':euro,
        }
    }
}

module.exports = ExchangeManager
