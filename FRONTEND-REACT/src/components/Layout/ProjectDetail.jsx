import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import Card from "../Create/Card";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProject(data.project);
        } else {
          setError(data.error);
        }
      })
      .catch(() => setError("Error al cargar el proyecto"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!project) return <p>Cargando proyecto...</p>;

  const projectStyle = project.image
    ? { backgroundImage: `url(${project.image})` }
    : {};

  return (
    <>
      <section className="preview">
        <div
          className="projectImage"
          style={projectStyle}
          aria-label={project.name || "Imagen del proyecto"}
        >
          {/* background por defecto queda en CSS si no hay data.image */}
        </div>
        <Card data={project} />
      </section>
      <Link to="/" className="back-link">
        ← Volver a proyectos
      </Link>
    </>
  );
}

export default ProjectDetail;

//<Card data={project} />
// <Link to="/">← Volver a proyectos</Link>
