const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')
require('./confi')

const getCambios = async(url)=>{
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const req = await axios.get(url,{httpsAgent})
    
    return req.data
}

const parseData = async(content)=>{
    
    const $ = cheerio.load(content)

    let cambios = [];
    
    const results = $('.X-section table tr').each((i,e)=>{
        if(i >= 4){
            const value = $(e).find('td').toArray();
            const banco = $(value[0]).text()

            // GET TODAY CAMBIO
            const dolarcompraAtual = $(value[1]).text()
            const euroCompraAtual = $(value[2]).text()

            const dolarVendaAtual = $(value[3]).text()
            const euroVendaAtual = $(value[4]).text()

            //GET LAST CAMBIO
            const dolarcompraPassado = $(value[5]).text()
            const euroCompraPassado = $(value[6]).text()

            const dolarVendaPassado = $(value[7]).text()
            const euroVendaPassado = $(value[8]).text()

            //GET CAMBIO VARIATION
            const dolarcompraVariacao = $(value[9]).text()
            const euroCompraVariacao = $(value[10]).text()

            const dolarVendaVariacao = $(value[11]).text()
            const euroVendaVariacao = $(value[12]).text()

            const data = {
                banco:banco,
                dolarcompraAtual:dolarcompraAtual,
                euroCompraAtual:euroCompraAtual,
                dolarVendaAtual:dolarVendaAtual,
                euroVendaAtual:euroVendaAtual,
                dolarcompraPassado:dolarcompraPassado,
                euroCompraPassado:euroCompraPassado,
                dolarVendaPassado:dolarcompraPassado,
                euroVendaPassado:euroVendaPassado,
                dolarcompraVariacao:dolarcompraVariacao,
                euroCompraVariacao:euroCompraVariacao,
                dolarVendaVariacao:dolarVendaVariacao,
                euroVendaVariacao:euroVendaVariacao,
            }
            if(data != null)
                cambios.push(data)
        }
    })

    cambios = serialiseData(cambios)    
    return cambios
}

const serialiseData = (data)=>{
    data.splice(0,2)
    data.pop()
    data.splice(data.length - 2)
    return data
}

const prepare = async()=>{
    const content = await getCambios(url)
    const data = await parseData(content)
    return data
}

module.exports = prepare