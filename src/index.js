// Importar la biblioteca de Express

const express = require('express');

// Importar la biblioteca de CORS

const cors = require('cors');

const path = require('node:path');

// Crear una variable con todo lo que puede hacer el servidor:

const app = express();

// Configuramos server para que funcione bien como API

app.use(cors());
app.use(express.json({ limit: '25Mb' }));

// Arrancar el servidor en el puerto 3000:

const port = 3000;
app.listen(port, () => {
  console.log(`Uh! El servidor ya está arrancado: <http://localhost:${port}/>`);
});

// ENDPOINT 

app.get('/', (req, res) => {
  res.send('Ok!');
});


// ENDPOINTS DEL API

app.get('/api/projects', (req, res) => {

});

app.post('/api/project', (req, res) => {

});


// SERVIDOR DE FICHEROS DINÁMICOS



// SERVIDOR DE FICHEROS ESTÁTICOS

app.use(express.static(path.join(__dirname, '..', 'FRONTEND-REACT', 'dist')));