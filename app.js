const express = require("express")
const app = express()
const PORT = 3000
const fs = require("node:fs")
const getNews = require("./scraping.js")
let noticias = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))

function leerDatos() {
    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }
}

app.get("/", (req, res) => {
    res.send("funciona")
})

app.get("/scraping/", (req, res) => {
    res.json(noticias.find())
})

app.get("/scraping/:titulo", (req, res) => {
    const mytitle = req.params.titulo
    const noticia = noticias.find(ele => ele.titulo === mytitle)
    res.json(noticia)
})

app.post("/scraping", (req, res) => {
    const nuevaNoticia = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        enlace: req.body.enlace,
        imagen: req.body.imagen
    }

    console.log(nuevaNoticia)
    noticias.push(nuevaNoticia)
    res.json(noticias)
})

app.put("/scraping/:titulo", (req, res) => {
    const mytitle = req.params.titulo
    const newTitulo = req.body.titulo
    const newDescripcion = req.body.descripcion

    const index = noticias.findIndex(ele => ele.titulo == mytitle)

    if(index === -1){
        res.status(404).json({error: "Noticia no encontrada"})
    }
    else{
        noticias[index] = {
            ...noticias[index],
            titulo: newTitulo || noticias[index].titulo,
            descripcion: newDescripcion || noticias[index].descripcion
        }
        res.json(noticias)
    }
})

app.delete("/scraping/:titulo", (req, res) => {
    const mytitle = req.params.titulo
    const newNoticias = noticias.filter(ele => ele.titulo != mytitle)
    noticias = newNoticias
    res.json(noticias)
})



app.listen(PORT, () => {
    leerDatos()
    console.log(`Servidor ejecuta en http://localhost:${PORT}`)
})




/*
// Middleware para manejar datos JSON y formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function leer los datos desde el archivo JSON
function leerDatos() {
  try {
    const data = fs.readFileSync('noticias.json', 'utf-8');
    noticias = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo noticias.json:', error.message);
  }
}

//Ruta inicial
app.get("/", (req, res) => {
    res.send("funciona")
})

// Ruta scraping
app.get("/scraping", async (req, res) => {
  await getNews();
  leerDatos();
  res.status(200).send('Scraping realizado. Las noticias han sido guardadas.')
})

// Ruta de las noticias
app.get("/scraping", (req, res) => {
  leerDatos()
  res.json(noticias)
})

//Obtener una noticia por título
app.get("/scraping/:titulo", (req, res) => {
  leerDatos()
  const mytitle = req.params.titulo
  const noticia = noticias.find(ele => ele.titulo === mytitle)
  if (noticia) {
    res.json(noticia)
  } else {
    res.status(404).json({ error: "Noticia no encontrada" })
  }
})

// Ruta para crear una nueva noticia
app.post("/scraping", (req, res) => {
  const nuevaNoticia = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    enlace: req.body.enlace,
    imagen: req.body.imagen
  };
  
  noticias.push(nuevaNoticia)
  fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2))
  res.status(201).json(nuevaNoticia)
})

// Ruta para actualizar una noticia existente
app.put("/scraping/:titulo", (req, res) => {
  leerDatos()
  const mytitle = req.params.titulo
  const index = noticias.findIndex(ele => ele.titulo === mytitle)

  if (index === -1) {
    res.status(404).json({ error: "Noticia no encontrada" })
  } else {
    noticias[index] = {
      ...noticias[index],
      titulo: req.body.titulo || noticias[index].titulo,
      descripcion: req.body.descripcion || noticias[index].descripcion,
      enlace: req.body.enlace || noticias[index].enlace,
      imagen: req.body.imagen || noticias[index].imagen
    }
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2))
    res.json(noticias[index])
  }
})

// Ruta para eliminar una noticia por título
app.delete("/scraping/:titulo", (req, res) => {
  leerDatos();
  const mytitle = req.params.titulo;
  const newNoticias = noticias.filter(ele => ele.titulo !== mytitle)

  if (newNoticias.length === noticias.length) {
    res.status(404).json({ error: "Noticia no encontrada" })
  } else {
    noticias = newNoticias;
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2))
    res.json({ message: "Noticia eliminada" })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  leerDatos(); // Cargar datos al iniciar el servidor
  console.log(`Servidor está escuchando en el puerto http://localhost:${PORT}`)
})
*/
