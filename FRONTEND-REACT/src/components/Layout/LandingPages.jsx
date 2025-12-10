import { useState } from "react";
import Hero from "../Layout/Hero.jsx";
import Card from "../Create/Card.jsx";
import { Link } from "react-router";

function LandingPages() {
  const [projects, setProjects] = useState([{}, {}, {}, {}]);

  return (
    <Hero>
      <>
        <Link className="button--link" to="./create">
          Nuevo Proyecto
        </Link>
      </>
      {projects.map((project) => (
        <Card key={project.id} data={project} />
      ))}
    </Hero>
  );
}

export default LandingPages;
