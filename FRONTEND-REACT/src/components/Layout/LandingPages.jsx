//import { useState } from "react";
import Hero from "../Layout/Hero.jsx";
import Card from "../Create/Card.jsx";
import { Link } from "react-router";


//le pasamos el estado por props
function LandingPages({ projectsLanding = [] }) {
  //esta variable, y el useState de arriba en principio ya no son necesarios,
  //pero los dejo por si acaso.
  //const [projects, setProjects] = useState([{}, {}, {}, {}]);

  return (
    <Hero>
      <>
        <Link className="button--link" to="./create">
          Nuevo Proyecto
        </Link>
      </>
      {/*hacemos el map con el prop que le acabamos de pasar en la tarjeta*/}
      {projectsLanding.map((project) => (
        <Card key={project.id} data={project} />
      ))}
    </Hero>
  );
}

export default LandingPages;
