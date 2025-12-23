

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
    host: process.env.AIVEN_HOST,
    port: process.env.AIVEN_PORT,
    database: process.env.AIVEN_DB,
    user: process.env.AIVEN_USER,
    password: process.env.AIVEN_PASSWORD,
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
      success: true,
      projects: results,
    });
  } catch (error) {
    console.error('Error en GET /api/projects', error);
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

  res.status(200).json({
  success: true,
  cardURL: `/project/${resultInsertProject.insertId}`
});

});


/*app.get('/project/:id', async (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM projects
    INNER JOIN author
    ON projects.author_id = author.id
    WHERE projects.id = ?
  `;

  const connection = await getConnection();
  const [results] = await connection.query(sql, [id]);
  connection.end();

  res.json(results[0]);
});*/

app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();

    const sql = `
      SELECT 
        projects.id,
        projects.name,
        projects.slogan,
        projects.desc,
        projects.technologies,
        projects.repo,
        projects.demo,
        projects.image,
        author.author,
        author.job,
        author.photo
      FROM projects
      INNER JOIN author
        ON projects.author_id = author.id
      WHERE projects.id = ?;
    `;

    const [results] = await connection.query(sql, [id]);
    connection.end();

    if (results.length === 0) {
      res.status(404).json({ success: false, error: 'Proyecto no encontrado' });
    } else {
      res.json({ success: true, project: results[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al obtener el proyecto' });
  }
});

// SERVIDOR DE FICHEROS DINÁMICOS



// SERVIDOR DE FICHEROS ESTÁTICOS

app.use(express.static(path.join(__dirname, '..', 'FRONTEND-REACT', 'dist')));


