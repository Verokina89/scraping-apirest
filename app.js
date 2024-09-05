//CRUD noticias
const express = require('express');
const fs = require('fs');
const createScraping = require('./scraping')
const app = express()

// Middleware datos JSON y formularios.
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor está escuchando en el puerto http://localhost:${PORT}`);
});