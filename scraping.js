const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL de la página de últimas noticias
const url = "https://elpais.com/ultimas-noticias/"
const urlBase = "https://elpais.com"

// Función para realizar el scraping
module.exports = async () => {
  try {
    const res = await axios.get(url)
    if (res.status === 200) {
      const html = res.data
      const $ = cheerio.load(html)
      let noticias = []
      
      $('article').each((i, element) => {
        const noticia = {
          id: noticias.length + 1,
          titulo: $(element).find("h2").text().trim(), // Usar trim() para eliminar espacios extra
          enlace: $(element).find("a").attr("href") ? `${urlBase}${$(element).find("a").attr("href")}` : 'Sin enlace',
          descripcion: $(element).find("p").text().trim(),
          imagen: $(element).find("img").attr("src"),
        }
        noticias.push(noticia)
      })

      fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2))
      console.log('Noticias guardadas en noticias.json')
    }
  } catch (error) {
    console.log("Error en el scraping: " + error.message)
  }
}
