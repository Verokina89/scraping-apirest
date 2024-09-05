const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL de la página de últimas noticias de El País
const url = 'https://elpais.com/ultimas-noticias/';

// Función para realizar el scraping
function createScraping() {
    axios.get(url)
        .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        let noticias = []
    })
}
module.exports = createScraping;