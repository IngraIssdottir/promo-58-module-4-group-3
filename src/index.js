

// Importar la biblioteca de Express

const express = require('express');

// Importar la biblioteca de CORS

const cors = require('cors');

// Impportar biblioteca de mysql2

const mysql = require("mysql2/promise");

const path = require('node:path');

require('dotenv').config();

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


async function getConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "proyecto-module-4-group-3",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
  });
  return connection;
}

// ENDPOINT 

app.get('/', (req, res) => {
  res.send('Ok!');
});

app.get('/api/projects', async (req, res) => {
  let connection;

  try{
    console.log('GET /api/projects');

    connection = await getConnection();

    let sql = `SELECT *
				FROM projects
				INNER JOIN author
				ON projects.author_id = author.id;`;

    const [results, fields] = await connection.query(sql);

    res.json({
      sucess: true,
      projects: results,
    });
  } catch (error) {
    console.error('Error en GET /api/project', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los proyectos',
    });
  } finally {
    if(connection) {
      connection.end();
    }
  }

});

app.post('/api/projects', async (req, res) => {
  console.log('POST /api/projects Body:', req.body);

  const conn = await getConnection();

  const insertAuthor =`
    INSERT INTO author (author, job, photo)
      VALUES (?, ?, ?);`;


  const [resultInsertAuthor] = await conn.execute(insertAuthor, [req.body.autor, req.body.job, req.body.photo]);

  const insertProject = `
    INSERT INTO projects (name, \`desc\`, technologies, demo, repo, slogan, image, author_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  const [resultInsertProject] = await conn.execute(insertProject, [
    req.body.name,
    req.body.desc,
    req.body.technologies,
    req.body.demo,
    req.body.repo,
    req.body.slogan,
    req.body.image,
    resultInsertAuthor.insertId
  ]);

  await conn.end();

  res.json({
    success: true,
    projectsUrl: `http://localhost:3000/projects/${resultInsertProject.insertId}`
  })

});
// SERVIDOR DE FICHEROS DINÁMICOS



// SERVIDOR DE FICHEROS ESTÁTICOS

app.use(express.static(path.join(__dirname, '..', 'FRONTEND-REACT', 'dist')));





// Array de los objetos con los datos de los proyectos

/*const data = [
  {
    id: 1,
    name: "Bebés Feos del Medievo",
    slogan: "Todos los bebé medievales aquí!",
    technologies: "HTML - CSS - REACT",
    repo: "https://github.com/IngraIssdottir",
    demo: "",
    desc: "Aquí podrás encontrar una exquisita base de datos, con cuadros medievales llenos de bebés horrorosos.",
    autor: "Leonor de Aquitania",
    job: "Reina de Francia",
    image:
      "https://i0.wp.com/wherecreativityworks.com/wp-content/uploads/2017/04/unnamed1-e1492372677392.jpg?w=389&h=389&crop=1&ssl=1",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Eleonora_van_Aquitani%C3%AB.jpg", // Imagen del proyecto
  },
  {
    id: 2,
    name: "The Rocky Horror Picture Show",
    slogan: "Todos los personajes de tu peli favorita",
    technologies: "HTML - CSS - REACT",
    repo: "https://github.com/IngraIssdottir",
    demo: "",
    desc: "Base de datos de personajes de la película",
    autor: "Dr. Frank N. Furter",
    job: "Doctor extraterrestre",
    image:
      "https://people.com/thmb/TJNzoOAs2THb1GTF708L093uwAw=/1500x0/filters:no_upscale():m[…]401x2)/rocky-horror-01-800-f7d3710af1544d18a214adb198599960.jpg", //Imagen de la autora
    photo: "https://m.media-amazon.com/images/I/61k12r5ne2L._AC_UY1000_.jpg", // Imagen del proyecto
  },
  {
    id: 3,
    name: "Recetas molonas de la abuela",
    slogan: "¿Te frio un huevo azul?",
    technologies: "HTML-CSS-REACT-MYSQL",
    repo: "https://github.com/IngraIssdottir",
    demo: "",
    desc: "Listado recetas muy molonas",
    autor: "La Abuela Molona",
    job: "Cocinera",
    image:
      "https://rms-media-prod.generalmills.com/f7eb3602-ac1d-4415-8046-fcefd1107328.jpg", // Imagen de la autora
    photo:
      "https://pbs.twimg.com/profile_images/643751284353462273/JRJ9kWsE_400x400.jpg", // Imagen del proyecto
  },
  {
    id: 4,
    name: "Letras mágicas",
    slogan: "¡El juego empieza donde la página se abre!",
    technologies: "HTML-CSS-REACT-MYSQL",
    repo: "https://github.com/IngraIssdottir",
    demo: "",
    desc: "Base de datos de libros para niños",
    autor: "Miriam Tirado",
    job: "escritora",
    image:
      " https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202103/22/00106540052732____10__1200x1200.jpg?impolicy=Resize&width=900", // Imagen de la Autora
    photo:
      "https://m.media-amazon.com/images/S/amzn-author-media-prod/imff5o87ma0e3fjpij39j0a873._SY450_CR0%2C0%2C450%2C450_.jpg", // Imaagen del proyecto
  },
];

// ENDPOINTS DEL API

app.get('/api/projects', (req, res) => {
    console.log("GET /api/projects")


    res.json(data);


});*/

/*app.post('/api/projects', (req, res) => {
    console.log("POST /api/projects");


    console.log(req.body);


  // Parece que los datos recibidos tienen título y descripción.
  // Almacenamos el objeto recibido en nuestro array de objetos:

  data.push(req.body);

  // Devolvemos como respuesta un success: true.

  res.status(200).json({ success: true });


});*/