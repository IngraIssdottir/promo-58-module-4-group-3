// Fichero src/components/App.jsx
import "../styles/App.scss";

import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import Hero from "./Layout/Hero.jsx";
import Preview from "./Create/Preview.jsx";
import Form from "./Create/Form.jsx";
import { Routes, Route } from "react-router";
import LandingPages from "./Layout/LandingPages.jsx";
import CreateProjects from "./Layout/CreateProjects.jsx";
import { useState, useEffect } from "react";

//Aquí metemos un array de objetos, con los proyectos que metímos en nuestra BD
//En el futuro, sólo habrá que volver a dejar un objeto vacío, para que los proyectos
//Se rendericen desde nuestra BD, o eso creemos.
/*const defaultProjects = [
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
];*/

function App() {
  //a pesar de que toda la funcionalidad la tienen en CreateProyects, no podemos
  //pasar estados desde CreateProjects a la Landing, porque están al mismo nivel
  //Solución, crear los estados directamente en Landing (más simple), o crearlos en
  //App, que es la "madre" tanto de Landing como de CreateProyects. La ponemos en App
  //porque esa estructura es la que hará falta para cuando rendericemos desde la BD
  //si no, nos tocaría mover la funcionalidad de Landing a App, creemos
  const [projectsLanding, setProjectsLanding] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjectsLanding(data.projects);
      })
      .catch((error) => {
        console.log("Error al cargar proyectos", error);
      });
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<LandingPages projectsLanding={projectsLanding} />}
        />
        <Route path="/create" element={<CreateProjects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
