// native Node.js module
const https = require('https')
// don't forget to `npm install cheerio` to get the parser!
const cheerio = require('cheerio')

module.exports = {
    name: 'fetch',
    category: 'scrapeHtml',
    description: 'gets html of site',
    usage: `fetch`,
    async execute(message, args, command, client, Discord, db){
      var uid = //todo
      var url = "https://webstatic-sea.mihoyo.com/app/community-game-records-sea/index.html?bbs_presentation_style=fullscreen&bbs_auth_required=true&v=101&gid=2&user_id="+uid+"&lang=en-us&bbs_theme=dark&bbs_theme_device=1#/ys"

    // custom fetch for Node.js
    const fetch = (method, url, payload=undefined) => new Promise((resolve, reject) => {
        https.get(
            url,
            res => {
                const dataBuffers = []
                res.on('data', data => dataBuffers.push(data.toString('utf8')))
                res.on('end', () => resolve(dataBuffers.join('')))
            }
        ).on('error', reject)
    })

    const scrapeHtml = url => new Promise((resolve, reject) =>{
      fetch('GET', url)
      .then(html => {
        const cheerioPage = cheerio.load(html)
        // cheerioPage is now a loaded html parser with a similar interface to jQuery
        // FOR EXAMPLE, to find a table with the id productData, you would do this:
        const productTable = cheerioPage('table .productData')

        // then you would need to reload the element into cheerio again to
        // perform more jQuery like searches on it:
        const cheerioProductTable = cheerio.load(productTable)
        const productRows = cheerioProductTable('tr')

        // now we have a reference to every row in the table, the object
        // returned from a cheerio search is array-like, but native JS functions
        // such as .map don't work on it, so we need to do a manually calibrated loop:
        let i = 0
        let cheerioProdRow, prodRowText
        const productsTextData = []
        while(i < productRows.length) {
          cheerioProdRow = cheerio.load(productRows[i])
          prodRowText = cheerioProdRow.text().trim()
          productsTextData.push(prodRowText)
          i++
        }
        resolve(productsTextData)
      })
      .catch(reject)
    })

    scrapeHtml(/*URL TO SCRAPE HERE*/)
    .then(data => {
      // expect the data returned to be an array of text from each
      // row in the table from the html we loaded. Now we can do whatever
      // else you want with the scraped data.
      console.log('data: ', data)
    })
    .catch(err => console.log('err: ', err)
}
